import Head from "next/head";
import { createClient } from "contentful";

import {
  parseEntryToWidget,
  parseEntryCollectionToWidgetMap,
  renderWidgets,
} from "../lib/parsers/widget.parser";
import { Header } from "../components/header/header.component";
import { SubNavigation } from "../components/sub-navigation/sub-navigation.component";
import { HeroBanner } from "../components/hero-banner/hero-banner.component";
import { Footer } from "../components/footer/footer.component";

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

  const heroBanner = page.fields.heroBanner
    ? parseEntryToWidget(page.fields.heroBanner)
    : null;

  const body = page.fields.body
    ? parseEntryCollectionToWidgetMap(page.fields.body)
    : null;

  const footer = page.fields.footer
    ? parseEntryToWidget(page.fields.footer)
    : null;

  return {
    props: {
      header,
      subNavigation,
      heroBanner,
      body,
      footer,
    },
  };
};

export const Home = ({ header, subNavigation, heroBanner, body, footer }) => {
  console.log(body);
  return (
    <>
      <Head>
        <title>The Pizza Blues</title>
      </Head>
      <Header {...header} />
      <SubNavigation {...subNavigation} />
      <HeroBanner {...heroBanner} />
      {renderWidgets(body)}
      <Footer {...footer} />
    </>
  );
};

export default Home;
