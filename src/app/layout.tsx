'use client'; // Necesitamos usePathname, así que convertimos a componente cliente
import React from 'react';
import { usePathname } from 'next/navigation'; // Hook para obtener la ruta actual
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css'; // Importa estilos globales
import Navbar from '../app/components/navbar';
import Footer from '../app/components/Footer';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Obtiene la ruta actual (ej. '/', '/movies')

  // No mostramos Navbar ni Footer en la página raíz ('/')
  const showHeaderAndFooter = pathname !== '/';

  return (
    <html lang="es">
      <body className="body">
        {showHeaderAndFooter && <Navbar />} {/* Mostrar Navbar solo si no es la página raíz */}
        <div  >
          {children} {/* Contenido de la página */}
        </div>
        {showHeaderAndFooter && <Footer />} {/* Mostrar Footer solo si no es la página raíz */}
      </body>
    </html>
  );
}