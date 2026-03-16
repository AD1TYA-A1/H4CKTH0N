// components/StatusBar.jsx



export default function StatusBar() {
    
  return (
    <div className="flex gap-4 p-4">
      
      {/* Pending */}
      <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Pending
          </span>
        </div>
        <span className="text-xs font-bold bg-amber-500 text-black px-2 py-0.5 rounded-full">
          2
        </span>
      </div>

      {/* In Progress */}
      <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            In Progress
          </span>
        </div>
        <span className="text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">
          1
        </span>
      </div>

      {/* Completed */}
      <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-green-500">
            Completed
          </span>
        </div>
        <span className="text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">
          1
        </span>
      </div>

    </div>
  );
}