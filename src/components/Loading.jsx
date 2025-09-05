export default function Loading({ size = 32 }) {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <div className="spinner" style={{ width: size, height: size }} />
      <div className="text-gray-600">Carregando...</div>
    </div>
  );
}
