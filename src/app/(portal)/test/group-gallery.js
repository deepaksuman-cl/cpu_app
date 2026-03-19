"use client";

import { useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Images, ZoomIn } from "lucide-react";

// ═══════════════════════════════════════════════════════
// SERVER-SIDE DATA  (move to getServerSideProps in prod)
// ═══════════════════════════════════════════════════════
const groupGalleryData = {
  years: ["2023", "2022", "2021"],
  groups: [
    // ─── 2023 ─────────────────────────────────────────
    {
      id: "gg-2023-01", year: "2023",
      title: "Award Ceremony",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop", caption: "Award Distribution" },
        { id: "i2", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=900&h=600&fit=crop", caption: "Felicitation" },
        { id: "i3", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=600&fit=crop", caption: "Group Photo" },
      ],
    },
    {
      id: "gg-2023-02", year: "2023",
      title: "Dance & Drama",
      thumbnail: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&h=600&fit=crop", caption: "Dance Performance" },
        { id: "i2", src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&h=600&fit=crop", caption: "Drama Night" },
      ],
    },
    {
      id: "gg-2023-03", year: "2023",
      title: "Art Exhibition",
      thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&h=600&fit=crop", caption: "Art Works" },
        { id: "i2", src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&h=600&fit=crop", caption: "Student Creation" },
        { id: "i3", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&h=600&fit=crop", caption: "Exhibition Hall" },
      ],
    },
    {
      id: "gg-2023-04", year: "2023",
      title: "Poetry & Speech",
      thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop", caption: "Poetry Recitation" },
        { id: "i2", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop", caption: "Speech Competition" },
      ],
    },
    {
      id: "gg-2023-05", year: "2023",
      title: "Aabhivadan",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&h=600&fit=crop", caption: "Welcome Ceremony" },
        { id: "i2", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop", caption: "Group Gathering" },
        { id: "i3", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=600&fit=crop", caption: "Celebration" },
      ],
    },
    {
      id: "gg-2023-06", year: "2023",
      title: "Certificate Distribution",
      thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&h=600&fit=crop", caption: "Certificate Ceremony" },
        { id: "i2", src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=900&h=600&fit=crop", caption: "Faculty & Students" },
      ],
    },
    {
      id: "gg-2023-07", year: "2023",
      title: "Cultural Display",
      thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=900&h=600&fit=crop", caption: "Cultural Performance" },
        { id: "i2", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&h=600&fit=crop", caption: "Stage Event" },
      ],
    },
    {
      id: "gg-2023-08", year: "2023",
      title: "Open Presentation",
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=600&fit=crop", caption: "Presentation" },
        { id: "i2", src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=900&h=600&fit=crop", caption: "Panel Discussion" },
      ],
    },
    {
      id: "gg-2023-09", year: "2023",
      title: "Speaker Session",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&fit=crop", caption: "Guest Lecture" },
        { id: "i2", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop", caption: "Q&A Session" },
      ],
    },
    {
      id: "gg-2023-10", year: "2023",
      title: "Relife Hospital Visit",
      thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=600&fit=crop", caption: "Hospital Visit" },
        { id: "i2", src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=900&h=600&fit=crop", caption: "Therapy Section" },
      ],
    },
    {
      id: "gg-2023-11", year: "2023",
      title: "Convocation Ceremony",
      thumbnail: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=900&h=600&fit=crop", caption: "Convocation Day" },
        { id: "i2", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=600&fit=crop", caption: "Degree Distribution" },
        { id: "i3", src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=600&fit=crop", caption: "Graduates" },
      ],
    },
    {
      id: "gg-2023-12", year: "2023",
      title: "Talent Show",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&h=600&fit=crop", caption: "Performance" },
        { id: "i2", src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&h=600&fit=crop", caption: "Crowd" },
      ],
    },
    {
      id: "gg-2023-13", year: "2023",
      title: "Patent Filing Workshop",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=600&fit=crop", caption: "Workshop" },
      ],
    },
    {
      id: "gg-2023-14", year: "2023",
      title: "Pharma Congress",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=600&fit=crop", caption: "Congress" },
        { id: "i2", src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&h=600&fit=crop", caption: "Stall" },
      ],
    },
    {
      id: "gg-2023-15", year: "2023",
      title: "Moot Court",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&h=600&fit=crop", caption: "Moot Court" },
        { id: "i2", src: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=900&h=600&fit=crop", caption: "Advocate at Podium" },
        { id: "i3", src: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=900&h=600&fit=crop", caption: "Judge Panel" },
        { id: "i4", src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&h=600&fit=crop", caption: "Award Distribution" },
        { id: "i5", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&h=600&fit=crop", caption: "Group Photo" },
      ],
    },
    // ─── 2022 ─────────────────────────────────────────
    {
      id: "gg-2022-01", year: "2022",
      title: "Annual Function 2022",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop", caption: "Annual Function" },
        { id: "i2", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=600&fit=crop", caption: "Stage Show" },
        { id: "i3", src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&h=600&fit=crop", caption: "Audience" },
      ],
    },
    {
      id: "gg-2022-02", year: "2022",
      title: "Sports Day 2022",
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=600&fit=crop", caption: "Sports Day" },
        { id: "i2", src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=600&fit=crop", caption: "Race Event" },
        { id: "i3", src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&h=600&fit=crop", caption: "Trophy Distribution" },
      ],
    },
    {
      id: "gg-2022-03", year: "2022",
      title: "Science Exhibition 2022",
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&h=600&fit=crop", caption: "Science Exhibition" },
        { id: "i2", src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=900&h=600&fit=crop", caption: "Project Display" },
      ],
    },
    {
      id: "gg-2022-04", year: "2022",
      title: "Cultural Night 2022",
      thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=900&h=600&fit=crop", caption: "Cultural Night" },
        { id: "i2", src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&h=600&fit=crop", caption: "Dance Troupe" },
        { id: "i3", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&h=600&fit=crop", caption: "Stage" },
      ],
    },
    {
      id: "gg-2022-05", year: "2022",
      title: "Freshers Party 2022",
      thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&h=600&fit=crop", caption: "Freshers Party" },
        { id: "i2", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&h=600&fit=crop", caption: "Group Fun" },
      ],
    },
    {
      id: "gg-2022-06", year: "2022",
      title: "Seminar 2022",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop", caption: "Seminar Hall" },
        { id: "i2", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop", caption: "Speaker" },
        { id: "i3", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=600&fit=crop", caption: "Audience" },
      ],
    },
    {
      id: "gg-2022-07", year: "2022",
      title: "Industrial Visit 2022",
      thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=600&fit=crop", caption: "Industrial Visit" },
        { id: "i2", src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=900&h=600&fit=crop", caption: "Facility Tour" },
      ],
    },
    {
      id: "gg-2022-08", year: "2022",
      title: "Farewell 2022",
      thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&h=600&fit=crop", caption: "Farewell" },
        { id: "i2", src: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=900&h=600&fit=crop", caption: "Memories" },
        { id: "i3", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=600&fit=crop", caption: "Batch Photo" },
      ],
    },
    // ─── 2021 ─────────────────────────────────────────
    {
      id: "gg-2021-01", year: "2021",
      title: "Orientation 2021",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&h=600&fit=crop", caption: "Orientation Day" },
        { id: "i2", src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=900&h=600&fit=crop", caption: "Welcome Address" },
        { id: "i3", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop", caption: "Faculty Intro" },
      ],
    },
    {
      id: "gg-2021-02", year: "2021",
      title: "Foundation Day 2021",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop", caption: "Foundation Day" },
        { id: "i2", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=600&fit=crop", caption: "Celebration" },
      ],
    },
    {
      id: "gg-2021-03", year: "2021",
      title: "Workshop 2021",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=600&fit=crop", caption: "Workshop" },
        { id: "i2", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=600&fit=crop", caption: "Training" },
      ],
    },
    {
      id: "gg-2021-04", year: "2021",
      title: "Online Seminar 2021",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=600&fit=crop", caption: "Online Seminar" },
        { id: "i2", src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&h=600&fit=crop", caption: "Virtual Session" },
        { id: "i3", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&fit=crop", caption: "Speaker" },
      ],
    },
    {
      id: "gg-2021-05", year: "2021",
      title: "Award Ceremony 2021",
      thumbnail: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=900&h=600&fit=crop", caption: "Award Ceremony" },
        { id: "i2", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&h=600&fit=crop", caption: "Certificate" },
      ],
    },
    {
      id: "gg-2021-06", year: "2021",
      title: "Cultural Program 2021",
      thumbnail: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=280&fit=crop",
      images: [
        { id: "i1", src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&h=600&fit=crop", caption: "Cultural Show" },
        { id: "i2", src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&h=600&fit=crop", caption: "Dance" },
        { id: "i3", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&h=600&fit=crop", caption: "Stage" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════════
function GGLightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  return (
    <div className="gg-lb fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <button
        onClick={onClose}
        className="gg-lb__close absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
      >
        <X size={22} />
      </button>
      <button
        onClick={onPrev}
        disabled={index === 0}
        className="gg-lb__prev absolute left-3 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors disabled:opacity-20"
      >
        <ChevronLeft size={26} />
      </button>

      <div className="gg-lb__body flex flex-col items-center w-full max-w-4xl px-16">
        <img
          src={img.src}
          alt={img.caption}
          className="gg-lb__img max-h-[78vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <p className="gg-lb__caption mt-3 text-white/80 text-sm font-medium tracking-wide">
          {img.caption}
        </p>
        <p className="gg-lb__counter mt-1 text-white/40 text-xs">
          {index + 1} / {images.length}
        </p>
      </div>

      <button
        onClick={onNext}
        disabled={index === images.length - 1}
        className="gg-lb__next absolute right-3 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors disabled:opacity-20"
      >
        <ChevronRight size={26} />
      </button>

      <div className="gg-lb__strip absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-4 overflow-x-auto max-w-full">
        {images.map((im, i) => (
          <div
            key={im.id}
            className={`gg-lb__sthumb flex-shrink-0 w-14 h-9 rounded overflow-hidden border-2 transition-all ${
              i === index
                ? "border-[#ffb900] scale-110"
                : "border-transparent opacity-50 hover:opacity-90"
            }`}
          >
            <img src={im.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GROUP DETAIL — Screenshot 2 exact layout
// year tabs on top, ← Back, horizontal photo strip
// ═══════════════════════════════════════════════
function GGGroupDetail({ group, onBack }) {
  const [lbIndex, setLbIndex] = useState(null);

  return (
    <div className="gg-detail min-h-screen bg-[#dce9f3] animate-gg-fadein">
      {/* Same year-tab strip at top */}
      <div className="gg-detail__tabs flex border-b border-gray-300 bg-white">
        {groupGalleryData.years.map((y) => (
          <div
            key={y}
            className={`gg-detail__tab flex-1 py-3 text-sm font-bold text-center tracking-wide cursor-default select-none transition-colors ${
              y === group.year
                ? "bg-[#3a3a3a] text-white"
                : "text-gray-400 bg-white"
            }`}
          >
            {y}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="gg-detail__body px-5 pt-5 pb-10">
        {/* ← Back — exactly like screenshot 2 */}
        <button
          onClick={onBack}
          className="gg-detail__back inline-flex items-center gap-1.5 mb-5 text-[#00588b] font-semibold text-sm hover:underline"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        {/* Horizontal photo strip — exactly like screenshot 2 */}
        <div className="gg-detail__strip flex gap-3 overflow-x-auto pb-2">
          {group.images.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setLbIndex(i)}
              className="gg-detail__photo flex-shrink-0 w-56 h-40 rounded-lg overflow-hidden cursor-pointer relative group shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-white/60"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="gg-detail__photo-img w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
              <div className="gg-detail__photo-overlay absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={22}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              {/* caption tooltip on hover */}
              <div className="gg-detail__photo-cap absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-[10px] font-semibold truncate">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lbIndex !== null && (
        <GGLightbox
          images={group.images}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((p) => Math.max(0, p - 1))}
          onNext={() => setLbIndex((p) => Math.min(group.images.length - 1, p + 1))}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN PAGE — Screenshot 1 exact layout
// year tabs → thumbnail grid (5 col)
// ═══════════════════════════════════════════════
export default function GroupGallery() {
  const { years, groups } = groupGalleryData;
  const [activeYear, setActiveYear]       = useState(years[0]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const yearGroups = groups.filter((g) => g.year === activeYear);

  if (selectedGroup) {
    return (
      <GGGroupDetail
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
      />
    );
  }

  return (
    <div className="gg-page min-h-screen bg-[#dce9f3]">
      <style>{`
      body .gg-detail {
    position: relative;
    z-index: 9999;
}
        @keyframes gg-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-gg-fadein { animation: gg-fadein 0.28s ease both; }
        .gg-detail__strip::-webkit-scrollbar { height: 5px; }
        .gg-detail__strip::-webkit-scrollbar-track { background: transparent; }
        .gg-detail__strip::-webkit-scrollbar-thumb { background: #00588b66; border-radius: 4px; }
        .gg-card__title { overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
      `}</style>

      {/* ══ YEAR TAB BAR — exactly like screenshot 1 ══ */}
      <div className="gg-tabs flex border-b border-gray-300 bg-white shadow-sm">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`gg-tab relative flex-1 py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
              activeYear === year
                ? "gg-tab--active bg-[#3a3a3a] text-white"
                : "gg-tab--idle bg-white text-gray-500 hover:bg-gray-50 hover:text-[#00588b]"
            }`}
          >
            {year}
            {/* downward triangle arrow — exactly like screenshot */}
            {activeYear === year && (
              <span className="gg-tab__caret absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-r-[9px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#3a3a3a] z-10" />
            )}
          </button>
        ))}
      </div>

      {/* ══ GALLERY GRID — 5-col matching screenshot 1 ══ */}
      <div className="gg-grid max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-5">
        <div className="gg-grid__inner grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-gg-fadein">
          {yearGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className="gg-card group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 bg-white border border-gray-200"
            >
              {/* Thumbnail */}
              <div className="gg-card__thumb relative overflow-hidden h-32">
                <img
                  src={group.thumbnail}
                  alt={group.title}
                  className="gg-card__img w-full h-full object-cover transition-transform duration-500 group-hover:scale-107"
                />

                {/* photo count badge — top right */}
                <div className="gg-card__badge absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/55 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  <Images size={9} />
                  {group.images.length}
                </div>

                {/* hover tint + View label */}
                <div className="gg-card__overlay absolute inset-0 bg-[#00588b]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="gg-card__view-label bg-white/20 border border-white/40 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <ZoomIn size={11} /> View
                  </span>
                </div>
              </div>

              {/* Title row — blue top border like screenshot */}
              <div className="gg-card__body px-2 pt-1.5 pb-2 border-t-[3px] border-[#00588b]">
                <p className="gg-card__title text-[11px] font-bold text-[#00588b] leading-snug min-h-[2.4em]">
                  {group.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {yearGroups.length === 0 && (
          <div className="gg-empty flex flex-col items-center justify-center py-32 text-gray-400">
            <Images size={48} className="mb-3 opacity-25" />
            <p className="gg-empty__text text-base font-semibold">
              No albums for {activeYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}