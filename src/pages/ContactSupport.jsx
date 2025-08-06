import React, { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

const ContactSupport = () => {
  const form = useRef()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()
    setSent(false)
    setError(false)

    emailjs
      .sendForm("service_gdzxaeo", "template_hk9853t", form.current, "GaBDQxhP0ASdqxt-I")
      .then(
        () => {
          setSent(true)
          form.current.reset()
        },
        () => {
          setError(true)
        }
      )
  }

  return (
    <div className="max-w-xl mx-auto p-4 shadow-xl rounded-2xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Support</h2>

      <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4">
        <input type="text" name="user_name" placeholder="Your Name" required className="border p-2 rounded" />
        <input type="email" name="user_email" placeholder="Your Email" required className="border p-2 rounded" />
        <textarea name="message" rows="4" placeholder="Your Message" required className="border p-2 rounded"></textarea>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-all">
          Send Message
        </button>
        {sent && <p className="text-green-600 text-center">Message sent successfully!</p>}
        {error && <p className="text-red-600 text-center">Something went wrong. Please try again.</p>}
      </form>
    </div>
  )
}

export default ContactSupport
