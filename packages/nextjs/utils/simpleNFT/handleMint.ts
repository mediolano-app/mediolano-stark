"use client";

import { useRouter } from "next/navigation"; // Correct import for client-side navigation
import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { MyHoldings } from "~~/components/SimpleNFT/MyHoldings";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
import { useState, FormEvent, useRef} from "react";
import { FilePlus } from 'lucide-react';
import { id } from "ethers";
import { pinataClient } from "~~/utils/simpleNFT/pinataClient";

const { address: connectedAddress, isConnected, isConnecting } = useAccount();
const [status, setStatus] = useState("Mint NFT");
const [ipfsHash, setipfsHash] = useState("");
const [loading, setLoading] = useState(false);
const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });

const { data: tokenIdCounter, refetch } = useScaffoldReadContract({
    contractName: "YourCollectible",
    functionName: "current",
    watch: false,
  });

export async function handleMint(url: string){
  // setStatus("Minting NFT");
  //   // circle back to the zero item if we've reached the end of the array
  //   if (tokenIdCounter === undefined) {
  //     setStatus("Mint NFT");
  //     return;
  //   }

  //   const tokenIdCounterNumber = Number(tokenIdCounter);
    
  //   const notificationId = notification.loading("Uploading to IPFS");
  //   try {

  //     // First remove previous loading notification and then show success notification
  //     notification.remove(notificationId);
  //     notification.success("Metadata uploaded to IPFS");

  //     await mintItem({
  //       args: [connectedAddress, ipfsHash],
  //     });
  //     setStatus("Updating NFT List");
  //     refetch();
  //   } catch (error) {
  //     notification.remove(notificationId);
  //     console.error(error);
  //     setStatus("Mint NFT");
  //   }
};