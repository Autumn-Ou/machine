import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Head from "next/head";

export default function Page404() {
  return (
    <>
      <Head>
        <title>404 | Scout Machine</title>
      </Head>
      <Navbar />
      <div className="flex items-center justify-center flex-col mt-16">
        <h1 className="text-5xl text-primary font-black">
          404 - Page Not Found
        </h1>
        <p className="text-lightGray">
          We tried searching our entire site, but couldn&apos;t find what you
          were looking for.{" "}
          <Link href="/" legacyBehavior>
            <a>
              <span className="text-white">Go back home?</span>
            </a>
          </Link>
        </p>
      </div>
    </>
  );
}
