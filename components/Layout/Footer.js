import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-black p-2 text-white ">
        <p className="fw-light">BloomBurger Inc, {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
