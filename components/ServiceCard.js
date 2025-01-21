export default function ServiceCard({ title, description, image }) {
  return (
    <div className="bg-surface rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border group">
      <div className="h-48 bg-gradient-to-br from-accent to-accent-hover opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-accent transition">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
