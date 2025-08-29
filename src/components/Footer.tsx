"use client";

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-10 text-center">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <p className="mt-4 text-sm">
            © {currentYear} DRONALIZADO. Todos os direitos reservados.
          </p>
        </div>
        <div className="text-sm space-y-1">
          <p>Bandeirantes - PR e região</p>
          <p>(43) 99181-9073</p>
          <p>belchior.julia12@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
