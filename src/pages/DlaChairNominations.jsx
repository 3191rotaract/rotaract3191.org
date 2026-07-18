import { useState } from 'react'
import { Award, Send, AlertCircle, Loader2 } from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSectionHeader from '../components/forms/FormSectionHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'

const FIELDS = [
  { name: 'name', label: 'Full Name', maxLength: 120 },
  { name: 'clubName', label: 'Club Name', type: 'select' },
  { name: 'phone', label: 'Contact Number', type: 'tel', maxLength: 20 },
  { name: 'designation', label: 'Designation', maxLength: 80 },
]

const EMPTY_FORM = { name: '', clubName: '', phone: '', designation: '' }

export default function DlaChairNominations() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const { status, error, submit } = useFormSubmit('submit-dla-chair-nominations')

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const errors = {}

    for (const field of FIELDS) {
      const value = form[field.name].trim()
      if (!value) {
        errors[field.name] = 'This field is required'
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) return

    const ok = await submit(form)
    if (ok) setForm(EMPTY_FORM)
  }

  if (status === 'success') {
    return (
      <FormSuccessMessage
        title="Nomination Submitted"
        description="Thank you for putting yourself forward for DLA Chair. Our team will review your nomination and get in touch."
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <FormPageHeader
        icon={<Award size={14} />}
        badgeText="DLA CHAIR NOMINATIONS"
        title="Nominate Yourself"
        description="Put yourself forward to chair the District Leadership Assembly. Fill in the details below — we'll be in touch."
      />

      <FormSectionHeader title="Nomination Form" />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-4xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        {FIELDS.map((field) => (
          <FormField key={field.name} label={field.label} error={fieldErrors[field.name]}>
            {field.type === 'select' ? (
              <select
                value={form[field.name]}
                onChange={(e) => updateField(field.name, e.target.value)}
                className={inputClasses}
              >
                <option value="">Select your club</option>
                {ZONES.map((zone) => (
                  <optgroup key={zone.id} label={zone.name}>
                    {zone.clubs.map((club) => (
                      <option key={club.name} value={club.name}>
                        {club.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            ) : (
              <input
                type={field.type ?? 'text'}
                value={form[field.name]}
                maxLength={field.maxLength}
                onChange={(e) => updateField(field.name, e.target.value)}
                className={inputClasses}
              />
            )}
          </FormField>
        ))}

        {status === 'error' && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} />
              Submit Nomination
            </>
          )}
        </button>
      </form>
    </div>
  )
}
