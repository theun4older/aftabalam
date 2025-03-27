import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

interface TestimonialsSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const testimonials = [
  {
    quote: "James provided exceptional legal counsel during our company's merger. His attention to detail and strategic thinking helped us navigate complex negotiations with confidence. I highly recommend his services.",
    name: "Michael Scott",
    title: "CEO, Dunder Mifflin",
    initials: "MS",
    rating: 5
  },
  {
    quote: "Working with James on our intellectual property matters has been a game-changer for our startup. His expertise and proactive approach ensured our innovations were properly protected.",
    name: "Sarah Rodriguez",
    title: "Founder, InnoTech Solutions",
    initials: "SR",
    rating: 5
  },
  {
    quote: "James demonstrated exceptional skill in resolving our real estate dispute. His thorough preparation and courtroom expertise resulted in a favorable outcome. I wouldn't hesitate to recommend him.",
    name: "Jonathan Taylor",
    title: "Real Estate Developer",
    initials: "JT",
    rating: 4.5
  }
];

const TestimonialsSection = ({ registerSection }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    registerSection('testimonials', sectionRef.current);
  }, [registerSection]);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-[#F8F9FA] relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="absolute inset-0 bg-[#0A2463] opacity-95"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">Client <span className="text-[#E6AF2E]">Testimonials</span></h2>
          <div className="w-20 h-1 bg-[#E6AF2E] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-white/80">
            What clients are saying about their experience working with me on their legal matters.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              initials={testimonial.initials}
              rating={testimonial.rating}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
