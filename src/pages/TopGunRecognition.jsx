import { useState } from 'react'
import { Award, Building2, Briefcase, CheckCircle2, IdCard, ImagePlus, Loader2, Send, User, X } from 'lucide-react'
import { useFormSubmit } from '../hooks/useFormSubmit.js'
import FormField from '../components/forms/FormField.jsx'
import FormPageHeader from '../components/forms/FormPageHeader.jsx'
import FormSuccessMessage from '../components/forms/FormSuccessMessage.jsx'
import { inputClasses, selectClasses } from '../components/forms/formStyles.js'
import { ZONES } from '../data/zones.js'
import { fileToUploadPayload, MAX_SOURCE_BYTES } from '../lib/imageUpload.js'

const EMPTY_FORM = { name: '', clubName: '', riId: '', clubRole: '', reason: '' }
const EMPTY_PHOTO = null

export default function TopGunRecognition() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [photo, setPhoto] = useState(EMPTY_PHOTO)
  const [fieldErrors, setFieldErrors] = useState({})
  const [preparingPhoto, setPreparingPhoto] = useState(false)
  const { status, error, submit } = useFormSubmit('submit-top-gun-recognition')

  function updateField(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  async function handlePhotoChange(file) {
    setFieldErrors((previous) => ({ ...previous, casualPhoto: undefined }))
    if (!file) {
      setPhoto(null)
      return
    }
    if (!file.type.startsWith('image/')) {
      setFieldErrors((previous) => ({ ...previous, casualPhoto: 'Please choose an image file' }))
      return
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setFieldErrors((previous) => ({ ...previous, casualPhoto: 'That image is too large (max 20MB)' }))
      return
    }
    try {
      const payload = await fileToUploadPayload(file)
      setPhoto({ preview: URL.createObjectURL(file), payload })
    } catch {
      setFieldErrors((previous) => ({ ...previous, casualPhoto: 'Could not process that image, please try another' }))
    }
  }

  function validate() {
    const errors = {}
    for (const [name, value] of Object.entries(form)) {
      if (!value.trim()) errors[name] = 'This field is required'
    }
    const words = form.reason.trim().split(/\s+/).filter(Boolean)
    if (form.reason.trim() && words.length > 250) errors.reason = 'Please limit the reason to 250 words'
    if (!photo) errors.casualPhoto = 'Please upload a casual photo'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    setPreparingPhoto(true)
    let payload
    try {
      payload = { ...form, casualPhoto: photo.payload }
    } finally {
      setPreparingPhoto(false)
    }
    const ok = await submit(payload)
    if (ok) {
      setForm(EMPTY_FORM)
      setPhoto(null)
    }
  }

  if (status === 'success') {
    return (
      <FormSuccessMessage
        title="Nomination Submitted"
        description="Thank you for recognising a Top Gun Rotaractor. The nomination has been recorded for Quarter 1."
      />
    )
  }

  const reasonWords = form.reason.trim() ? form.reason.trim().split(/\s+/).filter(Boolean).length : 0
  const isSubmitting = status === 'submitting' || preparingPhoto

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <FormPageHeader
        icon={<Award size={14} />}
        badgeText="QUARTER 1 RECOGNITION"
        title="Top Gun Rotaractors"
        description="Nominate an outstanding Rotaractor for Quarter 1 recognition. Please submit one nomination per member."
      />

      <div className="mt-8 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <FormField label="Name of the Rotaractor" error={fieldErrors.name}>
            <div className="relative">
              <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={form.name} maxLength={120} onChange={(event) => updateField('name', event.target.value)} className={inputClasses} placeholder="e.g. Rtr. Ananya Sharma" />
            </div>
          </FormField>

          <FormField label="Club Name" error={fieldErrors.clubName}>
            <div className="relative">
              <Building2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select value={form.clubName} onChange={(event) => updateField('clubName', event.target.value)} className={selectClasses}>
                <option value="">Select the club</option>
                {ZONES.map((zone) => (
                  <optgroup key={zone.id} label={zone.name}>
                    {zone.clubs.map((club) => <option key={club.name} value={club.name}>{club.name}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          </FormField>

          <FormField label="RI ID" error={fieldErrors.riId}>
            <div className="relative">
              <IdCard size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={form.riId} maxLength={30} onChange={(event) => updateField('riId', event.target.value)} className={inputClasses} placeholder="e.g. 12345678" />
            </div>
          </FormField>

          <FormField label="Role in Club" error={fieldErrors.clubRole}>
            <div className="relative">
              <Briefcase size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={form.clubRole} maxLength={120} onChange={(event) => updateField('clubRole', event.target.value)} className={inputClasses} placeholder="e.g. Club President" />
            </div>
          </FormField>

          <FormField label="Reason for Nomination (maximum 250 words)" error={fieldErrors.reason}>
            <textarea value={form.reason} onChange={(event) => updateField('reason', event.target.value)} className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#d41367] focus:ring-2 focus:ring-[#d41367]/20" placeholder="Tell us why this Rotaractor deserves recognition." />
            <div className={`mt-1 text-right text-xs ${reasonWords > 250 ? 'font-bold text-red-600' : 'text-slate-400'}`}>{reasonWords}/250 words</div>
          </FormField>

          <FormField label="Upload a Casual Photo of the Member" error={fieldErrors.casualPhoto}>
            <label className={`flex h-44 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed px-4 text-center transition ${photo ? 'border-[#d41367]/40 bg-[#d41367]/5' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhotoChange(event.target.files?.[0] ?? null)} />
              {photo ? (
                <>
                  <img src={photo.preview} alt="Casual photo preview" className="h-20 w-20 rounded-lg border border-slate-200 object-cover" />
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><CheckCircle2 size={14} /> Ready</span>
                  <button type="button" onClick={(event) => { event.preventDefault(); handlePhotoChange(null) }} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-600"><X size={12} /> Remove</button>
                </>
              ) : (
                <>
                  <ImagePlus size={22} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">Tap to upload</span>
                  <span className="text-[11px] text-slate-400">JPG, PNG or WEBP</span>
                </>
              )}
            </label>
          </FormField>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
          <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d41367] px-5 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#b81058] disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> Submitting...</> : <><Send size={17} /> Submit Nomination</>}
          </button>
        </form>
      </div>
    </div>
  )
}
