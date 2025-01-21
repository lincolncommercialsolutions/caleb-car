import Testimonials from '@/components/Testimonials';

export default function TestimonialsPage() {
  const allTestimonials = [
    {
      name: "Michael Thompson",
      vehicle: "Porsche 911 Turbo",
      text: "Exceptional service! The performance tuning transformed my car completely. The attention to detail is unmatched.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      vehicle: "BMW M5",
      text: "Best auto service I've ever experienced. The team's expertise with luxury vehicles is evident in every detail.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      vehicle: "Mercedes-AMG GT",
      text: "From custom mods to detailing, they exceeded all expectations. My car has never looked or performed better!",
      rating: 5
    },
    {
      name: "Jennifer Williams",
      vehicle: "Audi RS7",
      text: "Outstanding restoration work on my classic car. They brought it back to life beyond my expectations.",
      rating: 5
    },
    {
      name: "Robert Kim",
      vehicle: "Ferrari 488",
      text: "The concierge service is incredibly convenient. They picked up my car, serviced it, and returned it spotless!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-text-primary">Testimonials</h1>
          <p className="text-xl text-text-secondary">What our clients say about us</p>
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
