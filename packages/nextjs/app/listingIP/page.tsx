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
import { Search, Settings } from 'lucide-react'

const listingIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [status, setStatus] = useState("Mint NFT");

  const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });




  const [searchTerm, setSearchTerm] = useState('')
      const [filter, setFilter] = useState('all')
    
      const dummyData = [
        { id: 1, title: 'IP Title', type: 'Patent', status: 'Active', description: 'A groundbreaking AI algorithm for natural language processing.' },
        { id: 2, title: 'IP Title', type: 'Trademark', status: 'Pending', description: 'A new eco-friendly plastic alternative made from plant-based materials.' },
        { id: 3, title: 'IP Title', type: 'Patent', status: 'Active', description: 'A novel method for quantum-resistant encryption in digital communications.' },
        { id: 4, title: 'IP Title', type: 'Patent', status: 'Active', description: 'A paint that can convert sunlight into electricity when applied to surfaces.' },
        { id: 5, title: 'IP Title', type: 'Trademark', status: 'Active', description: 'A brain-computer interface for controlling smart home devices.' },
        { id: 6, title: 'IP Title', type: 'Copyright', status: 'Active', description: 'An innovative design for fully biodegradable product packaging.' },
      ]
    
      const filteredData = dummyData.filter(item => 
        (filter === 'all' || item.type.toLowerCase() === filter) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         item.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
         

          

          
      <div className="px-10 flex-col max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">IP Listing</h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none border rounded-lg pl-4 pr-10 py-2 bg-white"
          >
            <option value="all">All Types</option>
            <option value="patent">Patents</option>
            <option value="trademark">Trademarks</option>
            <option value="copyright">Copyrights</option>
          </select>
          <Settings className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'Patent' ? 'bg-blue-100 text-blue-800' :
                  item.type === 'Trademark' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {item.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>






        )}
      </div>



      
    </>
  );
};

export default listingIP;
