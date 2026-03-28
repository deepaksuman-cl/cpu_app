import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/models/index.js"; // Tumhara database connection

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@cpu.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email aur Password zaroori hai!");
        }

        // 1. Database mein User dhundho
        const user = await db.User.findOne({ 
          where: { email: credentials.email.toLowerCase() } 
        });

        if (!user) {
          throw new Error("Is email se koi admin nahi mila.");
        }

        // 2. Check if account is active/verified (Tumhare model ke hisaab se)
        if (!user.isActive) {
          throw new Error("Ye account block kar diya gaya hai.");
        }

        // 3. Password match karo (bcrypt)
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          // Future scope: Yahan loginAttempts badha sakte hain
          throw new Error("Galat password!");
        }

        // 4. Sab sahi hai, toh token ke liye data return karo (password hata kar)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
        };
      }
    })
  ],
  callbacks: {
    // Ye token mein data save karega (Cookie mein)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profilePic = user.profilePic;
      }
      return token;
    },
    // Ye session frontend ko dega taaki hum UI mein name/pic dikha sakein
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.profilePic = token.profilePic;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Hum apna custom login page banayenge
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days tak login rahega
  },
  secret: process.env.NEXTAUTH_SECRET, // .env mein hona zaroori hai
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };