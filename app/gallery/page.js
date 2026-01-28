export default function Gallery() {
  const projects = [
    { title: "Porsche 911 Custom Build", category: "Performance" },
    { title: "BMW M5 Restoration", category: "Restoration" },
    { title: "Mercedes-AMG Detailing", category: "Detailing" },
    { title: "Audi R8 Performance Tune", category: "Performance" },
    { title: "Ferrari 458 Paint Correction", category: "Detailing" },
    { title: "Lamborghini Huracán Mods", category: "Custom" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-accent">Project Gallery</h1>
          <p className="text-lg sm:text-xl text-text-secondary">A showcase of precision craftsmanship</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-surface rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border group">
              <div className="h-64 bg-gradient-to-br from-accent to-accent-hover opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="p-6">
                <span className="text-sm text-accent font-semibold uppercase tracking-wide">{project.category}</span>
                <h3 className="text-xl font-bold mt-2 text-text-primary group-hover:text-accent transition">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
