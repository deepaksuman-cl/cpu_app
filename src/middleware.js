import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { Op } from "sequelize";
import { connectToDatabase } from "@/lib/db";
import Redirect from "@/models/Redirect";

const adminAuthMiddleware = withAuth({
  pages: {
    signIn: "/login",
  },
});

function normalizePath(value) {
  let normalized = String(value || "").trim();
  if (!normalized) return "/";

  try {
    if (/^https?:\/\//i.test(normalized)) {
      normalized = new URL(normalized).pathname || "/";
    }
  } catch {
    // Ignore URL parsing errors and continue normalization as plain path.
  }

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  normalized = normalized.replace(/\/{2,}/g, "/");

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, "");
  }

  return normalized.toLowerCase();
}

async function findRedirectByPath(pathname) {
  const normalizedPath = normalizePath(pathname);

  await connectToDatabase();

  const redirect = await Redirect.findOne({
    where: {
      sourcePath: normalizedPath, // ✅ only exact match
      isActive: true,
    },
    order: [["id", "DESC"]],
  });

  return redirect ? redirect.get({ plain: true }) : null;
}

function buildTargetUrl(destinationUrl, requestUrl) {
  const rawDestination = String(destinationUrl || "").trim();
  if (!rawDestination) return null;

  const hasScheme = /^[a-z][a-z0-9+\-.]*:\/\//i.test(rawDestination);
  const target = hasScheme
    ? new URL(rawDestination)
    : new URL(normalizePath(rawDestination), requestUrl.origin);

  if (!target.search && requestUrl.search) {
    target.search = requestUrl.search;
  }

  return target;
}

function isSameDestination(targetUrl, requestUrl) {
  return (
    targetUrl.origin === requestUrl.origin &&
    normalizePath(targetUrl.pathname) === normalizePath(requestUrl.pathname) &&
    targetUrl.search === requestUrl.search
  );
}

export default async function middleware(request, event) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return adminAuthMiddleware(request, event);
  }

  if (
    pathname.startsWith("/api") ||
    !["GET", "HEAD"].includes(request.method)
  ) {
    return NextResponse.next();
  }

  try {
    const redirectRecord = await findRedirectByPath(pathname);

    if (!redirectRecord) {
      return NextResponse.next();
    }

    const targetUrl = buildTargetUrl(
      redirectRecord.destinationUrl,
      request.nextUrl,
    );
    if (!targetUrl || isSameDestination(targetUrl, request.nextUrl)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      targetUrl,
      redirectRecord.isPermanent === false ? 307 : 308,
    );
  } catch (error) {
    console.error("[middleware] Redirect lookup failed:", error);
    return NextResponse.next();
  }
}

export const runtime = "nodejs";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
