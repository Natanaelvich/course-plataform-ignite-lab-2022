import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const pages: React.FC = () => {
  return (
    <div>
      <Header />

      <Footer />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default pages;
