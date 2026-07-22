import { useState } from 'react'
import { Globe, Send, AlertCircle, Loader2, User, Building2, Phone, Mail, ChevronDown } from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'

const FIELDS = [
  { name: 'name', label: 'Full Name', icon: User, placeholder: 'e.g. Rtr. Samkit Samsukha', maxLength: 120 },
  { name: 'clubName', label: 'Club Name', icon: Building2, type: 'select' },
  { name: 'phone', label: 'Contact Number', icon: Phone, type: 'tel', placeholder: 'e.g. 98765 43210', maxLength: 20 },
  { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'e.g. name@example.com', maxLength: 160 },
]

const EMPTY_FORM = {
  name: '',
  clubName: '',
  phone: '',
  email: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function WebTechDirectorsData() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const { status, error, submit } = useFormSubmit('submit-web-tech-directors-data')

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

    if (!errors.email && form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address'
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
        title="Details Submitted"
        description="Thanks for sharing your details. Our team will be in touch."
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <FormPageHeader
        icon={<Globe size={14} />}
        badgeText="WEB & TECH DIRECTORS DATA"
        title="Web and Tech Directors Data"
        description="Club Web & Tech Directors, please share your details below so we can stay connected with you."
      />

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm mt-8"
      >
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Data Collection Form
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Active
            </span>
          </span>
        </div>

        <div className="space-y-6 p-8">
          {FIELDS.map((field) => {
            const Icon = field.icon
            return (
              <FormField key={field.name} label={field.label} error={fieldErrors[field.name]}>
                <div className="relative">
                  <Icon
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  {field.type === 'select' ? (
                    <>
                      <select
                        value={form[field.name]}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        className={selectClasses}
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
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </>
                  ) : (
                    <input
                      type={field.type ?? 'text'}
                      value={form[field.name]}
                      maxLength={field.maxLength}
                      placeholder={field.placeholder}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      className={inputClasses}
                    />
                  )}
                </div>
              </FormField>
            )
          })}

          {status === 'error' && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Details
              </>
            )}
          </button>

          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Secure Transmission · District 3191
          </p>
        </div>
      </form>
    </div>
  )
}
