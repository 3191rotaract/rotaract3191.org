import { useState } from 'react'
import {
  AlertCircle,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  User,
  Users,
  Loader2,
} from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'

const COMMITTEES = [
  'Backstage',
  'Decoration',
  'Emcee',
  'Finance',
  'Food',
  'Hospitality',
  'Logistics',
  'Operations',
  'Outreach',
  'Photography & Videography',
  'PR & Design',
  'Registration',
  'Volunteering - SAA',
  'Sponsorship',
  'Transportation',
]

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  zoneName: '',
  clubName: '',
  designation: '',
  committees: [],
  motivation: '',
}

export default function TarangCommitteeSignup() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const { status, error, submit } = useFormSubmit('submit-tarang-committee-signup')
  const selectedZone = ZONES.find((zone) => zone.name === form.zoneName)

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function updateZone(value) {
    setForm((prev) => ({ ...prev, zoneName: value, clubName: '' }))
    setFieldErrors((prev) => ({ ...prev, zoneName: undefined, clubName: undefined }))
  }

  function toggleCommittee(committee) {
    setForm((prev) => ({
      ...prev,
      committees: prev.committees.includes(committee)
        ? prev.committees.filter((item) => item !== committee)
        : [...prev.committees, committee],
    }))
    setFieldErrors((prev) => ({ ...prev, committees: undefined }))
  }

  function validate() {
    const errors = {}
    for (const field of ['name', 'email', 'phone', 'zoneName', 'clubName', 'designation', 'motivation']) {
      if (!form[field].trim()) errors[field] = 'This field is required'
    }
    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }
    if (form.committees.length === 0) errors.committees = 'Select at least one committee'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    const ok = await submit({
      ...form,
      interestedCommittee: form.committees.join(', '),
      committees: undefined,
    })
    if (ok) setForm(EMPTY_FORM)
  }

  if (status === 'success') {
    return (
      <>
        <FormSuccessMessage
          title="Signup Submitted"
          description="Thank you for joining the team behind Tarang 2026. The organising team will get in touch with you."
        />
        <p className="mx-auto max-w-xl px-4 pb-10 text-center text-xs text-slate-500">
          For submission issues, contact{' '}
          <a href="mailto:rotaract3191webtech2627@gmail.com" className="font-semibold text-[#d41367] hover:underline">
            rotaract3191webtech2627@gmail.com
          </a>
        </p>
      </>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <FormPageHeader
        icon={<Sparkles size={14} />}
        badgeText="TARANG 2026"
        title="Tarang Committee Signup"
        description="Join the team behind TARANG - Empowering Dreams, One Wave at a Time! Help us create an unforgettable celebration of talent, creativity and opportunities for children from NGOs and orphanages."
        logo="/assets/brand-centre/2026-27/event-logos/Tarang.png"
        logoAlt="Tarang logo"
      />

      <div className="mt-8 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />
        <div className="border-b border-slate-100 px-8 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#d41367]" /> December 20, 2026</span>
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#d41367]" /> Registration closes November 24, 2026</span>
          </div>
          <p className="mt-3 text-sm text-slate-500">Committee allocation is first-come, first-served, so apply early to secure your preferred committee.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Name" error={fieldErrors.name}>
              <div className="relative"><User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.name} maxLength={120} placeholder="Your full name" onChange={(e) => updateField('name', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="Mail ID" error={fieldErrors.email}>
              <div className="relative"><Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={form.email} maxLength={160} placeholder="you@example.com" onChange={(e) => updateField('email', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="Contact No." error={fieldErrors.phone}>
              <div className="relative"><Phone size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={form.phone} maxLength={20} placeholder="98765 43210" onChange={(e) => updateField('phone', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="Designation in the Club" error={fieldErrors.designation}>
              <div className="relative"><Users size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.designation} maxLength={100} placeholder="e.g. Club Secretary" onChange={(e) => updateField('designation', e.target.value)} className={inputClasses} /></div>
            </FormField>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Zone Name" error={fieldErrors.zoneName}>
              <div className="relative"><MapPin size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><select value={form.zoneName} onChange={(e) => updateZone(e.target.value)} className={selectClasses}><option value="">Select your zone</option>{ZONES.map((zone) => <option key={zone.id} value={zone.name}>{zone.name}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /></div>
            </FormField>
            <FormField label="Club Name" error={fieldErrors.clubName}>
              <div className="relative"><Building2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><select value={form.clubName} disabled={!selectedZone} onChange={(e) => updateField('clubName', e.target.value)} className={selectClasses}><option value="">{selectedZone ? 'Select your club' : 'Select a zone first'}</option>{selectedZone?.clubs.map((club) => <option key={club.name} value={club.name}>{club.name}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /></div>
            </FormField>
          </div>

          <FormField label="Interested Committee(s)" error={fieldErrors.committees}>
            <p className="mb-3 text-sm text-slate-500">Select all committees you would like to work with.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {COMMITTEES.map((committee) => {
                const checked = form.committees.includes(committee)
                return <button key={committee} type="button" onClick={() => toggleCommittee(committee)} aria-pressed={checked} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${checked ? 'border-[#d41367] bg-[#d41367]/10 text-[#d41367]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? 'border-[#d41367] bg-[#d41367] text-white' : 'border-slate-300'}`}>{checked && <Check size={14} />}</span>{committee}</button>
              })}
            </div>
          </FormField>

          <FormField label="Why do you want to work in this committee?" error={fieldErrors.motivation}>
            <div className="relative"><FileText size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" /><textarea value={form.motivation} maxLength={2000} rows={5} placeholder="Tell us about your interest, skills and how you would contribute." onChange={(e) => updateField('motivation', e.target.value)} className={inputClasses} /></div>
          </FormField>

          {status === 'error' && <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"><AlertCircle size={18} className="mt-0.5 shrink-0" /><span>{error}</span></div>}
          <button type="submit" disabled={status === 'submitting'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
            {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Signup</>}
          </button>
          <div className="border-t border-slate-100 pt-5 text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-600">For more details, contact</p>
            <p className="mt-2">IPP Rtr. Gouthami Parthasarathy · Event Chair · +91 9739219881</p>
            <p>Rtr. Utsav Kumar Sahoo · Event Co-Chair · +91 9113278597</p>
            <p>Rtr. Adithya N · Event Secretary · +91 9538360971</p>
          </div>
        </form>
      </div>
    </div>
  )
}
