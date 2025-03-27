import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface ClientsSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const clients = [
  {
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    name: "Summit Financial"
  },
  {
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    name: "Tech Innovations Inc."
  },
  {
    logo: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Global Enterprises"
  },
  {
    logo: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
    name: "Metropolitan Properties"
  },
  {
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    name: "Horizon Healthcare"
  },
  {
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    name: "Pinnacle Investments"
  }
];

const ClientsSection = ({ registerSection }: ClientsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    registerSection('clients', sectionRef.current);
  }, [registerSection]);

  return (
    <section
      id="clients"
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our <span className="text-[#E6AF2E]">Clients</span></h2>
          <div className="w-20 h-1 bg-[#E6AF2E] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg">
            We are proud to provide legal counsel to a diverse range of businesses and organizations across various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8F9FA] flex items-center justify-center overflow-hidden">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium">{client.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block bg-[#F8F9FA] p-4 rounded-lg">
            <p className="text-gray-700 italic">
              "We trust James Wilson Law Firm with our legal matters. Their expertise and dedication are unmatched."
            </p>
            <p className="mt-2 font-medium">— CEO, Summit Financial</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;