'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Service = { id: string; title: string; price: string }

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedServices: Service[]
  total: number
}

export default function ContactModal({ isOpen, onClose, selectedServices, total }: Props) {
  const [form, setForm] = useState({ nombre: '', email: '', instagram: '', notas: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const serviciosTexto = selectedServices.length > 0
      ? selectedServices.map((s) => `• ${s.title} — ${s.price}`).join('\n')
      : '(sin servicios seleccionados)'

    const totalTexto = total > 0
      ? `\n💰 *Total estimado:* $${total.toLocaleString('es-CL')}`
      : ''

    const mensaje = `🚀 *Nueva solicitud de proyecto*

👤 *Nombre:* ${form.nombre}
📧 *Email:* ${form.email}
📸 *Instagram:* ${form.instagram || '—'}

🛠️ *Servicios:*
${serviciosTexto}${totalTexto}

📝 *Proyecto:*
${form.notas}`

    const url = `https://wa.me/56939548475?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')

    setLoading(false)
    setSent(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSent(false); setForm({ nombre: '', email: '', instagram: '', notas: '' }) }, 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60000] bg-dark/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[60001] flex items-end md:items-center justify-center p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full md:max-w-xl bg-cream rounded-t-3xl md:rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                data-cursor="hover"
                className="absolute top-5 right-5 w-9 h-9 rounded-full border border-dark/15 flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/30 transition-all duration-200 z-10 cursor-none"
              >
                ✕
              </button>

              <div className="p-7 md:p-10">
                {!sent ? (
                  <>
                    {/* Header */}
                    <p className="font-sans text-[10px] text-dark/30 uppercase tracking-[0.2em] mb-3">Solicitud</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-light text-dark leading-tight mb-1">
                      Iniciar proyecto
                    </h2>
                    <p className="font-sans text-sm text-dark/45 mb-8">
                      Completa el formulario y te respondo en menos de 24h.
                    </p>

                    {/* Selected services summary */}
                    {selectedServices.length > 0 && (
                      <div className="mb-8 p-5 rounded-2xl border border-dark/10 bg-dark/[0.03]">
                        <p className="font-sans text-[10px] text-dark/35 uppercase tracking-widest mb-3">
                          Servicios seleccionados
                        </p>
                        <ul className="space-y-2 mb-3">
                          {selectedServices.map((s) => (
                            <li key={s.id} className="flex items-center justify-between">
                              <span className="font-sans text-sm text-dark/70">{s.title}</span>
                              <span className="font-serif text-sm font-medium text-red">{s.price}</span>
                            </li>
                          ))}
                        </ul>
                        {total > 0 && (
                          <div className="flex items-center justify-between pt-3 border-t border-dark/10">
                            <span className="font-sans text-xs text-dark/40 uppercase tracking-widest">Total estimado</span>
                            <span className="font-serif text-base font-medium text-dark">
                              ${total.toLocaleString('es-CL')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-[10px] text-dark/40 uppercase tracking-widest block mb-1.5">
                            Nombre y apellido
                          </label>
                          <input
                            type="text"
                            required
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            placeholder="Alexis Calderón"
                            className="w-full font-sans text-sm text-dark bg-transparent border border-dark/15 rounded-xl px-4 py-3 placeholder:text-dark/25 focus:border-dark/40 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label className="font-sans text-[10px] text-dark/40 uppercase tracking-widest block mb-1.5">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="hola@marca.com"
                            className="w-full font-sans text-sm text-dark bg-transparent border border-dark/15 rounded-xl px-4 py-3 placeholder:text-dark/25 focus:border-dark/40 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-sans text-[10px] text-dark/40 uppercase tracking-widest block mb-1.5">
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={form.instagram}
                          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                          placeholder="@tumarca"
                          className="w-full font-sans text-sm text-dark bg-transparent border border-dark/15 rounded-xl px-4 py-3 placeholder:text-dark/25 focus:border-dark/40 focus:outline-none transition-colors duration-200"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-[10px] text-dark/40 uppercase tracking-widest block mb-1.5">
                          Cuéntanos un poco más de tu proyecto
                        </label>
                        <textarea
                          required
                          value={form.notas}
                          onChange={(e) => setForm({ ...form, notas: e.target.value })}
                          placeholder="¿Qué quieres lograr? ¿Tienes referencias? ¿Hay algún plazo?"
                          rows={4}
                          className="w-full font-sans text-sm text-dark bg-transparent border border-dark/15 rounded-xl px-4 py-3 placeholder:text-dark/25 focus:border-dark/40 focus:outline-none transition-colors duration-200 resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        data-cursor="hover"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full font-sans text-sm font-medium bg-dark text-cream py-4 rounded-xl cursor-none disabled:opacity-60 transition-opacity duration-200 mt-2"
                      >
                        {loading ? 'Enviando…' : 'Enviar solicitud →'}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-red/10 flex items-center justify-center mx-auto mb-6">
                      <span className="text-red text-2xl">✓</span>
                    </div>
                    <h3 className="font-serif text-3xl text-dark font-light mb-3">
                      ¡Recibido!
                    </h3>
                    <p className="font-sans text-sm text-dark/50 max-w-xs mx-auto leading-relaxed">
                      Te contactaré en menos de 24 horas para hablar de tu proyecto.
                    </p>
                    <button
                      onClick={handleClose}
                      data-cursor="hover"
                      className="mt-8 font-sans text-sm text-dark/40 hover:text-dark transition-colors duration-200 cursor-none"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
