import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
  title: 'DEMO | Liquid Luxury. Crafted in Velvet.',
  description: 'Premium Artisan Beverages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-midnight text-pearl font-body antialiased overflow-x-hidden">
        {/* Cinematic Overlays */}
        <Loader />
        <div className="noise-overlay" />
        <div className="vignette" />
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
