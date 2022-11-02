import Head from "next/head";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Dry Erase</title>
        <meta name="description" content="Dry Erase app" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <div className="flex justify-center h-screen">
          <h1 className="text-xl font-bold text-gray-600 inter">dry Erase</h1>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
