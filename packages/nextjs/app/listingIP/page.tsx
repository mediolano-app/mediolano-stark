"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useState } from "react";
import { Button } from "~~/components/ui/button"
import Link from "next/link"

const listingIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  return (
    <>
      
      
      
      <div className="flex justify-center flex-col pt-10" >



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

      <div>    

          


          
      <div className="container py-12 max-w-7xl mx-auto">


        <section className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Ready to step up?</h2>
          <p className="mb-6">Start trading intellectual property today!</p>
          <div className="space-x-4">
            <Button>
              <Link href="/registerIP">Register New</Link>
            </Button>
            <Button variant="outline">
              <Link href="/licensingIP">Licensing Your IP</Link>
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
