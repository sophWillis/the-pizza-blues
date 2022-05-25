import Head from "next/head";
import { createClient } from "contentful";

import { parseEntryToWidget } from "../lib/parsers/widget.parser";
import { Header } from "../components/header/header.component";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const {
    items: [page],
  } = await client.getEntries({
    limit: 1,
    include: 10,
    content_type: "landingPage",
  });

  const header = page.fields.header
    ? parseEntryToWidget(page.fields.header)
    : null;

  return {
    props: {
      header,
    },
  };
};

export const Home = ({ header }) => {
  return (
    <>
      <Head>
        <title>The Pizza Blues</title>
      </Head>
      <Header {...header} />
    </>
  );
};

export default Home;
