"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-10 text-center">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <p className="mt-4 text-sm">
            © {mounted ? currentYear : "2025"} DRONALIZADO. Todos os direitos
            reservados.
          </p>
        </div>
        <div className="text-sm">
          <p>Bandeirantes - PR e região</p>
          <p>(43) 99181-9073</p>
          <p>belchior.julia12@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
