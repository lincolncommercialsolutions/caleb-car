'use client';
import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-surface border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-accent hover:text-accent-hover transition flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>CalebCar</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-primary hover:text-accent transition font-medium">Home</Link>
            <Link href="/services" className="text-text-primary hover:text-accent transition font-medium">Services</Link>
            <Link href="/about" className="text-text-primary hover:text-accent transition font-medium">About</Link>
            <Link href="/gallery" className="text-text-primary hover:text-accent transition font-medium">Gallery</Link>
            <Link href="/blog" className="text-text-primary hover:text-accent transition font-medium">Blog</Link>
            <Link href="/testimonials" className="text-text-primary hover:text-accent transition font-medium">Testimonials</Link>
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
              className="text-text-primary"
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
            <Link href="/" className="block py-2 text-text-primary hover:text-accent transition font-medium">Home</Link>
            <Link href="/services" className="block py-2 text-text-primary hover:text-accent transition font-medium">Services</Link>
            <Link href="/about" className="block py-2 text-text-primary hover:text-accent transition font-medium">About</Link>
            <Link href="/gallery" className="block py-2 text-text-primary hover:text-accent transition font-medium">Gallery</Link>
            <Link href="/blog" className="block py-2 text-text-primary hover:text-accent transition font-medium">Blog</Link>
            <Link href="/testimonials" className="block py-2 text-text-primary hover:text-accent transition font-medium">Testimonials</Link>
            <Link href="/contact" className="block py-2 mt-2 px-4 bg-accent hover:bg-accent-hover text-white rounded-lg transition font-semibold text-center">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
