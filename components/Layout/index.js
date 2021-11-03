import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div style={{ minHeight: "calc(100vh - 8rem)" }}>{children}</div>
      <Footer />
    </>
  );
}
