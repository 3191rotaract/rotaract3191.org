export default function FormField({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-900">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs font-semibold text-red-600">
          {error}
        </span>
      )}
    </label>
  )
}
