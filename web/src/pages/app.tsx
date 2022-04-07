import {  withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React from "react";

const pages: React.FC = () => {
  return (
      <div>
          <h1>APP</h1>

          <Link href='/api/auth/logout'>
          <a>Logout</a>
          </Link>
      </div>
  );
};

export const getServerSideProps = withPageAuthRequired()

export default pages;
