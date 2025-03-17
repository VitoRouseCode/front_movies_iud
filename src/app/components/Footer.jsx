'use client';
import React from 'react';
/* import styles from './Footer.module.css'; // O usa styles de globals.css */

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 IUDIGITAL</p>
      <div>
        <a href="/terms">Términos de uso</a> | <a href="/privacy">Privacidad</a> | <a href="/contact">Contacto</a>
      </div>
    </footer>
  );
};

export default Footer;