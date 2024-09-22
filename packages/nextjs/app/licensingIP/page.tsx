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
import { Plus, Copy, DollarSign } from 'lucide-react'

const licensingIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [status, setStatus] = useState("Mint NFT");

  const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });




  const [activeTab, setActiveTab] = useState('create')

  const dummyLicenses = [
    { id: 1, title: 'AI Algorithm License', licensee: 'Tech Corp', type: 'Non-Exclusive', status: 'Active' },
    { id: 2, title: 'EcoPlastic Usage Rights', licensee: 'Green Packaging Inc', type: 'Exclusive', status: 'Pending' },
    { id: 3, title: 'Quantum Encryption License', licensee: 'SecureNet Solutions', type: 'Non-Exclusive', status: 'Active' },
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
         

          

          
        <div className="flex-col max-w-8xl mx-auto">
           



          <h1 className="text-3xl font-bold mb-6">Licensing</h1>
          <p className="mb-6">Manage your IP licenses and agreements efficiently with our blockchain-based licensing system.</p>
          
          <div className="flex flex-col">
            <div className="border-b border-gray-200">

              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`py-2 px-10 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'create'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Create License
                </button>

                  

                <button
                  onClick={() => setActiveTab('view')}
                  className={`ml-8 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'view'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  View Licenses
                </button>
              </nav>
            </div>
          </div>
    
          {activeTab === 'create' && (
            <div>
              <h2 className="text-2xl py-5 font-semibold mb-4">Create New License</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="ipTitle" className="block mb-1 font-medium">IP Title</label>
                  <input type="text" id="ipTitle" name="ipTitle" className="w-full border rounded p-2" />
                </div>
                <div>
                  <label htmlFor="licensee" className="block mb-1 font-medium">Licensee</label>
                  <input type="text" id="licensee" name="licensee" className="w-full border rounded p-2" />
                </div>
                <div>
                  <label htmlFor="licenseType" className="block mb-1 font-medium">License Type</label>
                  <select id="licenseType" name="licenseType" className="w-full border rounded p-2">
                    <option value="non-exclusive">Non-Exclusive</option>
                    <option value="exclusive">Exclusive</option>
                    <option value="sole">Sole</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="duration" className="block mb-1 font-medium">Duration</label>
                  <input type="text" id="duration" name="duration" className="w-full border rounded p-2" placeholder="e.g., 2 years" />
                </div>
                <div>
                  <label htmlFor="terms" className="block mb-1 font-medium">Terms and Conditions</label>
                  <textarea id="terms" name="terms" rows={4} className="w-full border rounded p-2"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create License
                </button>
              </form>
            </div>
          )}
    
          {activeTab === 'view' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Existing Licenses</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Title</th>
                      <th className="py-2 px-4 border-b text-left">Licensee</th>
                      <th className="py-2 px-4 border-b text-left">Type</th>
                      <th className="py-2 px-4 border-b text-left">Status</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyLicenses.map((license) => (
                      <tr key={license.id}>
                        <td className="py-2 px-4 border-b">{license.title}</td>
                        <td className="py-2 px-4 border-b">{license.licensee}</td>
                        <td className="py-2 px-4 border-b">{license.type}</td>
                        <td className="py-2 px-4 border-b">{license.status}</td>
                        <td className="py-2 px-4 border-b">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">
                            <Copy className="h-5 w-5" />
                          </button>
                          <button className="text-green-500 hover:text-green-700">
                            <DollarSign className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
    
          <div className="mt-8 bg-blue-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Benefits of Blockchain-Based Licensing</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Transparent and immutable license records</li>
              <li>Automated royalty payments through smart contracts</li>
              <li>Simplified license tracking and management</li>
              <li>Reduced disputes with clear, blockchain-verified terms</li>
            </ul>
          </div>
        </div>



      


        )}
      </div>



      
    </>
  );
};

export default licensingIP;
