import ServiceCard from '@/components/ServiceCard';

export default function Services() {
  const services = [
    {
      title: "Custom Modifications",
      description: "Transform your vehicle with bespoke modifications tailored to your vision. From body kits to interior upgrades, we make your dream car a reality."
    },
    {
      title: "Performance Tuning",
      description: "Unlock your vehicle's full potential with expert ECU tuning, exhaust upgrades, and suspension enhancements for maximum performance."
    },
    {
      title: "Luxury Detailing",
      description: "Meticulous care and attention to restore your vehicle's showroom shine. Paint correction, ceramic coating, and interior detailing."
    },
    {
      title: "Complete Restoration",
      description: "Bring classic and vintage vehicles back to their former glory with our comprehensive restoration services."
    },
    {
      title: "Concierge Services",
      description: "Premium pickup and delivery services, mobile diagnostics, and personalized care for your busy lifestyle."
    },
    {
      title: "Expert Repairs",
      description: "High-quality repairs using OEM parts and advanced diagnostic equipment. Specializing in European luxury vehicles."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-text-primary">Our Services</h1>
          <p className="text-xl text-text-secondary">Bespoke automotive solutions crafted to exceed expectations</p>
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
