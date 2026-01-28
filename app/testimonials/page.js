import Testimonials from '@/components/Testimonials';

export default function TestimonialsPage() {
  const allTestimonials = [
    {
      name: "James Patterson",
      vehicle: "Porsche 911 GT3",
      text: "The team at CalebCar delivered beyond my expectations. Their precision tuning unlocked performance I didn't know was possible.",
      rating: 5
    },
    {
      name: "Rebecca Martinez",
      vehicle: "BMW M3 Competition",
      text: "Traveled from Chicago specifically for their expertise. Worth every mile. The craftsmanship speaks for itself.",
      rating: 5
    },
    {
      name: "Thomas Anderson",
      vehicle: "Mercedes-AMG C63",
      text: "Professional, knowledgeable, and meticulous. My car has never looked or performed this well. Highly recommended.",
      rating: 5
    },
    {
      name: "Jennifer Walsh",
      vehicle: "Audi RS6 Avant",
      text: "Drove from Detroit for their ceramic coating service. The attention to detail is extraordinary. Paint looks flawless.",
      rating: 5
    },
    {
      name: "Christopher Lee",
      vehicle: "McLaren 720S",
      text: "The engineering expertise here is world-class. They understand high-performance vehicles at a level few shops can match.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-accent">Testimonials</h1>
          <p className="text-lg sm:text-xl text-text-secondary">What our clients say</p>
        </div>
      </div>

      <Testimonials />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {allTestimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-surface p-8 rounded-xl shadow-xl border border-border hover:shadow-2xl transition-all duration-300">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-2xl">★</span>
                ))}
              </div>
              <p className="text-text-primary mb-4 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-text-primary">{testimonial.name}</p>
                <p className="text-text-secondary text-sm">{testimonial.vehicle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
