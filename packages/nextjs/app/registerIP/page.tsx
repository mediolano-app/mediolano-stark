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
import { FilePlus, Lock, FileText, Coins, Shield, Globe, BarChart } from 'lucide-react';
import { id } from "ethers";
import { pinataClient } from "~~/utils/simpleNFT/pinataClient";

import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Textarea } from "~~/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"
import { Select } from "~~/components/ui/select"

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
  const baseUrl = process.env.HOST;
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

  // const {writeAsync: setTokenUri} = useScaffoldWriteContract({
  //   contractName: "YourCollectible",
  //   functionName: "set_token_uri",
  //   args: [connectedAddress, ""],
  // });

  const { data: tokenIdCounter, refetch } = useScaffoldReadContract({
    contractName: "YourCollectible",
    functionName: "current",
    watch: false,
  });

  const handleMintItem = async (

  ) => {
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
        args: [connectedAddress, baseUrl + ipfsHash],
      });
      setStatus("Updating NFT List");
      refetch();
    } catch (error) {
      notification.remove(notificationId);
      console.error(error);
      setStatus("Mint NFT");
    }
  };

  // const handleSetTokenUri = async (url: string) => {
  //   setStatus("Setting token URI");
  //   if(tokenIdCounter == undefined){
  //     setStatus("Set token URI");
  //     return;
  //   }
  //   const tokenIdCounterNumber = Number(tokenIdCounter);
  //   try {
  //     await 
  //   }
  // }

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


    console.log(pinataClient);

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
      
      // console.log(data);
      // console.log(data.url);
      
      setipfsHash(data.ipfsHash);
      
      handleMintItem();

      // handleSetTokenUri(data.url);

    } catch (err) {
        setError('Failed to submit IP. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  
  return (
    <>

    <div className="container mx-auto px-4 py-8">


    <h1 className="text-4xl font-bold text-center mb-8">Intellectual Property Registration</h1>
  
      
      
      
        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-card bg-base-100 text-card-foreground rounded-lg shadow-lg">

        <Card>
        <CardHeader>
          <CardTitle>Create new IP</CardTitle>
          <CardDescription>Register your intellectual property on Starknet blockchain.</CardDescription>
        </CardHeader>
        <CardContent>
     
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={ipData.title}
            onChange={handleChange}
            className="w-full rounded input input-bordered bg-base-300" 
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
            className="w-full rounded input input-bordered bg-base-300" 
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="authors" className="block mb-1 font-medium">Author</label>
          <input 
            type="text" 
            id="authors" 
            name="authors" 
            value={ipData.authors}
            onChange={handleChange}
            className="w-full rounded input input-bordered bg-base-300" 
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
            className="w-full input input-bordered rounded bg-base-300"
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
            className="w-full border rounded p-2 input input-bordered bg-base-300" 
          />
        </div>
        <button type="submit" className="px-6 py-4 flex items-center justify-center w-full rounded input input-bordered">
          <FilePlus className="h-5 w-5 mr-2" /> Create License
        </button>
      </form>
      </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Need help?</Button>
        </CardFooter>
      </Card>
      </div>



      <div className="bg-card bg-base-300 text-card-foreground rounded-lg shadow-lg p-6">

        <div className="text-center py-2">
          <h2 className="text-2xl font-semibold mb-2">Blockchain IP Protection Features</h2>
          <p className="text-muted-foreground mb-4">Secure, transparent, and efficient</p>
          </div>
        
          <ul className="space-y-6">
            <li className="flex items-start">
              <Lock className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Immutable Protection</h3>
                <p className="text-sm text-muted-foreground">Your IP is securely stored on the blockchain, providing tamper-proof evidence of ownership and creation date.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FileText className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Smart Licensing</h3>
                <p className="text-sm text-muted-foreground">Utilize smart contracts for automated licensing agreements, ensuring proper attribution and compensation.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Coins className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Tokenized Monetization</h3>
                <p className="text-sm text-muted-foreground">Transform your IP into digital assets, enabling fractional ownership and new revenue streams.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Enhanced Security</h3>
                <p className="text-sm text-muted-foreground">Benefit from blockchain's cryptographic security, protecting your IP from unauthorized access and tampering.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Globe className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Global Accessibility</h3>
                <p className="text-sm text-muted-foreground">Access and manage your IP rights from anywhere in the world, facilitating international collaborations and licensing.</p>
              </div>
            </li>
            <li className="flex items-start">
              <BarChart className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Analytics and Insights</h3>
                <p className="text-sm text-muted-foreground">Gain valuable insights into your IP portfolio's performance and market trends through blockchain-powered analytics.</p>
              </div>
            </li>
          </ul>
        </div>


      
    </div>






        )}


        


    </div>
      
    </>
  );
};

export default uploadIP;