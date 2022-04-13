import { gql, useQuery } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const TEST = gql`
  query GetProducts {
    products {
      title
      slug
    }
  }
`;
const Home: React.FC = () => {
  const { data } = useQuery(TEST);
  return (
    <div>
      <Header />
      <pre>{JSON.stringify(data, null, 3)}</pre>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
