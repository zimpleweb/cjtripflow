import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function BookingForm({ tour }) {
  const form = useRef();
  const [status, setStatus] = useState(''); // Voor feedback: sending, success, error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Vervang deze drie waarden met jouw eigen EmailJS gegevens
    const serviceID = 'YOUR_SERVICE_ID';       // bijv. service_abc123
    const templateID = 'YOUR_TEMPLATE_ID';     // bijv. template_xyz789
    const publicKey = 'YOUR_PUBLIC_KEY';       // bijv. pk_xxxxxxxxxxxxxxxxxxxxxx

    emailjs
      .sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setStatus('success');
          form.current.reset(); // Formulier leegmaken na succes
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus('error');
        }
      );
  };

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-heading mb-4">Request a Quote & Book</h3>
      
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        {/* Verborgen veld met tour informatie (handig voor template) */}
        <input type="hidden" name="tour_name" value={tour?.title || 'Unnamed Tour'} />
        <input type="hidden" name="tour_slug" value={tour?.slug || ''} />

        <div>
          <label htmlFor="people" className="block text-sm font-medium text-gray-700">
            Number of People
          </label>
          <input
            type="number"
            name="people"
            id="people"
            min="1"
            defaultValue="2"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Preferred Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Additional Notes / Questions
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Any special requests, allergies, mobility needs, etc."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            status === 'sending'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-blue-700'
          } transition-colors`}
        >
          {status === 'sending'
            ? 'Sending...'
            : 'Request Price & Availability'}
        </button>
      </form>

      {/* Feedback berichten */}
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          Thank you! Your request has been sent. We'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          Something went wrong. Please try again or contact us directly via email.
        </div>
      )}
    </div>
  );
}