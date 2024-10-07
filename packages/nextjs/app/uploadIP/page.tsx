"use client";

import { useRouter } from "next/navigation"; // Correct import for client-side navigation
import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { MyHoldings } from "~~/components/SimpleNFT/MyHoldings";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
import { useState, FormEvent, useRef} from "react";
import { FilePlus } from 'lucide-react';
import { id } from "ethers";
// import { customizeNftMetadata } from "~~/utils/simpleNFT/nftsMetadata";

export type IPType = "" | "patent" | "trademark" | "copyright" | "trade_secret";

export interface IP{
  title: string,
  description: string,
  authors: string[],
  ipType: IPType,
  uploadFile?: File,
}


const uploadIP = () => {

  const router = useRouter();
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [status, setStatus] = useState("Mint NFT");
  const [ipfsHash, setipfsHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState<IP>({
    title: '',
    description: '',
    authors: [],
    ipType: '',
    });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const { writeAsync: mintItem } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "mint_item",
    args: [connectedAddress, ""],
  });

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
    
    const notificationId = notification.loading("Uploading to IPFS");
    try {

      // First remove previous loading notification and then show success notification
      notification.remove(notificationId);
      notification.success("Metadata uploaded to IPFS");

      await mintItem({
        args: [connectedAddress, ipfsHash],
      });
      setStatus("Updating NFT List");
      refetch();
    } catch (error) {
      notification.remove(notificationId);
      console.error(error);
      setStatus("Mint NFT");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement
    | HTMLTextAreaElement>
  ) => {
    
    const { name, value } = e.target;
    setIpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...ipData.authors]
    newAuthors[index] = value
    setIpData(prev => ({ ...prev, authors: newAuthors }))
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {    
    console.log(ipData);
    event.preventDefault(); // Prevent form from refreshing the page

    setIsSubmitting(true);
    setError(null);

    const submitData = new FormData();
    
    submitData.append('title', ipData.title);
    submitData.append('description', ipData.description);
    if (Array.isArray(ipData.authors)) {
        ipData.authors.forEach((author, index) => {
          submitData.append(`authors[${index}]`, author)
        })
      } else {
        // If authors is not an array, append it as a single value
        submitData.append('authors', ipData.authors.toString());
      }
      
    submitData.append('ipType', ipData.ipType);
    if (file) {
      submitData.set('uploadFile', file);
    }

    console.log(submitData);

    for (let pair of submitData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const submitJson = {};
    submitData.forEach((value, key)=>{
      if(submitJson[key]){
        if(Array.isArray(submitJson[key])){
          submitJson[key].push(value);
        }
        else{
          submitJson[key] = [submitJson[key],value];
        }
      } else {
        submitJson[key] = value;
      }
    });

    console.log(submitJson);

    const submitString = JSON.stringify(submitJson);
    console.log(submitString);

    try {
      const response = await fetch('/api/forms-ipfs', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit IP')
      }
      console.log('IP submitted successfully');
      console.log(response.body);
      console.log("POST done, waiting for response");

      
      const data = await response.json();
      setipfsHash(data.metadataHash);

    
    } catch (err) {
        setError('Failed to submit IP. Please try again.');
    } finally {
        setIsSubmitting(false);
    }

    handleMintItem();

  };

  
  return (
    <>
      <div className="flex items-center flex-col pt-10">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Register New IP</h1>
        <p className="mb-6">Secure your intellectual property on the blockchain. Fill out the form below to register your IP.</p>

        </div>
      </div>
      
      
      <div className="flex justify-center">
        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div className="max-w-2xl mx-auto">
     
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={ipData.title}
            onChange={handleChange}
            className="w-full border rounded p-2" 
            required 
          />
          </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={ipData.description}
            onChange={handleChange}
            className="w-full border rounded p-2" 
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="authors" className="block mb-1 font-medium">Authors</label>
          <input 
            type="text" 
            id="authors" 
            name="authors" 
            value={ipData.authors}
            onChange={handleChange}
            className="w-full border rounded p-2" 
            required 
          />
          </div>
        <div>
          <label htmlFor="type" className="block mb-1 font-medium">IP Type</label>
          <select 
            id="type" 
            name="type" 
            value={ipData.ipType}
            onChange={ (e:any) => {
              setIpData((prev) => ({ ...prev, "ipType": e.target.value }));
              console.log(e);
            }}
            className="w-full border rounded p-2"
          >
            <option value="patent">Patent</option>
            <option value="trademark">Trademark</option>
            <option value="copyright">Copyright</option>
            <option value="trade_secret">Trade Secret</option>
          </select>
        </div>
        <div>
          <label htmlFor="file" className="block mb-1 font-medium">Upload File</label>
          <input 
            type="file" 
            id="file" 
            name="file" 
            onChange={handleFileChange}
            className="w-full border rounded p-2" 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center justify-center w-full">
          <FilePlus className="h-5 w-5 mr-2" />
        </button>
      </form>
      <div className="mt-8 bg-blue-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Why Register Your IP on the Blockchain?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Immutable proof of ownership and timestamp</li>
          <li>Increased transparency and reduced fraud</li>
          <li>Simplified licensing and transfer processes</li>
          <li>Global accessibility and recognition</li>
        </ul>
      </div>
    </div>






        )}
      </div>



      
    </>
  );
};

export default uploadIP;
