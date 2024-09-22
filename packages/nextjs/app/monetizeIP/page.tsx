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
import { DollarSign, BarChart2, Users, Globe } from 'lucide-react'

const monetizeIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [status, setStatus] = useState("Mint NFT");

  const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });




  const [activeTab, setActiveTab] = useState('opportunities')

  const dummyOpportunities = [
    { id: 1, title: 'AI Algorithm Licensing', type: 'License', potential: 'High', industry: 'Technology' },
    { id: 2, title: 'EcoPlastic Manufacturing Rights', type: 'Partnership', potential: 'Medium', industry: 'Manufacturing' },
    { id: 3, title: 'Quantum Encryption Integration', type: 'License', potential: 'Very High', industry: 'Cybersecurity' },
  ]

  const dummyRoyalties = [
    { id: 1, title: 'AI Algorithm License', licensee: 'Tech Corp', amount: 50000, date: '2023-05-15' },
    { id: 2, title: 'Solar Paint Usage', licensee: 'GreenEnergy Inc', amount: 25000, date: '2023-05-10' },
    { id: 3, title: 'MindWave Trademark Use', licensee: 'SmartHome Solutions', amount: 10000, date: '2023-05-05' },
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
         

          

          
          <div className=" max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Monetize Your IP</h1>
          <p className="mb-6">Maximize the value of your intellectual property through various monetization strategies.</p>
          
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'opportunities'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Licensing Opportunities
                </button>
                <button
                  onClick={() => setActiveTab('royalties')}
                  className={`ml-8 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'royalties'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Royalty Management
                </button>
              </nav>
            </div>
          </div>
    
          {activeTab === 'opportunities' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Licensing Opportunities</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Title</th>
                      <th className="py-2 px-4 border-b text-left">Type</th>
                      <th className="py-2 px-4 border-b text-left">Potential</th>
                      <th className="py-2 px-4 border-b text-left">Industry</th>
                      <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyOpportunities.map((opportunity) => (
                      <tr key={opportunity.id}>
                        <td className="py-2 px-4 border-b">{opportunity.title}</td>
                        <td className="py-2 px-4 border-b">{opportunity.type}</td>
                        <td className="py-2 px-4 border-b">{opportunity.potential}</td>
                        <td className="py-2 px-4 border-b">{opportunity.industry}</td>
                        <td className="py-2 px-4 border-b">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Explore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
    
          {activeTab === 'royalties' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Royalty Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Title</th>
                      <th className="py-2 px-4 border-b text-left">Licensee</th>
                      <th className="py-2 px-4 border-b text-left">Amount</th>
                      <th className="py-2 px-4 border-b text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyRoyalties.map((royalty) => (
                      <tr key={royalty.id}>
                        <td className="py-2 px-4 border-b">{royalty.title}</td>
                        <td className="py-2 px-4 border-b">{royalty.licensee}</td>
                        <td className="py-2 px-4 border-b">${royalty.amount.toLocaleString()}</td>
                        <td className="py-2 px-4 border-b">{royalty.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
    
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-500" />
                Monetization Strategies
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Licensing and royalties</li>
                <li>Strategic partnerships</li>
                <li>IP-backed financing</li>
                <li>Direct sales of IP rights</li>
              </ul>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <BarChart2 className="h-6 w-6 mr-2 text-green-500" />
                Market Insights
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Industry trend analysis</li>
                <li>Competitor IP portfolios</li>
                <li>Valuation services</li>
                <li>Market demand forecasts</li>
              </ul>
            </div>
          </div>
    
          <div className="mt-6 bg-purple-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Users className="h-6 w-6 mr-2 text-purple-500" />
              Expert Support
            </h2>
            <p>Our team of IP monetization experts is here to help you maximize the value of your intellectual property. Schedule a consultation to discuss your unique IP portfolio and explore tailored monetization strategies.</p>
            <button className="mt-4 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
              Schedule Consultation
            </button>
          </div>
        </div>






        )}
      </div>



      
    </>
  );
};

export default monetizeIP;
