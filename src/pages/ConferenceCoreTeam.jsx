import { useState } from 'react'
import {
  Wind,
  Send,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  IdCard,
  Building2,
  Briefcase,
  Landmark,
  ChevronDown,
  ChevronLeft,
  CalendarCheck,
  FileText,
  Sparkles,
  ImagePlus,
  CheckCircle2,
  X,
  Lock,
} from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'
import { fileToUploadPayload, MAX_SOURCE_BYTES } from '../lib/imageUpload.js'

// Keep in sync with the POSITIONS list in
// netlify/functions/submit-conference-core-team.js.
const POSITIONS = ['Conference Co-Chair', 'Joint Secretary']

// Flip this back to false to reopen applications.
const FORM_CLOSED = true

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELDS = [
  { name: 'name', label: 'Full Name', icon: User, placeholder: 'e.g. Rtr. Ananya Sharma', maxLength: 120 },
  { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'e.g. name@example.com', maxLength: 160 },
  { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: 'e.g. 98765 43210', maxLength: 20 },
  { name: 'riId', label: 'RI ID', icon: IdCard, placeholder: 'e.g. 12345678', maxLength: 30 },
  { name: 'clubName', label: 'Club Name', icon: Building2, type: 'select' },
  { name: 'currentRole', label: 'Current Role in Club', icon: Briefcase, placeholder: 'e.g. Club President', maxLength: 80 },
  {
    name: 'districtPositions',
    label: 'Any Current or Previous District Position(s)',
    icon: Landmark,
    placeholder: 'e.g. Zone Coordinator 2024-25 — write "None" if not applicable',
    maxLength: 300,
  },
]

const PHOTO_FIELDS = [
  { name: 'formalPhoto', label: 'A Formal Photograph' },
  { name: 'casualPhoto', label: 'A Casual Photograph' },
]

const EMPTY_FORM = {
  position: '',
  name: '',
  email: '',
  phone: '',
  riId: '',
  clubName: '',
  currentRole: '',
  districtPositions: '',
  handledEvents: '',
  handledEventsDetails: '',
  vaayuVision: '',
}

const EMPTY_PHOTOS = { formalPhoto: null, casualPhoto: null }

