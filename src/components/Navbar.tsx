"use client";
import { navLinks } from "@/util/constants";
import { style } from "@/util/style";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalMenu from "./ModalMenu";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";

const Navbar = () => {
  const [language, setLanguage] = useState<string>("EN");
  const [hover, setHover] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos && isVisible) {
        setIsVisible(false);
      } else if (currentScrollPos < prevScrollPos && !isVisible) {
        setIsVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, prevScrollPos]);

  const [modalHidden, setModalHidden] = useState<string>("-left-[80%]");
  const pathname = usePathname();

  const showModal = (): void => {
    setModalHidden((i) => (i === "-left-[80%]" ? "left-0" : "-left-[80%]"));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setModalHidden("-left-[80%]");
    }
  }, [pathname]);

  return (
    <div
      className={`${
        style.flexBetween
      } z-50 fixed w-full top-0 left-0 bg-darkBlue lg:px-[140px] p-5 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <ModalMenu newClass={`${modalHidden} transition-all duration-200`} />
      <button className="sm:hidden block" onClick={showModal}>
        <Bars3Icon className="w-6 h-6 text-white" />
      </button>
      <div className={`${style.flexBetween} gap-8`}>
        <div>
          <Link href={`/`}>
            <Image
              src="/assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMBD logo"
              width={154}
              height={20}
            />
          </Link>
        </div>
        <ul className={`${style.flexBetween} gap-8 sm:flex hidden`}>
          {navLinks.map((link, idx) => {
            return (
              <li
                key={idx}
                className="cursor-pointer text-white font-semibold relative group"
                onMouseOver={() => setHover(link.id)}
                onMouseOut={() => setHover(0)}
              >
                {link.title}
                <ul
                  className={`${
                    hover === link.id ? "block" : "hidden"
                  } bg-white w-[150px] text-darkBlue p-3 rounded-md absolute top-6 -left-5`}
                >
                  {link.links.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        className="text-darkBlue w-full hover:bg-darkBlue transition-all duration-100 hover:text-white px-2 rounded-lg font-normal"
                      >
                        <Link href={`/${item.url}`}>{item.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ul className={`${style.flexBetween} sm:gap-8 gap-4`}>
          <li className="sm:block hidden">
            <button>
              <Image
                src="/assets/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg"
                alt="plus"
                width={30}
                height={30}
              />
            </button>
          </li>
          <li className="sm:block hidden">
            <button
              className="text-white font-semibold border-2 p-1 rounded-sm hover:bg-white hover:text-darkBlue transition-all"
              onClick={() => setLanguage((i) => (i === "EN" ? "RU" : "EN"))}
            >
              {language}
            </button>
          </li>
          <li className="sm:block hidden">
            <button>
              <Image
                src="/assets/glyphicons-basic-441-bell-9cd2af257b98c4af3460078777d8e38a5e12bca89704eeac2f39273afcbd06ff.svg"
                alt="tmbd"
                width={30}
                height={30}
              />
            </button>
          </li>
          <li>
            <button className="text-white font-semibold">Login</button>
          </li>
          <li>
            <button className="text-white">
              <Image
                src="/assets/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
                alt="search"
                width={30}
                height={30}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
