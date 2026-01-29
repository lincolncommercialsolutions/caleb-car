import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img src="/CB Precision Auto.png" alt="CB PRECISION AUTO" className="h-32 mb-4" />
            <p className="text-text-secondary">
              Elevating luxury vehicle care with expert craftsmanship and 20+ years of experience.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-text-secondary hover:text-accent transition">Services</Link></li>
              <li><Link href="/about" className="text-text-secondary hover:text-accent transition">About Us</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-accent transition">Contact</Link></li>
              <li><Link href="/admin" className="text-text-secondary hover:text-accent transition">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-text-primary">Contact Info</h3>
            <p className="text-text-secondary">Email: info@cbprecisionauto.com</p>
            <p className="text-text-secondary">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-text-secondary">
          <p>&copy; {new Date().getFullYear()} CB PRECISION AUTO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
