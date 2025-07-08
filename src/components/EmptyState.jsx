// src/components/EmptyState.jsx
export default function EmptyState({ text = "Tidak ada data." }) {
  return (
    <div className="text-center text-gray-400 py-10">
      <p>{text}</p>
    </div>
  )
}
