import { CheckCircle2 } from 'lucide-react'

export default function FormSuccessMessage({ title, description }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto mb-4 text-[#d41367]" size={48} />
      <h1 className="text-3xl font-black text-slate-900">{title}</h1>
      <p className="mt-3 text-slate-600">{description}</p>
    </div>
  )
}
