"use client";

import React from "react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo no rodapé */}
          <div
            className="inline-block"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "1.5vw",
              borderRadius: "0.75rem",
              width: "30vw",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Logo Dronalizado"
              width={500}
              height={200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <p className="mt-4 text-sm" style={{ fontSize: "1.6rem" }}>
            © {currentYear} DRONALIZADO. Todos os direitos reservados.
          </p>
          <div
            className="footer-contact text-sm space-y-1"
            style={{ marginTop: "0.5rem" }}
          >
            <p>Bandeirantes - PR e região</p>
            <p>(43) 99181-9073</p>
            <p>belchior.drones@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
