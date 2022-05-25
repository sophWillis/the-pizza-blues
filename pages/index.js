import Head from "next/head";
import { createClient } from "contentful";

import { parseEntryToWidget } from "../lib/parsers/widget.parser";
import { Header } from "../components/header/header.component";
import { SubNavigation } from "../components/sub-navigation/sub-navigation.component";

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

  const subNavigation = page.fields.subNavigation
    ? parseEntryToWidget(page.fields.subNavigation)
    : null;

  return {
    props: {
      header,
      subNavigation,
    },
  };
};

export const Home = ({ header, subNavigation }) => {
  return (
    <>
      <Head>
        <title>The Pizza Blues</title>
      </Head>
      <Header {...header} />
      <SubNavigation {...subNavigation} />
    </>
  );
};

export default Home;
