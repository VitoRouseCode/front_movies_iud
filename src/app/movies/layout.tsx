import React from 'react';
import Navbar from '../components/navbar';

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer className="bg-dark text-white p-3 text-center">
        <p>© 2025 Atenea</p>
      </footer>
    </div>
  );
}