'use client';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Michael Thompson",
    vehicle: "Porsche 911 Turbo",
    text: "Exceptional service! The performance tuning transformed my car completely. The attention to detail is unmatched.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    vehicle: "BMW M5",
    text: "Best auto service I've ever experienced. The team's expertise with luxury vehicles is evident in every detail.",
    rating: 5
  },
  {
    id: 3,
    name: "David Rodriguez",
    vehicle: "Mercedes-AMG GT",
    text: "From custom mods to detailing, they exceeded all expectations. My car has never looked or performed better!",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">What Our Clients Say</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface p-8 rounded-xl shadow-2xl border border-border">
            <div className="flex justify-center mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <span key={i} className="text-accent text-3xl">★</span>
              ))}
            </div>
            <p className="text-xl text-text-primary mb-6 italic text-center leading-relaxed">"{current.text}"</p>
            <div className="text-center pt-4 border-t border-border">
              <p className="font-semibold text-lg text-text-primary">{current.name}</p>
              <p className="text-text-secondary">{current.vehicle}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={prevTestimonial}
              className="bg-surface hover:bg-accent text-text-primary hover:text-white px-6 py-3 rounded-lg transition border border-border shadow-lg hover:shadow-xl"
            >
              ← Previous
            </button>
            <button 
              onClick={nextTestimonial}
              className="bg-surface hover:bg-accent text-text-primary hover:text-white px-6 py-3 rounded-lg transition border border-border shadow-lg hover:shadow-xl"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
