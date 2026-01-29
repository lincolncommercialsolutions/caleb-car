'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/slideshow/911custom.jpeg', '/slideshow/custom-modifications.jpeg', '/slideshow/head1.jpeg', '/slideshow/head3.jpeg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative bg-gradient-to-br from-surface via-background to-surface overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`Luxury car ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-accent opacity-5 z-[1]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-text-primary leading-tight">
            Precision Engineering
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-text-secondary font-light">
            Automotive Excellence from Southwest Michigan
          </p>
          <p className="text-base sm:text-lg mb-8 sm:mb-10 text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
            World-class automotive customization, performance tuning, and restoration—crafted with uncompromising precision.
          </p>
          <p className="text-base sm:text-lg mb-8 sm:mb-10 text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
            From our state-of-the-art facility in Southwest Michigan, we deliver exceptional results to passionate enthusiasts around the globe.
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <a 
              href="/services" 
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
            >
              Explore Services
            </a>
            <a 
              href="/contact" 
              className="bg-surface border-2 border-accent hover:bg-accent hover:text-white text-text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
            >
              Get Started
            </a>
          </div>

          {/* Slideshow indicators */}
          <div className="flex gap-3 justify-center mt-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-accent w-8' 
                    : 'bg-text-secondary hover:bg-accent opacity-50 hover:opacity-100'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
