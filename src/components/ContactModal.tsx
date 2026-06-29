'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Service = { id: string; title: string; price: string; amount: number | null }

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  selectedServices: Service[]
  total: number
}

export default function ContactModal({ isOpen, onClose, selectedServices, total }: ContactModalProps) {
  const [form, setForm] = useState({ nombre: '', email: '', instagram: '', notas: '' })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const serviceList = selectedServices.length
      ? selectedServices.map((s) => `• ${s.title}: ${s.price}`).join('\n')
      : '• Sin servicios seleccionados'
    const totalLine = total > 0 ? `\n💰 *Total estimado:* $${total.toLocaleString('es-CL')}` : ''
    const msg = encodeURIComponent(
      `¡Hola NegrocAlderon! 👋\n\n*Nuevo proyecto desde el sitio web*\n\n` +
      `👤 *Nombre:* ${form.nombre}\n` +
      `📧 *Email:* ${form.email}\n` +
      `📱 *Instagram:* ${form.instagram || 'No indicado'}\n\n` +
      `🛠 *Servicios de interés:*\n${serviceList}${totalLine}\n\n` +
      `📝 *Notas:*\n${form.notas || 'Sin notas adicionales'}`
    )
    window.open(`https://wa.me/56939548475?text=${msg}`, '_blank')
    setSuccess(true)
  }

  const handleClose = () => {
    setSuccess(false)
    setForm({ nombre: '', email: '', instagram: '', notas: '' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[9000] bg-dark/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center z-[9001] p-0 md:p-8"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="bg-surface border border-cream/10 rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-serif text-2xl text-cream font-light">Iniciar proyecto</h3>
                  <p className="font-sans text-xs text-cream/35 mt-1 tracking-wide">Te respondemos en menos de 24h</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-cream/15 flex items-center justify-center text-cream/40 hover:text-cream hover:border-cream/30 transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-2xl">✓</div>
                  <h4 className="font-serif text-xl text-cream">¡Mensaje enviado!</h4>
                  <p className="font-sans text-sm text-cream/40 text-center">Te abrió WhatsApp para que puedas enviarlo. ¡Te respondemos pronto!</p>
                  <button onClick={handleClose} className="mt-4 font-sans text-xs tracking-[0.1em] uppercase text-accent hover:text-accent-light transition-colors">Cerrar</button>
                </div>
              ) : (
                <>
                  {selectedServices.length > 0 && (
                    <div className="bg-dark/60 border border-cream/[0.07] rounded-2xl p-4 mb-6">
                      <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/25 mb-3">Tu selección</p>
                      <div className="space-y-2 mb-3">
                        {selectedServices.map((s) => (
                          <div key={s.id} className="flex justify-between items-center">
                            <span className="font-serif text-sm text-cream/70">{s.title}</span>
                            <span className="font-sans text-xs text-accent">{s.price}</span>
                          </div>
                        ))}
                      </div>
                      {total > 0 && (
                        <div className="flex justify-between items-center pt-3 border-t border-cream/[0.08]">
                          <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-cream/25">Total estimado</span>
                          <span className="font-serif text-lg text-cream">${total.toLocaleString('es-CL')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: 'nombre', label: 'Nombre y apellido', placeholder: 'Ej. María González', required: true },
                      { name: 'email', label: 'Email', placeholder: 'tu@email.com', required: true },
                      { name: 'instagram', label: 'Instagram (opcional)', placeholder: '@tu.marca' },
                    ].map(({ name, label, placeholder, required }) => (
                      <div key={name}>
                        <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream/35 block mb-1.5">{label}</label>
                        <input
                          type={name === 'email' ? 'email' : 'text'}
                          required={required}
                          placeholder={placeholder}
                          value={form[name as keyof typeof form]}
                          onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                          className="w-full bg-dark/50 border border-cream/10 rounded-xl px-4 py-3 font-sans text-sm text-cream placeholder-cream/20 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream/35 block mb-1.5">Cuéntanos un poco más de tu proyecto</label>
                      <textarea
                        rows={3}
                        placeholder="Tu idea, tu marca, tu visión..."
                        value={form.notas}
                        onChange={(e) => setForm((p) => ({ ...p, notas: e.target.value }))}
                        className="w-full bg-dark/50 border border-cream/10 rounded-xl px-4 py-3 font-sans text-sm text-cream placeholder-cream/20 focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-accent text-cream font-sans text-sm font-medium tracking-[0.06em] py-4 rounded-full hover:bg-accent-light transition-colors duration-300 mt-2"
                    >
                      Enviar por WhatsApp →
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
