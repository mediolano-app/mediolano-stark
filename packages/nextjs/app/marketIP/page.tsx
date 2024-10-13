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
import { Shield, Award, Clock, User, DollarSign, Heart } from 'lucide-react'

interface IPPageProps {
  params: {
    id: string
  }
}

const marketIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const [bidAmount, setBidAmount] = useState('')

  // In a real application, you would fetch this data from an API or database
  const ip = {
    //id: parseInt(params.id),
    title: "Intellectual Property Title",
    category: "Copyright",
    price: 50,
    description: "Intellectual property description.",
    image: "/background.jpg",
    features: [
      "Immutable",
      "Encrypted",
      "Traceable",
      "Liquidity"
    ],
    creator: "Start",
    creationDate: "2025-01-015",
    lastUpdated: "2025-01-03",
    license: "Exclusive Commercial License",
    views: 1234,
    favorites: 56,
    bids: [
      { user: "0x1234...5678", amount: 45, date: "2023-05-28" },
      { user: "0x9876...5432", amount: 48, date: "2023-05-30" },
    ]
  }

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle bid submission
    console.log(`Submitted bid for ${bidAmount} ETH`)
  }
  

  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{ip.title}</h1>
            <div className="mb-6">
              <Image src={ip.image} alt={ip.title} width={800} height={400} className="w-full h-96 object-cover rounded-lg" />
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="bg-base-100 mb-4">{ip.description}</p>
              <h3 className="text-xl font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside bg-base-100">
                {ip.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Blockchain Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-500 mr-2" />
                  <div>
                    <h3 className="font-semibold">Secure Ownership</h3>
                    <p className="text-sm ">Blockchain ensures tamper-proof record of IP ownership</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-blue-500 mr-2" />
                  <div>
                    <h3 className="font-semibold">Verifiable Authenticity</h3>
                    <p className="text-sm ">Easy verification of IP authenticity and provenance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-500 mr-2" />
                  <div>
                    <h3 className="font-semibold">Instant Transfers</h3>
                    <p className="text-sm ">Immediate transfer of IP rights upon purchase</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="w-6 h-6 text-blue-500 mr-2" />
                  <div>
                    <h3 className="font-semibold">Transparent History</h3>
                    <p className="text-sm ">Complete history of ownership and transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <p className="">Current Price</p>
                <p className="text-3xl font-bold text-blue-600">{ip.price} ETH</p>
              </div>
              <form onSubmit={handleBid} className="mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="number"
                    step="0.01"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter bid amount"
                    className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="bg-gray-100 p-2 border border-l-0 rounded-r-md">ETH</span>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Place Bid
                </button>
              </form>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4">
                Buy Now
              </button>
              <button className="w-full border border-gray-300 bg-base-100 font-bold py-2 px-4 rounded flex items-center justify-center">
                <Heart className="mr-2" /> Add to Favorites
              </button>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Creator Information</h2>
              <p><strong>Creator:</strong> {ip.creator}</p>
              <p><strong>Creation Date:</strong> {ip.creationDate}</p>
              <p><strong>Last Updated:</strong> {ip.lastUpdated}</p>
              <p><strong>License:</strong> {ip.license}</p>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">IP Statistics</h2>
              <p><strong>Views:</strong> {ip.views}</p>
              <p><strong>Favorites:</strong> {ip.favorites}</p>
              <p><strong>Active Bids:</strong> {ip.bids.length}</p>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Bids</h2>
              {ip.bids.map((bid, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{bid.user}</span>
                  <span className="font-bold">{bid.amount} ETH</span>
                </div>
              ))}
            </div>
          </div>
        </div>



          


        )}


    </div>  
    </>
  );
};

export default marketIP;
