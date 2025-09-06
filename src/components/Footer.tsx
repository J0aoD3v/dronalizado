"use client";

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <p className="mt-4 text-sm" style={{ fontSize: "1.6rem" }}>
            ©{currentYear} DRONALIZADO. Todos os direitos reservados.
          </p>
          <div
            className="footer-contact text-sm space-y-1"
            style={{ marginTop: "0.5rem" }}
          >
            <p>Bandeirantes - PR e região</p>
            <p>(43) 99181-9073</p>
            <p>belchior.julia12@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
