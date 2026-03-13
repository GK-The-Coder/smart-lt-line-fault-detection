export default function PoleCard({ pole }) {

  const statusStyle =
    pole.status === "fault"
      ? "border-red-500 shadow-red-500/40"
      : pole.theftDetected
      ? "border-yellow-400 shadow-yellow-400/40"
      : "border-green-500 shadow-green-500/40";

  return (
    <div className={`bg-[#1e293b] p-6 rounded-2xl border-l-4 ${statusStyle} shadow-lg`}>
      <h3 className="text-xl font-semibold">{pole.poleId}</h3>

      <div className="mt-3 text-gray-300 space-y-1">
        <p>Status: <span className="font-semibold">{pole.status}</span></p>
        <p>Voltage: {pole.voltage?.toFixed(2)} V</p>
        <p>Current: {pole.current?.toFixed(2)} A</p>
        <p className="text-sm text-gray-400">
          {new Date(pole.timestamp).toLocaleTimeString()}
        </p>
      </div>

      {pole.status === "fault" && (
        <div className="mt-3 text-red-400 animate-pulse font-semibold">
          🚨 Fault Detected
        </div>
      )}
    </div>
  );
}
