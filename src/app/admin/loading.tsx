export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-ink/10 bg-cream/80 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ink/15 animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-4 w-24 bg-ink/15 rounded animate-pulse" />
            <div className="h-3 w-40 bg-ink/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-ink/15 rounded animate-pulse" />
                <div className="h-5 w-8 bg-ink/10 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2.5">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div
                    key={j}
                    className="bg-white rounded-3xl p-4 space-y-2 border border-ink/5"
                  >
                    <div className="h-4 w-32 bg-ink/15 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-ink/10 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-ink/8 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
