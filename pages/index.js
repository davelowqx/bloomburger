import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const data = await fetch(
    `http://query2.finance.yahoo.com/v10/finance/quoteSummary/FB?modules=summaryDetail,incomeStatementHistory`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((error) => console.log(error));
  return { props: { data } };
}

export default function Home({ data }) {
  const [{ summaryDetail, incomeStatementHistory }] = data.quoteSummary.result;
  return (
    <div>
      <ul>
        <li>{summaryDetail.marketCap.raw}</li>
        <li>
          {incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw}
        </li>
      </ul>
    </div>
  );
}
