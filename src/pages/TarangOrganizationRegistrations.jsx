import { useState } from 'react'
import {
  AlertCircle,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ImagePlus,
  Loader2,
  MapPin,
  Phone,
  Send,
  Sparkles,
  User,
  Users,
  X,
  CreditCard,
  IdCard,
  Link as LinkIcon,
} from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'
import { fileToUploadPayload, MAX_SOURCE_BYTES } from '../lib/imageUpload.js'

const EMPTY_FORM = {
  zoneName: '',
  clubName: '',
  clubId: '',
  organizationName: '',
  organizationAddress: '',
  expectedParticipants: '',
  pocName: '',
  pocContact: '',
}

export default function TarangOrganizationRegistrations() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [paymentScreenshot, setPaymentScreenshot] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [preparingPayment, setPreparingPayment] = useState(false)
  const { status, error, submit } = useFormSubmit('submit-tarang-organization-registrations')
  const selectedZone = ZONES.find((zone) => zone.name === form.zoneName)

  function updateField(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }))
    setFieldErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  function updateZone(value) {
    setForm((previous) => ({ ...previous, zoneName: value, clubName: '' }))
    setFieldErrors((previous) => ({ ...previous, zoneName: undefined, clubName: undefined }))
  }

  async function handlePaymentChange(file) {
    setFieldErrors((previous) => ({ ...previous, paymentScreenshot: undefined }))
    if (!file) {
      setPaymentScreenshot(null)
      return
    }
    if (!file.type.startsWith('image/')) {
      setFieldErrors((previous) => ({ ...previous, paymentScreenshot: 'Please choose an image file' }))
      return
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setFieldErrors((previous) => ({ ...previous, paymentScreenshot: 'That image is too large (max 20MB)' }))
      return
    }
    try {
      const payload = await fileToUploadPayload(file)
      setPaymentScreenshot({ preview: URL.createObjectURL(file), payload })
    } catch {
      setFieldErrors((previous) => ({ ...previous, paymentScreenshot: 'Could not process that image, please try another' }))
    }
  }

  function validate() {
    const errors = {}
    for (const field of [
      'zoneName',
      'clubName',
      'clubId',
      'organizationName',
      'organizationAddress',
      'expectedParticipants',
      'pocName',
      'pocContact',
    ]) {
      if (!form[field].trim()) errors[field] = 'This field is required'
    }
    if (form.expectedParticipants.trim()) {
      const participants = Number(form.expectedParticipants)
      if (!Number.isInteger(participants) || participants < 1) {
        errors.expectedParticipants = 'Please enter a valid participant count'
      }
    }
    if (!paymentScreenshot) {
      errors.paymentScreenshot = 'Please upload the payment screenshot'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    setPreparingPayment(true)
    let payload
    try {
      payload = { ...form, paymentScreenshot: paymentScreenshot.payload }
    } finally {
      setPreparingPayment(false)
    }

    const ok = await submit(payload)
    if (ok) {
      setForm(EMPTY_FORM)
      setPaymentScreenshot(null)
    }
  }

  if (status === 'success') {
    return (
      <>
        <FormSuccessMessage
          title="Organization Registered"
          description="Thank you for registering a Children's Home or NGO for Tarang 2026. The event team will review the registration and payment screenshot."
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

  const isSubmitting = status === 'submitting' || preparingPayment

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <FormPageHeader
        icon={<Sparkles size={14} />}
        badgeText="TARANG 2026"
        title="Tarang Organization Registrations"
        description="Participate in Tarang 2026 – Register any number of Children's Home/NGOs. One club can bring in multiple schools. Please fill a separate form for each school."
        logo="/assets/brand-centre/2026-27/event-logos/Tarang.png"
        logoAlt="Tarang logo"
      />

      <div className="mt-8 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />
        <div className="border-b border-slate-100 px-8 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#d41367]" /> Event Date: December 20, 2026</span>
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#d41367]" /> Registration Deadline: December 6, 2026</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Registration fee: Rs.1500/- per Children's Home/NGO</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Zone Name" error={fieldErrors.zoneName}>
              <div className="relative">
                <MapPin size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select value={form.zoneName} onChange={(event) => updateZone(event.target.value)} className={selectClasses}>
                  <option value="">Select your zone</option>
                  {ZONES.map((zone) => <option key={zone.id} value={zone.name}>{zone.name}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </FormField>
            <FormField label="Club Name" error={fieldErrors.clubName}>
              <div className="relative">
                <Building2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select value={form.clubName} disabled={!selectedZone} onChange={(event) => updateField('clubName', event.target.value)} className={selectClasses}>
                  <option value="">{selectedZone ? 'Select your club' : 'Select a zone first'}</option>
                  {selectedZone?.clubs.map((club) => <option key={club.name} value={club.name}>{club.name}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </FormField>
            <FormField label="Club ID" error={fieldErrors.clubId}>
              <div className="relative">
                <IdCard size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={form.clubId} maxLength={40} placeholder="Enter club ID" onChange={(event) => updateField('clubId', event.target.value)} className={inputClasses} />
              </div>
            </FormField>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Children's Home / NGO Name" error={fieldErrors.organizationName}>
              <div className="relative">
                <Building2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={form.organizationName} maxLength={200} placeholder="Enter organization name" onChange={(event) => updateField('organizationName', event.target.value)} className={inputClasses} />
              </div>
            </FormField>
            <FormField label="Expected Number of Participants" error={fieldErrors.expectedParticipants}>
              <div className="relative">
                <Users size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="number" min="1" value={form.expectedParticipants} placeholder="Enter expected count" onChange={(event) => updateField('expectedParticipants', event.target.value)} className={inputClasses} />
              </div>
            </FormField>
          </div>

          <FormField label="Children's Home / NGO Address (Google Map Location)" error={fieldErrors.organizationAddress}>
            <div className="relative">
              <LinkIcon size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" />
              <textarea value={form.organizationAddress} maxLength={2000} rows={3} placeholder="Paste the Google Maps link or enter the full address" onChange={(event) => updateField('organizationAddress', event.target.value)} className={inputClasses} />
            </div>
          </FormField>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="POC Name" error={fieldErrors.pocName}>
              <div className="relative">
                <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={form.pocName} maxLength={120} placeholder="Point of contact name" onChange={(event) => updateField('pocName', event.target.value)} className={inputClasses} />
              </div>
            </FormField>
            <FormField label="POC Contact" error={fieldErrors.pocContact}>
              <div className="relative">
                <Phone size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="tel" value={form.pocContact} maxLength={20} placeholder="98765 43210" onChange={(event) => updateField('pocContact', event.target.value)} className={inputClasses} />
              </div>
            </FormField>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <CreditCard size={18} className="text-[#d41367]" />
                Payment Details
              </div>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><span className="text-xs font-bold uppercase tracking-widest text-slate-400">Name of the Account</span><p className="mt-1 font-semibold text-slate-700">Rotaract District Organisation 3191</p></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Number</span><p className="mt-1 font-semibold text-slate-700">923 0200 3685 2958</p></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400">IFSC Code</span><p className="mt-1 font-semibold text-slate-700">UTIB0001615</p></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400">Name of the Bank</span><p className="mt-1 font-semibold text-slate-700">Axis Bank</p></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400">Branch</span><p className="mt-1 font-semibold text-slate-700">BTM Layout Bangalore (KT)</p></div>
              <div><span className="text-xs font-bold uppercase tracking-widest text-slate-400">Type of the Account</span><p className="mt-1 font-semibold text-slate-700">Current Account</p></div>
              <div className="flex items-center justify-center sm:justify-end">
                <img src="/tarang-payment-qr.png" alt="Tarang payment QR code" className="h-44 w-44 rounded-xl border border-slate-200 bg-white p-2 object-contain" />
              </div>
            </div>
          </div>

          <FormField label="Payment Screenshot" error={fieldErrors.paymentScreenshot}>
            <label className={`flex h-44 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed px-4 text-center transition ${paymentScreenshot ? 'border-[#d41367]/40 bg-[#d41367]/5' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => handlePaymentChange(event.target.files?.[0] ?? null)} />
              {paymentScreenshot ? (
                <>
                  <img src={paymentScreenshot.preview} alt="Payment screenshot preview" className="h-20 w-20 rounded-lg border border-slate-200 object-cover" />
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><CheckCircle2 size={14} /> Ready</span>
                  <button type="button" onClick={(event) => { event.preventDefault(); handlePaymentChange(null) }} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-600"><X size={12} /> Remove</button>
                </>
              ) : (
                <>
                  <ImagePlus size={22} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">Tap to upload payment screenshot</span>
                  <span className="text-[11px] text-slate-400">JPG, PNG or WEBP</span>
                </>
              )}
            </label>
          </FormField>

          {status === 'error' && <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"><AlertCircle size={18} className="mt-0.5 shrink-0" /><span>{error}</span></div>}
          <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Registration</>}
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
