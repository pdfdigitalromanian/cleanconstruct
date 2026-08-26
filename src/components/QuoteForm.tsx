import { ArrowUpRight, CheckCircle2, ImagePlus, Loader2 } from 'lucide-react'
import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { services } from '../data/services'
import { supabase } from '../lib/supabase'

type QuoteFields = {
  name: string
  phone: string
  email: string
  service: string
  locality: string
  approximateArea: string
  message: string
}

const initialFields: QuoteFields = {
  name: '',
  phone: '',
  email: '',
  service: '',
  locality: '',
  approximateArea: '',
  message: '',
}

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic'])

export function QuoteForm({ compact = false, defaultService = '', defaultLocality = '' }: { compact?: boolean; defaultService?: string; defaultLocality?: string }) {
  const formId = useId()
  const [fields, setFields] = useState<QuoteFields>({ ...initialFields, service: defaultService, locality: defaultLocality })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFields((current) => ({ ...current, [name]: value }))
  }

  const updateFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []).slice(0, 4)
    const invalid = selected.find((file) => file.size > 8 * 1024 * 1024 || !allowedImageTypes.has(file.type))
    if (invalid) {
      setStatus('error')
      setMessage('Folosește imagini JPG, PNG, WebP sau HEIC de maximum 8 MB fiecare.')
      return
    }
    setFiles(selected)
    setStatus('idle')
    setMessage('')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('pending')
    setMessage('')

    if (!supabase) {
      setStatus('error')
      setMessage('Formularul are nevoie de configurarea Supabase. Până atunci, scrie-ne la contact@cleanconstruct.ro.')
      return
    }

    try {
      const requestId = crypto.randomUUID()
      const photoPaths: string[] = []
      for (const file of files) {
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-')
        const path = `${requestId}/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('quote-uploads').upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        })
        if (uploadError) throw uploadError
        photoPaths.push(path)
      }

      const { error } = await supabase.from('quote_requests').insert({
        id: requestId,
        name: fields.name.trim(),
        phone: fields.phone.trim(),
        email: fields.email.trim(),
        service: fields.service,
        locality: fields.locality.trim(),
        approximate_area: fields.approximateArea ? Number(fields.approximateArea) : null,
        message: fields.message.trim(),
        photo_paths: photoPaths,
        source_url: window.location.href,
      })
      if (error) throw error

      setFields({ ...initialFields, service: defaultService, locality: defaultLocality })
      setFiles([])
      setStatus('success')
      setMessage('Mulțumim! Cererea ta a fost înregistrată. Te vom contacta pentru detalii.')
    } catch (error) {
      console.error('Quote request failed', error)
      setStatus('error')
      setMessage('Cererea nu a putut fi trimisă. Te rugăm să încerci din nou sau să ne scrii pe e-mail.')
    }
  }

  return (
    <form className={`quote-form ${compact ? 'is-compact' : ''}`} onSubmit={submit} id={formId}>
      <div className="form-grid">
        <label>
          <span>Nume *</span>
          <input name="name" value={fields.name} onChange={updateField} autoComplete="name" required placeholder="Numele tău" />
        </label>
        <label>
          <span>Telefon *</span>
          <input name="phone" value={fields.phone} onChange={updateField} autoComplete="tel" inputMode="tel" required placeholder="07xx xxx xxx" />
        </label>
        <label>
          <span>E-mail *</span>
          <input type="email" name="email" value={fields.email} onChange={updateField} autoComplete="email" required placeholder="nume@email.ro" />
        </label>
        <label>
          <span>Serviciu dorit *</span>
          <select name="service" value={fields.service} onChange={updateField} required>
            <option value="">Selectează serviciul</option>
            {services.map((service) => <option value={service.slug} key={service.slug}>{service.shortTitle}</option>)}
          </select>
        </label>
        <label>
          <span>Localitate *</span>
          <input name="locality" value={fields.locality} onChange={updateField} autoComplete="address-level2" required placeholder="București, Voluntari..." />
        </label>
        <label>
          <span>Suprafață aproximativă (m²)</span>
          <input type="number" name="approximateArea" value={fields.approximateArea} onChange={updateField} min="0" max="100000" placeholder="Ex: 85" />
        </label>
      </div>
      <label className="full-field">
        <span>Spune-ne despre proiect *</span>
        <textarea name="message" value={fields.message} onChange={updateField} required rows={compact ? 4 : 5} placeholder="Descrie spațiul, starea lui și când ai dori să începem." />
      </label>
      <div className="form-actions">
        <label className="file-button">
          <ImagePlus aria-hidden="true" />
          <span>{files.length ? `${files.length} fotografii selectate` : 'Adaugă fotografii'}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple onChange={updateFiles} />
        </label>
        <button className="button button-light" type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? <Loader2 className="spin" aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
          {status === 'pending' ? 'Se trimite…' : 'Solicită oferta'}
        </button>
      </div>
      {message ? <div className={`form-message ${status}`} role="status">{status === 'success' ? <CheckCircle2 aria-hidden="true" /> : null}{message}</div> : null}
      <p className="privacy-note">Prin trimiterea formularului ești de acord să folosim datele doar pentru a răspunde solicitării tale.</p>
    </form>
  )
}
