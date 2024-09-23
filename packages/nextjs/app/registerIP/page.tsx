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
  uploadFile?: any,
}

const registerIP = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const[count, setCount] = useState(0)
  const getNextSubmissionId = () => {
    setCount(count + 1)
    return count 
  }
  const setRoute = () => {
    const id = getNextSubmissionId();
    console.log("setRoute ativado");
    router.push(`/registerIP/${10}`);
  };

  const [formData, setFormData] = useState<IP>({
    title: "",
    description: "",
    authors: [],
    ipType: "",
  });


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from refreshing the page
  
    const formData = new FormData(event.currentTarget); // Use FormData to access form fields
  
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authors = (formData.get("authors") as string).split(",").map(author => author.trim());
    const ipType = formData.get("type") as IPType;
    const uploadFile = formData.get("file") as File;
  
    const ip: IP = {
      title,
      description,
      authors,
      ipType,
      uploadFile,
    };
  
    console.log("handleSubmit ativado");
    setRoute();
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
            className="w-full border rounded p-2" 
            required 
          />
          </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea 
            id="description" 
            name="description" 
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
            className="w-full border rounded p-2" 
            required 
          />
          </div>
        <div>
          <label htmlFor="type" className="block mb-1 font-medium">IP Type</label>
          <select 
            id="type" 
            name="type" 
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
            className="w-full border rounded p-2" 
          />
        </div>
        <form className="bg-blue-500 text-white px-6 py-2 rounded flex items-center justify-center">
          <button onClick={setRoute} type="submit" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center justify-center">
            <FilePlus className="h-5 w-5 mr-2" />
          </button>
        </form>
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

export default registerIP;
