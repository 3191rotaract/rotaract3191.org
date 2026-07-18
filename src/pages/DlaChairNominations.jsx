import { useState } from 'react'
import {
  Award,
  Send,
  AlertCircle,
  Loader2,
  User,
  Building2,
  Phone,
  IdCard,
  ChevronDown,
  CalendarCheck,
  Users,
  FileText,
  Trophy,
} from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'

const FIELDS = [
  { name: 'name', label: 'Full Name', icon: User, placeholder: 'e.g. Rtr. Girish A R', maxLength: 120 },
  { name: 'clubName', label: 'Club Name', icon: Building2, type: 'select' },
  { name: 'phone', label: 'Contact Number', icon: Phone, type: 'tel', placeholder: 'e.g. 98765 43210', maxLength: 20 },
  { name: 'designation', label: 'Designation in Club', icon: IdCard, placeholder: 'e.g. Club President, Secretary', maxLength: 80 },
]

const YES_NO_FIELDS = [
  {
    name: 'chairedEvent',
    label: 'Chaired any district or club event in the past?',
    icon: CalendarCheck,
    detailsName: 'chairedEventDetails',
    detailsLabel: 'If yes, please describe your experience',
    detailsPlaceholder: 'Briefly describe the event(s) and your role in chairing them',
  },
  {
    name: 'workedCommittee',
    label: 'Worked in any committees in District Events?',
    icon: Users,
    detailsName: 'workedCommitteeDetails',
    detailsLabel: 'If yes, describe your roles & responsibilities',
    detailsPlaceholder: 'Briefly describe the committee(s) and what you were responsible for',
  },
]

const EMPTY_FORM = {
  name: '',
  clubName: '',
  phone: '',
  designation: '',
  chairedEvent: '',
  chairedEventDetails: '',
  workedCommittee: '',
  workedCommitteeDetails: '',
  justification: '',
}

export default function DlaChairNominations() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const { status, error, submit } = useFormSubmit('submit-dla-chair-nominations')

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function updateYesNo(name, detailsName, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(value === 'no' ? { [detailsName]: '' } : {}),
    }))
  }

  function validate() {
    const errors = {}

    for (const field of FIELDS) {
      const value = form[field.name].trim()
      if (!value) {
        errors[field.name] = 'This field is required'
      }
    }

    for (const field of YES_NO_FIELDS) {
      if (!form[field.name]) {
        errors[field.name] = 'Please select an option'
      } else if (form[field.name] === 'yes' && !form[field.detailsName].trim()) {
        errors[field.detailsName] = 'This field is required'
      }
    }

    if (!form.justification.trim()) {
      errors.justification = 'This field is required'
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
        description="Our team will review it and get in touch."
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <FormPageHeader
        icon={<Award size={14} />}
        badgeText="DLA CHAIR NOMINATIONS"
        title="Siddhi - 4th District Learning Assembly"
        description="Put yourself forward to chair the 4th District Learning Assembly. Fill in the details below, we'll get back to you."
        logo="/assets/brand-centre/2026-27/event-logos/Siddhi.png"
        logoAlt="Siddhi — 4th District Learning Assembly logo"
      />

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm mt-8"
      >
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Nomination Form 
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

          {YES_NO_FIELDS.map((field) => {
            const Icon = field.icon
            return (
              <div key={field.name} className="space-y-6">
                <FormField label={field.label} error={fieldErrors[field.name]}>
                  <div className="grid grid-cols-2 gap-3">
                    {['yes', 'no'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateYesNo(field.name, field.detailsName, option)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-widest transition ${
                          form[field.name] === option
                            ? 'border-[#d41367] bg-[#d41367] text-white'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <Icon size={16} />
                        {option === 'yes' ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                </FormField>

                {form[field.name] === 'yes' && (
                  <FormField label={field.detailsLabel} error={fieldErrors[field.detailsName]}>
                    <div className="relative">
                      <FileText size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" />
                      <textarea
                        value={form[field.detailsName]}
                        maxLength={2000}
                        rows={3}
                        placeholder={field.detailsPlaceholder}
                        onChange={(e) => updateField(field.detailsName, e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </FormField>
                )}
              </div>
            )
          })}

          <FormField label="Justify why you think you will be perfect as a DLA Chairperson." error={fieldErrors.justification}>
            <div className="relative">
              <Trophy size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" />
              <textarea
                value={form.justification}
                maxLength={2000}
                rows={4}
                placeholder="Tell us what makes you the right fit for this role"
                onChange={(e) => updateField('justification', e.target.value)}
                className={inputClasses}
              />
            </div>
          </FormField>

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
                Submit Nomination
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