export default function ConferenceCoreTeam() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [photos, setPhotos] = useState(EMPTY_PHOTOS)
  const [fieldErrors, setFieldErrors] = useState({})
  const [preparingPhotos, setPreparingPhotos] = useState(false)
  const { status, error, submit } = useFormSubmit('submit-conference-core-team')

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function selectPosition(position) {
    setForm((prev) => ({ ...prev, position }))
  }

  function changePosition() {
    setForm((prev) => ({ ...prev, position: '' }))
    setFieldErrors({})
  }

  async function handlePhotoChange(fieldName, file) {
    setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }))

    if (!file) {
      setPhotos((prev) => ({ ...prev, [fieldName]: null }))
      return
    }

    if (!file.type.startsWith('image/')) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: 'Please choose an image file' }))
      return
    }

    if (file.size > MAX_SOURCE_BYTES) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: 'That image is too large (max 20MB)' }))
      return
    }

    try {
      const preview = URL.createObjectURL(file)
      const payload = await fileToUploadPayload(file)
      setPhotos((prev) => ({ ...prev, [fieldName]: { fileName: file.name, preview, payload } }))
    } catch {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: 'Could not process that image, please try another' }))
    }
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

    if (!form.handledEvents) {
      errors.handledEvents = 'Please select an option'
    } else if (form.handledEvents === 'yes' && !form.handledEventsDetails.trim()) {
      errors.handledEventsDetails = 'This field is required'
    }

    if (!form.vaayuVision.trim()) {
      errors.vaayuVision = 'This field is required'
    }

    for (const field of PHOTO_FIELDS) {
      if (!photos[field.name]) {
        errors[field.name] = 'Please upload a photograph'
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (FORM_CLOSED) return
    if (!validate()) return

    setPreparingPhotos(true)
    let payload
    try {
      payload = {
        ...form,
        formalPhoto: photos.formalPhoto.payload,
        casualPhoto: photos.casualPhoto.payload,
      }
    } finally {
      setPreparingPhotos(false)
    }

    const ok = await submit(payload)
    if (ok) {
      setForm(EMPTY_FORM)
      setPhotos(EMPTY_PHOTOS)
    }
  }

  const isSubmitting = status === 'submitting' || preparingPhotos

  if (status === 'success') {
    return (
      <>
        <FormSuccessMessage
          title="Application Submitted"
          description="Thanks for putting yourself forward for the Vaayu Conference Core Team. Our team will review it and get in touch."
        />
        <p className="mx-auto max-w-xl px-4 pb-10 text-center text-xs text-slate-500">
          In case of submission issues, reach out to{' '}
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
        icon={<Wind size={14} />}
        badgeText="CONFERENCE CORE TEAM"
        title="Vaayu — Conference Core Team"
        description="Put yourself forward for the Vaayu Conference Core Team. Fill in the details below, we'll get back to you."
        logo="/assets/brand-centre/2026-27/event-logos/Vaayu.png"
        logoAlt="Vaayu — District Conference logo"
      />

      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm mt-8">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Application Form
          </span>
          <span className="inline-flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${FORM_CLOSED ? 'bg-red-500' : 'animate-pulse bg-emerald-500'}`} />
            <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${FORM_CLOSED ? 'text-red-600' : 'text-emerald-600'}`}>
              {FORM_CLOSED ? 'Closed' : 'Active'}
            </span>
          </span>
        </div>

        {FORM_CLOSED && (
          <div className="flex items-start gap-2 border-b border-amber-100 bg-amber-50 px-8 py-3 text-sm font-semibold text-amber-800">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>Applications for the Vaayu Conference Core Team are now closed. The form below is read-only.</span>
          </div>
        )}

        {!FORM_CLOSED && !form.position ? (
          <div className="p-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Select the position you're applying for
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {POSITIONS.map((position) => (
                <button
                  key={position}
                  type="button"
                  onClick={() => selectPosition(position)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-left text-sm font-bold text-slate-700 transition hover:border-[#d41367]/40 hover:bg-[#d41367]/5 hover:text-[#d41367]"
                >
                  <Sparkles size={18} className="shrink-0 text-[#d41367]" />
                  {position}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <fieldset disabled={FORM_CLOSED} className="space-y-6 p-8 disabled:opacity-60">
            {!FORM_CLOSED && (
              <button
                type="button"
                onClick={changePosition}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-[#d41367]"
              >
                <ChevronLeft size={14} />
                {form.position} · Change
              </button>
            )}

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

            <div className="grid gap-6 sm:grid-cols-2">
              {PHOTO_FIELDS.map((field) => {
                const photo = photos[field.name]
                return (
                  <FormField key={field.name} label={field.label} error={fieldErrors[field.name]}>
                    <label
                      className={`flex h-40 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed px-4 text-center transition ${
                        photo ? 'border-[#d41367]/40 bg-[#d41367]/5' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handlePhotoChange(field.name, e.target.files?.[0] ?? null)}
                      />
                      {photo ? (
                        <>
                          <img
                            src={photo.preview}
                            alt={`${field.label} preview`}
                            className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
                          />
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                            <CheckCircle2 size={14} />
                            Ready
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePhotoChange(field.name, null)
                            }}
                            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-600"
                          >
                            <X size={12} />
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <ImagePlus size={22} className="text-slate-400" />
                          <span className="text-xs font-semibold text-slate-500">Tap to upload</span>
                        </>
                      )}
                    </label>
                  </FormField>
                )
              })}
            </div>

            <FormField
              label="Have you handled any events at the Club or District level in the past?"
              error={fieldErrors.handledEvents}
            >
              <div className="grid grid-cols-2 gap-3">
                {['yes', 'no'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        handledEvents: option,
                        ...(option === 'no' ? { handledEventsDetails: '' } : {}),
                      }))
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-widest transition ${
                      form.handledEvents === option
                        ? 'border-[#d41367] bg-[#d41367] text-white'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <CalendarCheck size={16} />
                    {option === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </FormField>

            {form.handledEvents === 'yes' && (
              <FormField
                label="If yes, please share a brief overview of your experience"
                error={fieldErrors.handledEventsDetails}
              >
                <div className="relative">
                  <FileText size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" />
                  <textarea
                    value={form.handledEventsDetails}
                    maxLength={2000}
                    rows={3}
                    placeholder="Briefly describe the event(s) and your role"
                    onChange={(e) => updateField('handledEventsDetails', e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </FormField>
            )}

            <FormField label="How do you envision Vaayu?" error={fieldErrors.vaayuVision}>
              <div className="relative">
                <Wind size={18} className="pointer-events-none absolute left-4 top-4 text-slate-400" />
                <textarea
                  value={form.vaayuVision}
                  maxLength={2000}
                  rows={4}
                  placeholder="Share your vision for the conference"
                  onChange={(e) => updateField('vaayuVision', e.target.value)}
                  className={inputClasses}
                />
              </div>
            </FormField>

            {FORM_CLOSED ? (
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-300 px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-600 disabled:cursor-not-allowed"
              >
                <Lock size={16} />
                Applications Closed
              </button>
            ) : (
              <>
                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {preparingPhotos ? 'Preparing Photos...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Application
                    </>
                  )}
                </button>
              </>
            )}

            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Secure Transmission · District 3191
            </p>
            <p className="text-center text-xs text-slate-500">
              In case of submission issues, reach out to{' '}
              <a href="mailto:rotaract3191webtech2627@gmail.com" className="font-semibold text-[#d41367] hover:underline">
                rotaract3191webtech2627@gmail.com
              </a>
            </p>
          </fieldset>
          </form>
        )}
      </div>
    </div>
  )
}
