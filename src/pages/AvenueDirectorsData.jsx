import { useState } from 'react'
import {
  Users,
  Send,
  AlertCircle,
  Loader2,
  User,
  Phone,
  IdCard,
  Mail,
  ChevronLeft,
  Building2,
  Heart,
  Globe,
  Briefcase,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Share2,
  Code2,
  GraduationCap,
  Landmark,
  ChevronDown,
  CalendarDays,
  Palette,
  Wallet,
  Newspaper,
  HandHeart,
} from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'

// Keep in sync with the AVENUES list in
// netlify/functions/submit-avenue-directors-data.js — each name here becomes
// its own tab in the Avenue Directors Data spreadsheet.
const AVENUES = [
  { name: 'Club Service', icon: Building2 },
  { name: 'Community Service', icon: Heart },
  { name: 'International Service', icon: Globe },
  { name: 'Professional Development', icon: Briefcase },
  { name: 'Public Image', icon: Megaphone },
  { name: 'SAA', icon: ShieldCheck },
  { name: 'Next Gen', icon: Sparkles },
  { name: 'Social Media', icon: Share2 },
  { name: 'Web & Tech', icon: Code2 },
  { name: 'Club Learning Facilitator', icon: GraduationCap },
  { name: 'Club Foundation Chairman', icon: Landmark },
  { name: 'Events', icon: CalendarDays },
  { name: 'Design and Visual Communications', icon: Palette },
  { name: 'Treasurer', icon: Wallet },
  { name: 'Editorial', icon: Newspaper },
  { name: 'CSR', icon: HandHeart },
]

const FIELDS = [
  { name: 'name', label: 'Full Name', icon: User, placeholder: 'e.g. Rtn. Rtr. Anirudh G Kulkarni', maxLength: 120 },
  { name: 'clubName', label: 'Club Name', icon: Building2, type: 'select' },
  { name: 'phone', label: 'Contact Number', icon: Phone, type: 'tel', placeholder: 'e.g. 98765 43210', maxLength: 20 },
  { name: 'riId', label: 'RI ID', icon: IdCard, placeholder: 'e.g. 12345678', maxLength: 30, optional: true },
  { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'e.g. name@example.com', maxLength: 160 },
]

const EMPTY_FORM = {
  avenue: '',
  name: '',
  clubName: '',
  phone: '',
  riId: '',
  email: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AvenueDirectorsData() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const { status, error, submit } = useFormSubmit('submit-avenue-directors-data')

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function selectAvenue(avenue) {
    setForm((prev) => ({ ...prev, avenue }))
  }

  function changeAvenue() {
    setForm((prev) => ({ ...prev, avenue: '' }))
    setFieldErrors({})
  }

  function validate() {
    const errors = {}

    for (const field of FIELDS) {
      if (field.optional) continue
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
        icon={<Users size={14} />}
        badgeText="AVENUE DIRECTORS DATA"
        title="Avenue Directors Data"
        description="Club Avenue Directors, please share your details below so we can stay connected with you."
      />

      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm mt-8">
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

        {!form.avenue ? (
          <div className="p-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Select your avenue
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {AVENUES.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => selectAvenue(name)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-left text-sm font-bold text-slate-700 transition hover:border-[#d41367]/40 hover:bg-[#d41367]/5 hover:text-[#d41367]"
                >
                  <Icon size={18} className="shrink-0 text-[#d41367]" />
                  {name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            <button
              type="button"
              onClick={changeAvenue}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-[#d41367]"
            >
              <ChevronLeft size={14} />
              {form.avenue} · Change
            </button>

            {FIELDS.map((field) => {
              const Icon = field.icon
              return (
                <FormField
                  key={field.name}
                  label={field.label}
                  error={fieldErrors[field.name]}
                  optional={field.optional}
                >
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
          </form>
        )}
      </div>
    </div>
  )
}
