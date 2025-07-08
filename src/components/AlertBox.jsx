// src/components/AlertBox.jsx
export default function AlertBox({ type = "info", children }) {
  const baseStyle = "px-4 py-2 rounded mb-4 text-sm"

  const variants = {
    success: "bg-green-100 text-green-700 border border-green-300",
    error: "bg-red-100 text-red-700 border border-red-300",
    info: "bg-blue-100 text-blue-700 border border-blue-300"
  }

  return (
    <div className={`${baseStyle} ${variants[type] || variants.info}`}>
      {children}
    </div>
  )
}
