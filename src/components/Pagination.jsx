export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  function goto(n) {
    if (n >= 1 && n <= totalPages) onChange(n);
  }

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        onClick={() => goto(page - 1)}
        disabled={!canPrev}
        className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
      >
        Anterior
      </button>

      <div className="flex items-center gap-2">
        {start > 1 && <button onClick={() => goto(1)} className="px-2 py-1 rounded-md bg-gray-100">1</button>}
        {start > 2 && <span className="px-2">...</span>}
        {pages.map(p => (
          <button
            key={p}
            onClick={() => goto(p)}
            className={`px-3 py-1 rounded-md ${p === page ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
          >
            {p}
          </button>
        ))}
        {end < totalPages - 1 && <span className="px-2">...</span>}
        {end < totalPages && <button onClick={() => goto(totalPages)} className="px-2 py-1 rounded-md bg-gray-100">{totalPages}</button>}
      </div>

      <button
        onClick={() => goto(page + 1)}
        disabled={!canNext}
        className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
