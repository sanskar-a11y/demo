'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsConfirmed(false);
  };

  return (
    <section 
      id="contact" 
      className="relative h-[100svh] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[100svh] bg-[#050108] overflow-y-auto overflow-x-hidden">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d93b7d] rounded-full mix-blend-screen blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#451a42] rounded-full mix-blend-screen blur-[120px] opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050108]/50 to-[#050108] pointer-events-none"></div>

        <div className="w-full max-w-[1200px] mx-auto px-6 py-12 md:py-16 lg:py-24 relative z-10 min-h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              <motion.div
                key="contact-layout"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center"
              >
                {/* LEFT SIDE: Big Typography */}
                <div className="flex flex-col gap-6 md:gap-8 max-w-lg">
                  <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#f4e6ee] to-[#a87a96]">Let's</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d93b7d] to-[#7a205a]">Get In</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#f4e6ee] to-[#a87a96]">Touch</span>
                  </h2>
                  <p className="text-[#996d8b] text-sm md:text-lg leading-relaxed font-body">
                    Step into the noir. We'd love to hear from you. Whether you have questions,
                    feedback, or need support, our secure channels are open.
                  </p>
                </div>

                {/* RIGHT SIDE: Contact Form */}
                <form 
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-4 md:gap-5 w-full max-w-md lg:ml-auto backdrop-blur-xl bg-[#1c0c22]/40 p-6 md:p-8 rounded-2xl border border-[#451a42] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-xs md:text-[12px] uppercase tracking-wider text-[#996d8b] font-body font-bold">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[#451a42] py-1.5 text-[#f4e6ee] focus:border-[#d93b7d] focus:outline-none transition-colors font-body text-sm md:text-base"
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-xs md:text-[12px] uppercase tracking-wider text-[#996d8b] font-body font-bold">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-[#451a42] py-1.5 text-[#f4e6ee] focus:border-[#d93b7d] focus:outline-none transition-colors font-body text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-xs md:text-[12px] uppercase tracking-wider text-[#996d8b] font-body font-bold">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#451a42] py-1.5 text-[#f4e6ee] focus:border-[#d93b7d] focus:outline-none transition-colors font-body text-sm md:text-base"
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-xs md:text-[12px] uppercase tracking-wider text-[#996d8b] font-body font-bold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#451a42] py-1.5 text-[#f4e6ee] focus:border-[#d93b7d] focus:outline-none transition-colors font-body text-sm md:text-base"
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-xs md:text-[12px] uppercase tracking-wider text-[#996d8b] font-body font-bold">Message</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      className="w-full bg-transparent border-b border-[#451a42] py-1.5 text-[#f4e6ee] focus:border-[#d93b7d] focus:outline-none transition-colors resize-none font-body text-sm md:text-base"
                    />
                  </div>

                  <div className="pt-4 md:pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden rounded-full bg-[#d93b7d] py-3 md:py-4 text-center font-heading font-black tracking-widest text-[#f4e6ee] transition-all hover:bg-[#b52a65] hover:shadow-[0_0_20px_rgba(217,59,125,0.4)] disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                        {!isSubmitting && (
                          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1c0c22] border border-[#451a42] flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_30px_rgba(217,59,125,0.3)]">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#d93b7d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-4xl md:text-7xl text-[#f4e6ee] mb-4 md:mb-6 uppercase tracking-tight">
                  Transmission <br/><span className="text-[#d93b7d]">Secured</span>
                </h3>
                <p className="text-[#996d8b] text-base md:text-xl max-w-md mx-auto mb-8 md:mb-10 font-body">
                  Your message has vanished into the midnight ether. We will be in touch shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 md:px-8 py-3 rounded-full border border-[#451a42] text-[#f4e6ee] font-heading font-black tracking-widest hover:bg-[#1c0c22] transition-colors text-sm md:text-base"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
