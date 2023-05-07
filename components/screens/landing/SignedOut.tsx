/* eslint-disable @next/next/no-img-element */
import { CURR_YEAR } from "@/lib/constants";
import Image from "next/image";
import { FaGithub, FaDiscord, FaCoffee } from "react-icons/fa";

const Card = (props: any) => {
  return (
    <div
      className={`${props.className} flex mt-5 ${
        props.withHeight && "h-[33vh]"
      } flex-col rounded-lg py-10 px-8 border border-[#2A2A2A] bg-[#191919] max-w-screen-3xl`}
    >
      {props.children}
    </div>
  );
};

const Feature = (props: any) => {
  return (
    <div className="rounded-full bg-card hover:border-gray-600 select-none cursor-auto text-sm text-lightGray py-2 px-4 border border-[#2A2A2A] text-center flex items-center justify-center">
      {props.name}
    </div>
  );
};

export const SignedOutScreen = (props: { contributors: any }) => {
  return (
    <div className="pl-4 pr-4 md:pr-8 md:pl-8 mt-5">
      <div className="flex flex-col md:grid grid-cols-3 gap-x-5">
        <Card className="relative h-48 sm:h-auto" withHeight>
          <Image
            src="/smLogoGray.png"
            height="60"
            width="60"
            alt="Scout Machine Logo"
            priority={true}
            className="ml-[-8px]"
          />

          <p className="text-white pr-6 md:pr-0 font-semibold text-2xl md:text-4xl">
            Smarter FRC data insights
          </p>

          <div className="flex flex-wrap -space-x-1 overflow-hidden absolute bottom-10">
            {props.contributors.map((contributor: any, key: number) => {
              return (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-card hover:opacity-90"
                  />
                </a>
              );
            })}
          </div>
        </Card>

        <Card>
          <h1 className="text-lightGray text-sm md:text-xl">
            Scout Machine is the all-in-one tool your FRC team needs to find the
            data you want, when you want. From accessing important data points
            to viewing match histories and tracking performance metrics -
            it&apos;s all in one place. <br /> <br />{" "}
            <span className="text-white italic">
              Say goodbye to time-consuming data analysis and hello to{" "}
              <span className="text-primary">Scout Machine</span>.
            </span>
          </h1>
        </Card>
        <Card>
          <h1 className="font-meidum text-sm md:text-xl text-lightGray">
            We&apos;re 100% open-source on{" "}
            <a
              href="https://github.com/gryphonmachine/machine"
              target="_blank"
              className="text-white"
            >
              <span className="inline-block align-top	ml-1">
                <FaGithub className="text-xl md:text-3xl" />
              </span>{" "}
              Github.
            </a>
            <br /> <br />
            If you have any questions, feature requests, bug reports, or you
            just want to see some sneak peeks of updates, join our{" "}
            <a
              href="https://discord.gg/yYtc8gpsXK"
              target="_blank"
              className="text-violet-400"
            >
              <span className="inline-block align-top">
                <FaDiscord className="text-xl md:text-3xl" />
              </span>{" "}
              Discord
            </a>
            .
            <br />
            <br />
            Loving the site & want to support us? <br />{" "}
            <a
              href="https://www.buymeacoffee.com/scoutmachine"
              target="_blank"
              className="text-primary"
            >
              <span className="inline-block align-top">
                <FaCoffee className="text-xl md:text-3xl" />
              </span>{" "}
              Buy us a Coffee
            </a>
          </h1>
        </Card>
      </div>
      <Card>
        <h1 className="text-2xl text-lightGray font-bold mb-5 italic">
          What are you waiting for?
        </h1>
        <div className="gap-3 flex flex-wrap">
          <Feature name="simple & modern design" />
          <Feature name="user accounts" />
          <Feature name="favourite teams" />
          <Feature name="discover teams" />
          <Feature name={`all ${CURR_YEAR} events`} />
          <Feature name="event pages" />
          <Feature name="team pages" />
          <Feature name="event pages" />
          <Feature name="match pages" />
          <Feature name="team awards" />
          <Feature name="hall of fame teams" />
          <Feature name={`${CURR_YEAR} rookie teams`} />
          <Feature name="game day" />
          <Feature name="marketplace (buy & sell)" />
          <Feature name="search (by location, team name, team number)" />
          <Feature name="search nearby" />
          <Feature name="free, no paywall" />
          <Feature name="open source" />
        </div>
      </Card>
    </div>
  );
};
