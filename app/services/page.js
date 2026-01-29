import ServiceCard from '@/components/ServiceCard';

export default function Services() {
  const services = [
    {
      title: "Custom Modifications",
      description: "Transform your vehicle with bespoke modifications tailored to your vision. From body kits to interior upgrades, we make your dream car a reality.",
      image: "/services/custom-modifications.jpeg"
    },
    {
      title: "Performance Tuning",
      description: "Unlock your vehicle's full potential with expert ECU tuning, exhaust upgrades, and suspension enhancements for maximum performance.",
      image: "/services/performance-tuning.jpeg"
    },
    {
      title: "Luxury Detailing",
      description: "Meticulous care and attention to restore your vehicle's showroom shine. Paint correction, ceramic coating, and interior detailing.",
      image: "/services/luxury-detailing.jpeg"
    },
    {
      title: "Complete Restoration",
      description: "Bring classic and vintage vehicles back to their former glory with our comprehensive restoration services.",
      image: "/services/complete-restoration.jpeg"
    },
    {
      title: "Concierge Services",
      description: "Premium pickup and delivery services, mobile diagnostics, and personalized care for your busy lifestyle.",
      image: "/services/concierge-services.jpeg"
    },
    {
      title: "Expert Repairs",
      description: "High-quality repairs using OEM parts and advanced diagnostic equipment. Specializing in European luxury vehicles.",
      image: "/services/expert-repairs.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-accent">Our Services</h1>
          <p className="text-lg sm:text-xl text-text-secondary">Specialized automotive solutions delivered with precision</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
