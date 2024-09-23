"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  RectangleGroupIcon,
  BanknotesIcon,
  CubeIcon,
  Square2StackIcon
} from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-stark";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useTheme } from "next-themes";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { devnet } from "@starknet-react/chains";
import { SwitchTheme } from "./SwitchTheme";
import { useAccount, useProvider } from "@starknet-react/core";
import { BlockIdentifier } from "starknet";


type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "My IPs",
    href: "/myIPs",
    icon: <RectangleGroupIcon className="h-4 w-4" />,
  },
  {
    label: "New IP",
    href: "/registerIP",
    icon: <CubeIcon className="h-4 w-4" />,
  },
  {
    label: "Listing",
    href: "/listingIP",
    icon: <Square2StackIcon className="h-4 w-4" />,
  },
  {
    label: "Licensing",
    href: "/licensingIP",
    icon: <Square2StackIcon className="h-4 w-4" />,
  },
  {
    label: "Monetize",
    href: "/monetizeIP",
    icon: <BanknotesIcon className="h-4 w-4" />,
  },
  {
    label: "Transfers",
    href: "/transfers",
    icon: <ArrowPathIcon className="h-4 w-4" />,
  },
  // {
  //   label: "IPFS Upload",
  //   href: "/ipfsUpload",
  //   icon: <ArrowPathIcon className="h-4 w-4" />,
  // },
  // {
  //   label: "IPFS Download",
  //   href: "/ipfsDownload",
  //   icon: <ArrowPathIcon className="h-4 w-4" />,
  // },
  
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);
  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive
                  ? "!bg-gradient-nav !text-white active:bg-gradient-nav shadow-md"
                  : ""
              } py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col hover:bg-gradient-nav hover:text-white`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === devnet.id;

  const { provider } = useProvider();
  const { address, status, chainId } = useAccount();
  const [isDeployed, setIsDeployed] = useState(true);

  useEffect(() => {
    if (status === "connected" && address && chainId === targetNetwork.id) {
      provider
        .getClassHashAt(address, "pending" as BlockIdentifier)
        .then((classHash) => {
          if (classHash) setIsDeployed(true);
          else setIsDeployed(false);
        })
        .catch((e) => {
          if (e.toString().includes("Contract not found")) {
            setIsDeployed(false);
          }
        });
    }
  }, [status, address, provider, chainId, targetNetwork.id]);

  return (
    <div className="sticky lg:static top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${
              isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"
            }`}
            onClick={() => {
              setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link
          href="/"
          passHref
          className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
        >
          <div className="flex relative w-10 h-10">
            <Image
              alt="Mediolano"
              className="cursor-pointer"
              fill
              src="/mediolano.webp"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Mediolano</span>
            <span className="text-xs">@Starknet</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4 gap-4">
        {status === "connected" && !isDeployed ? (
          <span className="bg-[#8a45fc] text-[9px] p-1 text-white">
            Wallet Not Deployed
          </span>
        ) : null}
        <CustomConnectButton />
        {/* <FaucetButton /> */}
        <SwitchTheme
          className={`pointer-events-auto ${
            isLocalNetwork ? "self-end md:self-auto" : ""
          }`}
        />
      </div>
    </div>
  );
};
