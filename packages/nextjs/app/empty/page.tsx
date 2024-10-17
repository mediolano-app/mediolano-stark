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







const trending: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  

  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div className="max-w-6xl mx-auto">
            
      
          </div>


        )}


    </div>  
    </>
  );
};

export default trending;
