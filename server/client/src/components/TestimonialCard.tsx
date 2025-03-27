import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  initials: string;
  rating: number;
  delay: number;
}

const TestimonialCard = ({ quote, name, title, initials, rating, delay }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-xl p-8 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="text-[#E6AF2E] text-4xl absolute -top-5 left-6">
        <i className="fas fa-quote-left"></i>
      </div>
      <div className="pt-4">
        <p className="mb-6 italic text-gray-700">
          {quote}
        </p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-[#0A2463] flex items-center justify-center text-white font-bold mr-4">
            {initials}
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>
        <div className="text-[#E6AF2E] mt-4">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
          {rating % 1 !== 0 && (
            <i className="fas fa-star-half-alt"></i>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
