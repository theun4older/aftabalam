import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = ({ registerSection }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      privacy: false,
    }
  });

  useEffect(() => {
    registerSection('contact', sectionRef.current);
  }, [registerSection]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
        variant: "default",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get In <span className="text-[#E6AF2E]">Touch</span></h2>
          <div className="w-20 h-1 bg-[#E6AF2E] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg">
            Ready to discuss your legal needs? Reach out today for a consultation. I'm here to provide the expert legal guidance you deserve.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#0A2463] text-white rounded-lg shadow-xl p-8 h-full">
              <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#E6AF2E]/20 p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt text-[#E6AF2E]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office Address</h4>
                    <p>123 Legal Avenue, Suite 500<br />New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#E6AF2E]/20 p-3 rounded-full mr-4">
                    <i className="fas fa-phone text-[#E6AF2E]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <a href="tel:+12125551234" className="hover:text-[#E6AF2E] transition-colors duration-300">(212) 555-1234</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#E6AF2E]/20 p-3 rounded-full mr-4">
                    <i className="fas fa-envelope text-[#E6AF2E]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a href="mailto:james@wilsonlaw.com" className="hover:text-[#E6AF2E] transition-colors duration-300">james@wilsonlaw.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#E6AF2E]/20 p-3 rounded-full mr-4">
                    <i className="fas fa-clock text-[#E6AF2E]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-bold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white/10 hover:bg-[#E6AF2E]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i className="fab fa-linkedin-in text-[#E6AF2E]"></i>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-[#E6AF2E]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i className="fab fa-twitter text-[#E6AF2E]"></i>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-[#E6AF2E]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <i className="fab fa-facebook-f text-[#E6AF2E]"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">Send a Message</h3>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name *</label>
                <input 
                  type="text" 
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent`}
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  {...register("phone")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="service" className="block text-gray-700 font-bold mb-2">Service of Interest</label>
                <select 
                  id="service"
                  {...register("service")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="litigation">Litigation</option>
                  <option value="intellectual-property">Intellectual Property</option>
                  <option value="real-estate">Real Estate Law</option>
                  <option value="estate-planning">Estate Planning</option>
                  <option value="employment">Employment Law</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message *</label>
                <textarea 
                  id="message"
                  {...register("message")}
                  rows={5}
                  className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent`}
                  placeholder="Please describe your legal needs"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    {...register("privacy")}
                    className={`h-5 w-5 ${errors.privacy ? 'border-red-500' : 'border-gray-300'} text-[#E6AF2E]`}
                  />
                  <span className="ml-2 text-sm text-gray-700">I agree to the <a href="#" className="text-[#0A2463] hover:text-[#E6AF2E]">privacy policy</a> and consent to being contacted regarding my inquiry.</span>
                </label>
                {errors.privacy && (
                  <p className="mt-1 text-red-500 text-sm">{errors.privacy.message}</p>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E6AF2E] hover:bg-yellow-500 text-[#0A2463] font-bold py-3 px-8 rounded-md transition-colors duration-300 shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
