import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-accent">Our Expertise</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Specialized automotive services delivered with uncompromising precision
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface border border-border rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <svg className="w-8 h-8 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary group-hover:text-accent transition">Bespoke Customization</h3>
              <p className="text-text-secondary">We transform your unique vision into reality through meticulously crafted modifications, premium materials, and personalized details that reflect your exact style.</p>
            </div>
            <div className="p-8 bg-surface border border-border rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <svg className="w-8 h-8 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary group-hover:text-accent transition">Performance Engineering</h3>
              <p className="text-text-secondary">Unlock maximum power, superior handling, and exhilarating dynamics with advanced tuning, engineered upgrades, and data-driven optimization.</p>
            </div>
            <div className="p-8 bg-surface border border-border rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <svg className="w-8 h-8 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary group-hover:text-accent transition">Concierge Detailing</h3>
              <p className="text-text-secondary">Museum-grade paint correction, long-lasting ceramic protection, and meticulous interior restoration—elevating your vehicle to a level that surpasses even the highest expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-surface via-background to-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-accent opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-accent">Get a Quote Today</h2>
          <p className="text-xl mb-8 text-text-secondary">Schedule your consultation with our team</p>
          <a 
            href="/contact" 
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-10 py-4 rounded-lg transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
