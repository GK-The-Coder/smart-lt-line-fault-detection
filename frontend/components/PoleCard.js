"use client";
export default function PoleCard({ pole }) {
  const isFault = pole.status === "fault";

  return (
    <div
      className={`rounded-md border px-3 py-3 text-sm leading-snug shadow-sm ${
        isFault
          ? "bg-[#f8dede] border-[#e2b1b1]"
          : "bg-[#dff1df] border-[#aed0ae]"
      }`}
    >
      <h3
        className={`font-extrabold text-lg mb-2 ${
          isFault
            ? "text-[#c05656]"
            : "text-[#2f7d46]"
        }`}
      >
        {pole.poleId}
      </h3>

      <p className="text-[#5f5348] font-semibold">
        Status:
        <span className="font-bold ml-1">
          {pole.status}
        </span>
      </p>

      <p className="text-[#5f5348] font-semibold">
        Voltage:
        <span className="font-bold ml-1">
          {Number(pole.voltage).toFixed(1)} V
        </span>
      </p>

      <p className="text-[#5f5348] font-semibold">
        Current:
        <span className="font-bold ml-1">
          {Number(pole.current).toFixed(1)} A
        </span>
      </p>

      <p className="text-[#5f5348] font-semibold">
        Voltage Out:
        <span className="font-bold ml-1">
          {pole.voltageOut || 220} V
        </span>
      </p>

      <p className="text-[#5f5348] font-semibold">
        Current Out:
        <span className="font-bold ml-1">
          {pole.currentOut || 10} A
        </span>
      </p>

      <p className="text-[#5f5348] font-semibold">
        Time:
        <span className="font-bold ml-1">
          {new Date().toLocaleTimeString()}
        </span>
      </p>
    </div>
  );
}

