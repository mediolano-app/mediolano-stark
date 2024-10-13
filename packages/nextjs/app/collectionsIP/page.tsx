"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, LinkIcon, ArrowRight, DollarSign, Shield, Globe, Clock, File, Users, Activity } from 'lucide-react'





const collectionsIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const collections = [
    { id: 1, name: "Movie Reviews", creator: "Author", items: 25, image: "/background.jpg" },
    { id: 2, name: "Fine Art Paintings", creator: "Stark", items: 18, image: "/background.jpg" },
    { id: 3, name: "Medical Breakthroughs", creator: "HealthTech", items: 30, image: "/background.jpg" },
    { id: 4, name: "Future of Transportation", creator: "Corp", items: 22, image: "/background.jpg" },
    { id: 5, name: "Music Releases", creator: "Author", items: 50, image: "/background.jpg" },
    { id: 6, name: "Art Colab", creator: "DAO", items: 22, image: "/background.jpg" },
  ]
  

  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div>
          <h1 className="text-4xl font-bold mb-8">Featured Collections</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`} className="block">
                <div className="bg-base-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image src={collection.image} alt={collection.name} width={400} height={200} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
                    <p className="text-gray-600 mb-2">By {collection.creator}</p>
                    <p className="text-blue-600">{collection.items} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>


        )}


    </div>  
    </>
  );
};

export default collectionsIP;
