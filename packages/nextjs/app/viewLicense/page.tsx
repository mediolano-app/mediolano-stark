"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, Edit, ArrowRight, Copy, ExternalLink, DollarSign, Calendar, Globe } from 'lucide-react'



const mockLicense = {
  id: 1,
  name: 'License 1',
  ipName: 'Patent A',
  ipId: 1,
  licensee: 'Company X',
  value: 10000,
  currency: 'USD',
  startDate: '2023-08-01',
  endDate: '2028-07-31',
  territory: 'Worldwide',
  type: 'Non-exclusive',
  terms: 'This license grants the right to manufacture and sell products based on Patent A...',
}




const viewLicense: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  

  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div className="max-w-4xl mx-auto">
        <Link href="/all-licenses" className="inline-flex items-center btn mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Licenses
        </Link>

        <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{mockLicense.name}</h1>
            <Link href={`/ip/${mockLicense.ipId}`} className="text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block">
              {mockLicense.ipName}
            </Link>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm ">Licensee</p>
                <p className="font-semibold">{mockLicense.licensee}</p>
              </div>
              <div>
                <p className="text-sm ">Value</p>
                <p className="font-semibold">{mockLicense.value} {mockLicense.currency}</p>
              </div>
              <div>
                <p className="text-sm ">Start Date</p>
                <p className="font-semibold">{mockLicense.startDate}</p>
              </div>
              <div>
                <p className="text-sm ">End Date</p>
                <p className="font-semibold">{mockLicense.endDate}</p>
              </div>
              <div>
                <p className="text-sm ">Territory</p>
                <p className="font-semibold">{mockLicense.territory}</p>
              </div>
              <div>
                <p className="text-sm ">Type</p>
                <p className="font-semibold">{mockLicense.type}</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">License Terms</h2>
            <p className="mb-6">{mockLicense.terms}</p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                <Edit className="w-5 h-5 mr-2" />
                Edit License
              </button>
              <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300">
                <ArrowRight className="w-5 h-5 mr-2" />
                Transfer License
              </button>
              <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300">
                <Copy className="w-5 h-5 mr-2" />
                Duplicate License
              </button>
              <button className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300">
                <ExternalLink className="w-5 h-5 mr-2" />
                List on Marketplace
              </button>
            </div>
          </div>
        </div>

        
      </div>


        )}


    </div>  
    </>
  );
};

export default viewLicense;
