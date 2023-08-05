import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import Image from "next/image";
import {PrimaryLinkButton} from "~/components/PrimaryLinkButton";

function HeroBanner() {
  return (
      <section className="grid grid-cols-1 gap-12 px-8 mt-12 sm:mt-24 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
              <h1 className="text-6xl">Generate icons with the click of a button</h1>
              <p className="text-2xl">Use AI to generate icons on the flight</p>
              <PrimaryLinkButton href="/generate">Generate your Icons</PrimaryLinkButton>
        </div>
        <Image
            src="/banner.png"
            alt="An image of a bunch icons"
            width="300"
            height="300"
            className="order-first sm:-order-none"
        />
      </section>
  );
}

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center">
        <HeroBanner />
      </main>
    </>
  );
};

export default HomePage;
