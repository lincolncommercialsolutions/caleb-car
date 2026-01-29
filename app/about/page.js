export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-accent">About CB PRECISION AUTO</h1>
          <p className="text-lg sm:text-xl text-text-secondary">Automotive excellence from Southwest Michigan to the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface rounded-xl shadow-xl p-8 mb-8 border border-border">
          <h2 className="text-3xl font-bold mb-4 text-accent">Our Story</h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Based in Southwest Michigan, CB PRECISION AUTO has built a reputation for exceptional automotive craftsmanship 
            that extends far beyond the Great Lakes region. Our facility serves passionate enthusiasts from across 
            the United States and around the world who demand nothing less than perfection.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Our team of expert technicians specializes in high-performance and luxury vehicles, working with brands 
            like Porsche, BMW, Mercedes-Benz, Audi, Ferrari, and McLaren. Every project receives meticulous attention, 
            whether it's a local enthusiast or an international client shipping their prized vehicle to our doors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-surface rounded-xl shadow-xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              To provide unparalleled automotive services that exceed our clients' expectations, combining technical 
              expertise with personalized care and attention to detail.
            </p>
          </div>
          <div className="bg-surface rounded-xl shadow-xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Our Values</h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Excellence in craftsmanship</li>
              <li>Integrity and transparency</li>
              <li>Continuous innovation</li>
              <li>Customer satisfaction first</li>
            </ul>
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-text-primary">Certifications & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-background rounded-lg border border-border">
              <h3 className="font-semibold text-lg mb-2 text-accent">ASE Certified</h3>
              <p className="text-text-secondary">All technicians hold ASE Master certifications</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <h3 className="font-semibold text-lg mb-2 text-accent">Factory Trained</h3>
              <p className="text-text-secondary">Specialized training from major luxury manufacturers</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <h3 className="font-semibold text-lg mb-2 text-accent">State-of-the-Art</h3>
              <p className="text-text-secondary">Latest diagnostic and repair equipment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
