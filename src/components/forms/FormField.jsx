export default function FormField({ label, error, optional, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
        {optional ? (
          <span className="text-slate-400 font-semibold normal-case tracking-normal">(optional)</span>
        ) : (
          <span className="text-[#d41367]">*</span>
        )}
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
