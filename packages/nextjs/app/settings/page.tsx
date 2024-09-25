"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import Link from 'next/link'


const settingsDapp: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  


  return (
    <>
      
      
      
      <div className="flex justify-center flex-col pt-10" >



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

      <div className="container py-12 max-w-7xl mx-auto">


          <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your Account</h1>
          <p className="mb-4">Your data and settings are encrypted with your wallet and stored in a smart contract.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Preferences', 'Account', 'Template', 'Transfers', 'Debug'].map((page) => (
              <Link
                key={page}
                href={`/${page.toLowerCase().replace(' ', '-')}`}
                className="bg-base-200 p-4 rounded shadow hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{page}</h2>
                <p>Your settings for {page.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>

        </div>


        )}
      </div>



      
    </>
  );
};

export default settingsDapp;
