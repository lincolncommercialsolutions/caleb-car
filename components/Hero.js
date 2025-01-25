'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/car13.png', '/car27.png', '/car54.png'];

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-accent bg-opacity-10 rounded-full">
            <span className="text-accent font-semibold text-sm tracking-wide uppercase">Excellence Since 2004</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text-primary">
            Drive <span className="text-accent">Perfection</span>
          </h1>
          <p className="text-xl md:text-3xl mb-8 text-text-secondary font-light">
            Where Luxury Meets Performance
          </p>
          <p className="text-lg mb-10 text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Your premier destination for luxury automotive excellence. From precision engineering to bespoke customization, 
            we transform your vision into reality with two decades of masterful craftsmanship.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/services" 
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Services
            </a>
            <a 
              href="/contact" 
              className="bg-surface border-2 border-accent hover:bg-accent hover:text-white text-text-primary font-semibold px-8 py-4 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
