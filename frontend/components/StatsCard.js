"use client";
export default function StatsCard({
  title,
  value,
  bg,
  text,
}) {
  return (
    <div
      className={`${bg} border border-[#d4d4d4] rounded-sm py-2 text-center shadow-sm`}
    >
      <p
        className={`text-lg md:text-xl font-extrabold tracking-tight ${text}`}
      >
        {title}: {value}
      </p>
    </div>
  );
}

