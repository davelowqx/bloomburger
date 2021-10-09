import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-black p-2 text-light ">
        <p className="font-weight-light">
          BloomBurger Inc, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}