"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'


const categoriesMarketplace: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  
  const categories = [
    { id: 1, name: "Software", count: 150 },
    { id: 2, name: "Design", count: 80 },
    { id: 3, name: "Biotech", count: 60 },
    { id: 4, name: "IoT", count: 45 },
    { id: 5, name: "Materials", count: 30 },
    { id: 6, name: "Cybersecurity", count: 55 },
    { id: 7, name: "Agriculture", count: 25 },
    { id: 8, name: "Energy", count: 40 },
  ]

  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div>
          <h1 className="text-4xl font-bold mb-8">Categories</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/marketplace?category=${category.name}`} className="block">
                <div className="bg-base-100 shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                  <p className="text">{category.count} listings</p>
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

export default categoriesMarketplace;
