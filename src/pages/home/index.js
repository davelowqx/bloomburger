import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      HOME
      <Link to={"/adr"}>ADR</Link>
      <Link to={"/financial"}>financial</Link>
    </div>
  );
}
