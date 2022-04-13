import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useGetProductsQuery } from "../graphql/generated/graphql";
import { withApollo } from "../lib/withApollo";

const Home: React.FC = () => {
  const { data } = useGetProductsQuery();

  return (
    <div>
      <Header />
      <pre>{JSON.stringify(data, null, 3)}</pre>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps : async ({req, res}) => {
        return {
            props : {}
        }
    }
});

export default withApollo(Home);
