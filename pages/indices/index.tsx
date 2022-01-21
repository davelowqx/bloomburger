import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      {["EXCH", "DRGN", "ALT", "MID", "SHIT", "PRIV", "DEFI"].map((index) => (
        <div key={index}>
          <a href={`/indexes/${index}`}>{index}</a>
        </div>
      ))}
    </>
  );
};

export default Home;
