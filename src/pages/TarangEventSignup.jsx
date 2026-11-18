import { useState } from 'react'
import {
  AlertCircle,
  Building2,
  CalendarDays,
  ChevronDown,
  Contact,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  User,
  Users,
  Loader2,
  IdCard,
  FileText,
} from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'

const EVENTS = [
  'Mono Acting',
  'Solo Singing',
  'Group Singing',
  'Quiz',
  'Drama',
  'Solo Dance',
  'Group Dance',
  'SpellBee',
  'Fancy Dress',
  'Drawing',
  'Origami',
  'Science Exhibition',
]

const EMPTY_FORM = {
  zoneName: '',
  clubName: '',
  clubId: '',
  presidentName: '',
  presidentContact: '',
  presidentEmail: '',
  secretaryName: '',
  secretaryContact: '',
  secretaryEmail: '',
  eventName: '',
  eventPocName: '',
  eventPocContact: '',
  biggestStrength: '',
  crowdExperience: '',
  crowdExperienceDetails: '',
}

export default function TarangEventSignup() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const { status, error, submit } = useFormSubmit('submit-tarang-event-signup')
  const selectedZone = ZONES.find((zone) => zone.name === form.zoneName)

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function updateZone(value) {
    setForm((prev) => ({ ...prev, zoneName: value, clubName: '' }))
    setFieldErrors((prev) => ({ ...prev, zoneName: undefined, clubName: undefined }))
  }

  function updateCrowdExperience(value) {
    setForm((prev) => ({
      ...prev,
      crowdExperience: value,
      ...(value === 'no' ? { crowdExperienceDetails: '' } : {}),
    }))
    setFieldErrors((prev) => ({
      ...prev,
      crowdExperience: undefined,
      crowdExperienceDetails: undefined,
    }))
  }

  function validate() {
    const errors = {}
    const requiredFields = [
      'zoneName',
      'clubName',
      'clubId',
      'presidentName',
      'presidentContact',
      'presidentEmail',
      'secretaryName',
      'secretaryContact',
      'secretaryEmail',
      'eventName',
      'biggestStrength',
    ]

    for (const field of requiredFields) {
      if (!form[field].trim()) errors[field] = 'This field is required'
    }
    for (const field of ['presidentEmail', 'secretaryEmail']) {
      if (form[field].trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[field].trim())) {
        errors[field] = 'Please enter a valid email address'
      }
    }
    if (!form.crowdExperience) {
      errors.crowdExperience = 'Please select an option'
    } else if (form.crowdExperience === 'yes' && !form.crowdExperienceDetails.trim()) {
      errors.crowdExperienceDetails = 'Please explain your experience'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    const ok = await submit(form)
    if (ok) setForm(EMPTY_FORM)
  }

  if (status === 'success') {
    return (
      <>
        <FormSuccessMessage
          title="Activity Registration Submitted"
          description="Thank you for partnering with Tarang 2026. The event team will review your club's activity choice and get in touch."
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
        title="Tarang Event SignUp Form"
        description="Partner with District, Tarang 2026 – Host an Activity! We invite Rotaract Clubs to host activities and events for children, bring your ideas to life and create meaningful experiences through fun, interactive and impactful activities."
        logo="/assets/brand-centre/2026-27/event-logos/Tarang.png"
        logoAlt="Tarang logo"
      />

      <div className="mt-8 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />
        <div className="border-b border-slate-100 px-8 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#d41367]" /> Event Date: December 20, 2026</span>
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#d41367]" /> Registration Deadline: November 24, 2026</span>
          </div>
          <p className="mt-3 text-sm text-slate-500">Activity allocation is on a first-come, first-served basis. Apply early to secure your preferred activity.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Zone Name" error={fieldErrors.zoneName}>
              <div className="relative"><MapPin size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><select value={form.zoneName} onChange={(e) => updateZone(e.target.value)} className={selectClasses}><option value="">Select your zone</option>{ZONES.map((zone) => <option key={zone.id} value={zone.name}>{zone.name}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /></div>
            </FormField>
            <FormField label="Club Name" error={fieldErrors.clubName}>
              <div className="relative"><Building2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><select value={form.clubName} disabled={!selectedZone} onChange={(e) => updateField('clubName', e.target.value)} className={selectClasses}><option value="">{selectedZone ? 'Select your club' : 'Select a zone first'}</option>{selectedZone?.clubs.map((club) => <option key={club.name} value={club.name}>{club.name}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /></div>
            </FormField>
            <FormField label="Club ID" error={fieldErrors.clubId}>
              <div className="relative"><IdCard size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.clubId} maxLength={40} placeholder="Enter club ID" onChange={(e) => updateField('clubId', e.target.value)} className={inputClasses} /></div>
            </FormField>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="President Name" error={fieldErrors.presidentName}>
              <div className="relative"><User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.presidentName} maxLength={120} placeholder="President's full name" onChange={(e) => updateField('presidentName', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="President Contact" error={fieldErrors.presidentContact}>
              <div className="relative"><Phone size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={form.presidentContact} maxLength={20} placeholder="98765 43210" onChange={(e) => updateField('presidentContact', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="President Email" error={fieldErrors.presidentEmail}>
              <div className="relative"><Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={form.presidentEmail} maxLength={160} placeholder="president@example.com" onChange={(e) => updateField('presidentEmail', e.target.value)} className={inputClasses} /></div>
            </FormField>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Secretary Name" error={fieldErrors.secretaryName}>
              <div className="relative"><User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.secretaryName} maxLength={120} placeholder="Secretary's full name" onChange={(e) => updateField('secretaryName', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="Secretary Contact" error={fieldErrors.secretaryContact}>
              <div className="relative"><Phone size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={form.secretaryContact} maxLength={20} placeholder="98765 43210" onChange={(e) => updateField('secretaryContact', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="Secretary Email" error={fieldErrors.secretaryEmail}>
              <div className="relative"><Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={form.secretaryEmail} maxLength={160} placeholder="secretary@example.com" onChange={(e) => updateField('secretaryEmail', e.target.value)} className={inputClasses} /></div>
            </FormField>
          </div>

          <FormField label="Event you as a club want to host" error={fieldErrors.eventName}>
            <div className="relative"><Sparkles size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><select value={form.eventName} onChange={(e) => updateField('eventName', e.target.value)} className={selectClasses}><option value="">Select an activity</option>{EVENTS.map((event) => <option key={event} value={event}>{event}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /></div>
          </FormField>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Event POC Name" optional error={fieldErrors.eventPocName}>
              <div className="relative"><Contact size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={form.eventPocName} maxLength={120} placeholder="Point of contact name" onChange={(e) => updateField('eventPocName', e.target.value)} className={inputClasses} /></div>
            </FormField>
            <FormField label="Event POC Contact Details" optional error={fieldErrors.eventPocContact}>
              <div className="relative"><Phone size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={form.eventPocContact} maxLength={20} placeholder="98765 43210" onChange={(e) => updateField('eventPocContact', e.target.value)} className={inputClasses} /></div>
            </FormField>
          </div>

          <FormField label="What is your club's biggest strength in organizing events?" error={fieldErrors.biggestStrength}>
            <div className="relative"><FileText size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" /><textarea value={form.biggestStrength} maxLength={2000} rows={5} placeholder="Describe your club's biggest organizing strength." onChange={(e) => updateField('biggestStrength', e.target.value)} className={inputClasses} /></div>
          </FormField>

          <FormField label="Do you have experience handling large crowds with children or time-sensitive activities?" error={fieldErrors.crowdExperience}>
            <div className="grid grid-cols-2 gap-3">
              {['yes', 'no'].map((option) => (
                <button key={option} type="button" aria-pressed={form.crowdExperience === option} onClick={() => updateCrowdExperience(option)} className={`rounded-xl border px-4 py-3 text-sm font-bold capitalize transition ${form.crowdExperience === option ? 'border-[#d41367] bg-[#d41367]/10 text-[#d41367]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>{option}</button>
              ))}
            </div>
          </FormField>

          {form.crowdExperience === 'yes' && (
            <FormField label="Please explain" error={fieldErrors.crowdExperienceDetails}>
              <div className="relative"><Users size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" /><textarea value={form.crowdExperienceDetails} maxLength={2000} rows={5} placeholder="Describe your relevant experience." onChange={(e) => updateField('crowdExperienceDetails', e.target.value)} className={inputClasses} /></div>
            </FormField>
          )}

          {status === 'error' && <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"><AlertCircle size={18} className="mt-0.5 shrink-0" /><span>{error}</span></div>}
          <button type="submit" disabled={status === 'submitting'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
            {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Registration</>}
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
