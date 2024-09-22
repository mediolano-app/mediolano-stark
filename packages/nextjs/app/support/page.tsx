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
import { Mail, Plus, MessageSquare } from 'lucide-react'

const support: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [status, setStatus] = useState("Mint NFT");

  const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });




  const [activeTab, setActiveTab] = useState('contact')

  const faqs = [
    {
      question: "What is IP Blockchain?",
      answer: "IP Blockchain is a platform that uses blockchain technology to securely register, manage, and monetize intellectual property rights."
    },
    {
      question: "How does blockchain ensure the security of my IP?",
      answer: "Blockchain technology creates an immutable and time-stamped record of your IP registration, providing indisputable proof of ownership and making it extremely difficult to tamper with the records."
    },
    {
      question: "What types of IP can I register on the platform?",
      answer: "Our platform supports various types of intellectual property, including patents, trademarks, copyrights, and trade secrets."
    },
    {
      question: "How long does the IP registration process take?",
      answer: "The registration process is typically completed within minutes. However, the time for blockchain confirmation may vary depending on network congestion."
    },
    {
      question: "Can I transfer my IP rights to another party using the platform?",
      answer: "Yes, our platform allows for secure and transparent transfer of IP rights between parties, with all transactions recorded on the blockchain."
    }
  ]


      

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
<div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`ml-8 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'faq'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQs
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'contact' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <Mail className="h-8 w-8 text-blue-500 mb-4" />
              <h2 className="text-xl text-black font-semibold mb-2">Email Support</h2>
              <p className="text-center text-black">support@mediolano.app</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <Plus className="h-8 w-8 text-green-500 mb-4" />
              <h2 className="text-xl text-black font-semibold mb-2">Documentarion</h2>
              <p className="text-center text-black">docs.mediolano.app</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <MessageSquare className="h-8 w-8 text-purple-500 mb-4" />
              <h2 className="text-xl text-black font-semibold mb-2">Live Chat</h2>
              <p className="text-center text-black">Available 24/7</p>
            </div>
          </div>

          
        </div>
      )}

      {activeTab === 'faq' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg text-black font-semibold mb-2">{faq.question}</h3>
                <p className="text-black">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
          </div>










        )}
      </div>



      
    </>
  );
};

export default support;
