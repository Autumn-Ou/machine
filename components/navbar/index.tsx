import Link from "next/link";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import {
  FaMedal,
  FaRobot,
  FaHammer,
  FaGithub,
  FaDiscord,
  FaCoffee,
  FaSignOutAlt,
  FaUserCircle,
  FaTags,
  FaBolt,
  FaBars,
  FaChartLine,
} from "react-icons/fa";
import { Loading } from "../Loading";
import { useSession } from "next-auth/react";
import { Dropdown } from "../Dropdown";
import { SignupModal } from "../modals/SignupModal";
import { EditProfileModal } from "../modals/EditProfileModal";
import { SignoutModal } from "../modals/SignoutModal";
import { getFavourites } from "@/utils/favourites";
import { Search } from "./Search";
import { Team } from "@/types/Team";
import { fetchTeamsData } from "@/utils/team";
import { GITHUB_URL, DISCORD_URL, BMAC_URL } from "@/lib/constants";

const Social = (props: { icon: ReactNode }) => {
  return (
    <span className="flex cursor-pointer flex-col items-center rounded-md p-1 text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] text-xl mt-1">
      {props.icon}
    </span>
  );
};

const links = [
  { title: "Teams", href: "/teams", icon: <FaRobot /> },
  { title: "Events", href: "/events", icon: <FaHammer /> },
  { title: "Hall of Fame", href: "/fame", icon: <FaMedal /> },
  { title: "Rookie Teams", href: "/rookies", icon: <FaBolt /> },
  { title: "Insights", href: "/insights", icon: <FaChartLine /> },
  { title: "Marketplace", href: "/marketplace", icon: <FaTags /> },
];

export const Navbar = (props: { active?: string; refresh?: boolean }) => {
  const [teams, setTeams] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showLinks, setShowLinks] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const { data: session, status } = useSession();

  const [favourites, setFavourites] = useState<any>();

  useEffect(() => {
    getFavourites(setFavourites);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTeamsData();
      if (data) setTeams(data);
    }
    fetchData();
  }, []);

  const filteredOptions =
    teams &&
    teams.filter((team: Team) =>
      (team.nickname + team.team_number)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("click", () => setSearchTerm(""));
  });

  if (!teams) return <Loading />;
  if (status === "loading") return <Loading />;

  return (
    <>
      <div
        className={`sticky top-0 pl-4 pr-4 md:pr-8 md:pl-8 ${
          isScrolled && "z-50"
        }`}
      >
        <div
          className={`${
            isScrolled ? "rounded-b-lg" : "mt-5 rounded-lg"
          } bg-card border border-[#2A2A2A] bg-[#191919] py-5 px-10 mb-[-10px] h-full max-w-screen-3xl mx-auto flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between`}
        >
          <div className="relative flex space-x-1">
            <Link href="/" legacyBehavior>
              <a>
                <h1 className="hidden mr-2 text-2xl font-extrabold text-white md:block">
                  sm
                </h1>
                <h1 className="mr-2 text-2xl font-black text-white md:hidden">
                  sm
                </h1>
              </a>
            </Link>

            <a
                href={GITHUB_URL} target="_blank"
                rel="noopener noreferrer"
            >
              <Social icon={<FaGithub />} />
            </a>

            <a
                href={DISCORD_URL} target="_blank"
                rel="noopener noreferrer"
            >
              <Social icon={<FaDiscord />} />
            </a>

            <a
                href={BMAC_URL} target="_blank"
                rel="noopener noreferrer"
            >
              <Social icon={<FaCoffee />} />
            </a>

            <div
              className={`absolute right-0 2xl:hidden block border border-[#2A2A2A] ${
                showLinks ? `bg-[#1F1F1F]` : "bg-card"
              } rounded-lg py-2 px-[13px]`}
            >
              <FaBars
                className="text-xl text-white 2xl:hidden"
                onClick={() => setShowLinks(!showLinks)}
              />
            </div>
          </div>

          <div
            className={`2xl:flex 2xl:items-center 2xl:gap-6 ${
              showLinks ? "mt-5 2xl:mt-0 grid grid-cols-2" : "hidden"
            }`}
          >
            {links.map((link, key) => {
              return (
                <Link href={link.href} key={key} legacyBehavior>
                  <a
                    className={`block md:inline-block text-[0.9rem] ${
                      props.active === link.title
                        ? "text-primary"
                        : "text-lightGray"
                    } font-medium mb-2 md:mb-0`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{link.icon}</span>
                      <span>{link.title}</span>
                    </div>
                  </a>
                </Link>
              );
            })}

            <Search
              teams={teams}
              filteredOptions={filteredOptions}
              favourites={favourites}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              session={session}
              refresh={props.refresh}
            />

            {session ? (
              <Dropdown
                state={profileDropdown}
                item={
                  <Image
                    src={session.user?.image as string}
                    className="mt-3 ml-4 rounded-full cursor-pointer md:mt-0"
                    width={30}
                    height={30}
                    alt={`${session.user?.name} Avatar`}
                    priority={true}
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  />
                }
              >
                <div className="flex flex-col items-center py-2 gap-y-2">
                  <p
                    className="text-sm cursor-pointer text-lightGray whitespace-nowrap hover:text-primary"
                    onClick={() => {
                      setShowEditProfileModal(true);
                      setProfileDropdown(false);
                    }}
                  >
                    <FaUserCircle className="inline-block mr-1 text-lg" /> Edit
                    Profile
                  </p>

                  <p
                    className="text-sm cursor-pointer text-lightGray hover:text-red-400 whitespace-nowrap hover:text-primary"
                    onClick={() => {
                      setShowSignoutModal(true);
                      setProfileDropdown(false);
                    }}
                  >
                    <FaSignOutAlt className="inline-block mr-1 text-lg" /> Sign
                    Out
                  </p>
                </div>
              </Dropdown>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="md:mt-0 mt-3 text-sm border border-[#2A2A2A] bg-card hover:border-gray-600 px-3 py-[6px] text-lightGray font-medium rounded-lg md:ml-[-10px] ml-4"
              >
                <FaUserCircle className="inline-block mr-1 text-lg" /> Sign{" "}
                {localStorage.getItem("signUpState") ?? "up"}
              </button>
            )}
          </div>
        </div>
      </div>

      <SignupModal isOpen={showLoginModal} setOpen={setShowLoginModal} />

      <SignoutModal isOpen={showSignoutModal} setOpen={setShowSignoutModal} />

      <EditProfileModal
        isOpen={showEditProfileModal}
        setOpen={setShowEditProfileModal}
      />
    </>
  );
};
