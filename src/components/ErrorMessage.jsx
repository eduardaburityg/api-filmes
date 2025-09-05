export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3">
      <strong className="block font-medium">Erro</strong>
      <div className="mt-1 text-sm">{message}</div>
    </div>
  );
}
