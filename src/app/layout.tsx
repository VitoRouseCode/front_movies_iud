import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';




export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="es">
        <body style={{height: "100vh"}}>
          {children}
        </body>
    </html>
       
  );
}