'use client';
import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-accent hover:text-accent-hover transition flex items-center gap-2 mt-2">
            <img src="/CB Precision Auto.png" alt="CB PRECISION AUTO" className="h-40" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-accent transition font-medium">Home</Link>
            <Link href="/services" className="text-white hover:text-accent transition font-medium">Services</Link>
            <Link href="/about" className="text-white hover:text-accent transition font-medium">About</Link>
            <Link href="/gallery" className="text-white hover:text-accent transition font-medium">Gallery</Link>
            <Link href="/blog" className="text-white hover:text-accent transition font-medium">Blog</Link>
            <Link href="/testimonials" className="text-white hover:text-accent transition font-medium">Testimonials</Link>
            <Link href="/contact" className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition font-semibold shadow-lg">
              Contact
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
            <Link href="/" className="block py-2 text-white hover:text-accent transition font-medium">Home</Link>
            <Link href="/services" className="block py-2 text-white hover:text-accent transition font-medium">Services</Link>
            <Link href="/about" className="block py-2 text-white hover:text-accent transition font-medium">About</Link>
            <Link href="/gallery" className="block py-2 text-white hover:text-accent transition font-medium">Gallery</Link>
            <Link href="/blog" className="block py-2 text-white hover:text-accent transition font-medium">Blog</Link>
            <Link href="/testimonials" className="block py-2 text-white hover:text-accent transition font-medium">Testimonials</Link>
            <Link href="/contact" className="block py-2 mt-2 px-4 bg-accent hover:bg-accent-hover text-white rounded-lg transition font-semibold text-center">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
