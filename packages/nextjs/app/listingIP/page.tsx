"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { MyHoldings } from "~~/components/SimpleNFT/MyHoldings";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
import { useState } from "react";


import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"
import { Badge } from "~~/components/ui/badge"
import { Search, Filter, ArrowUpDown, Settings } from "lucide-react"
import Link from "next/link"

const listingIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [status, setStatus] = useState("Mint NFT");

  const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });


  const [searchTerm, setSearchTerm] = useState('')

      const listings = [
        { id: 1, title: "The Batman Movie Critic", type: "Patent", price: "$50,000", status: "For Sale" },
        { id: 2, title: "Avalon Game Soundtrack", type: "Trade Secret", price: "$75,000", status: "For License" },
        { id: 3, title: "Stark Blue Secrect Paint", type: "Copyright", price: "$25,000", status: "For Sale" },
        { id: 4, title: "Movie Website Logo", type: "Patent", price: "$100,000", status: "For License" },
      ]
    
      const features = [
        { title: "Secure Transactions", description: "Blockchain-powered security for all your IP transactions" },
        { title: "Global Marketplace", description: "Connect with buyers and sellers from around the world" },
        { title: "Smart Contracts", description: "Automated, transparent, and efficient deal execution" },
        { title: "IP Valuation Tools", description: "Get accurate estimates for your intellectual property" },
      ]


      const filteredListings = listings.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.status.toLowerCase().includes(searchTerm.toLowerCase())
      )


      

  const { data: tokenIdCounter, refetch } = useScaffoldReadContract({
    contractName: "YourCollectible",
    functionName: "current",
    watch: false,
  });

  const handleMintItem = async () => {
    setStatus("Minting NFT");
    // circle back to the zero item if we've reached the end of the array
    if (tokenIdCounter === undefined) {
      setStatus("Mint NFT");
      return;
    }



      



    const tokenIdCounterNumber = Number(tokenIdCounter);
    const currentTokenMetaData =
      nftsMetadata[tokenIdCounterNumber % nftsMetadata.length];
    const notificationId = notification.loading("Uploading to IPFS");
    try {
      const uploadedItem = await addToIPFS(currentTokenMetaData);

      // First remove previous loading notification and then show success notification
      notification.remove(notificationId);
      notification.success("Metadata uploaded to IPFS");

      await mintItem({
        args: [connectedAddress, uploadedItem.path],
      });
      setStatus("Updating NFT List");
      refetch();
    } catch (error) {
      notification.remove(notificationId);
      console.error(error);
      setStatus("Mint NFT");
    }
  };

  return (
    <>
      
      
      
      <div className="flex justify-center flex-col pt-10" >



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

      <div>    

          


          
<div className="container py-12 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">IP Listings Marketplace</h1>
      
      <div className="flex items-center space-x-4 mb-8">
        <Input 
          placeholder="Search listings..." 
          className="flex-grow" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
        <Button variant="outline"><ArrowUpDown className="mr-2 h-4 w-4" /> Sort</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredListings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <div className="flex justify-between items-center">
                <Badge>{listing.type}</Badge>
                <Badge variant="outline">{listing.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{listing.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Features and Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Buy or Sell IP?</h2>
        <p className="mb-6">Join our marketplace and start trading intellectual property today!</p>
        <div className="space-x-4">
          <Button>
            <Link href="/register">List Your IP</Link>
          </Button>
          <Button variant="outline">
            <Link href="/browse">Browse Listings</Link>
          </Button>
        </div>
      </section>
    </div>
          
      




      </div>

        )}
      </div>



      
    </>
  );
};

export default listingIP;
