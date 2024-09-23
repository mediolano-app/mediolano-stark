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
import { useState, FormEvent } from "react";
import { FilePlus } from 'lucide-react'

interface FormData {
  title: string,
  briefDescription: string,
  detailedDescription: string,
  // date: Date | null,
  date: string,
  authors: Array<string>,
}

const registerIP = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  // const [status, setStatus] = useState("Mint NFT");

  // const { writeAsync: mintItem } = useScaffoldWriteContract({
  //   contractName: "YourCollectible",
  //   functionName: "mint_item",
  //   args: [connectedAddress, ""],
  // });

  // const { data: tokenIdCounter, refetch } = useScaffoldReadContract({
  //   contractName: "YourCollectible",
  //   functionName: "current",
  //   watch: false,
  // });

  // const handleMintItem = async () => {
  //   setStatus("Minting NFT");
  //   // circle back to the zero item if we've reached the end of the array
  //   if (tokenIdCounter === undefined) {
  //     setStatus("Mint NFT");
  //     return;
  //   }


   



  //   const tokenIdCounterNumber = Number(tokenIdCounter);
  //   const currentTokenMetaData =
  //     nftsMetadata[tokenIdCounterNumber % nftsMetadata.length];
  //   const notificationId = notification.loading("Uploading to IPFS");
  //   try {
  //     const uploadedItem = await addToIPFS(currentTokenMetaData);

  //     // First remove previous loading notification and then show success notification
  //     notification.remove(notificationId);
  //     notification.success("Metadata uploaded to IPFS");

  //     await mintItem({
  //       args: [connectedAddress, uploadedItem.path],
  //     });
  //     setStatus("Updating NFT List");
  //     refetch();
  //   } catch (error) {
  //     notification.remove(notificationId);
  //     console.error(error);
  //     setStatus("Mint NFT");
  //   }

    const router = useRouter()

    const [formData, setFormData] = useState<FormData>({
        title: '',
        briefDescription: '',
        detailedDescription: '',
        date: '',
        authors: [],
    })

    const [errors, setErrors] = useState<Partial<FormData>>({})

    const[count, setCount] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // const validateForm = (): boolean => {
    //     const newErrors: Partial<FormData> = {}
    //     if (formData.title.length < 2) {
    //       newErrors.title = "Title must be at least 2 characters."
    //     }
    //     if (formData.briefDescription.length < 10) {
    //       newErrors.briefDescription = "Brief description must be at least 10 characters."
    //     }
    //     if (formData.detailedDescription.length < 50) {
    //       newErrors.detailedDescription = "Detailed description must be at least 50 characters."
    //     }
    //     if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
    //       newErrors.date = "Please enter a valid date in YYYY-MM-DD format."
    //     }
    //     if (formData.authors.length < 2) {
    //       newErrors.authors = "Please enter at least one author."
    //     }
    //     setErrors(newErrors)
    //     return Object.keys(newErrors).length === 0
    //   }
    
    const getNextSubmissionId = () => {
      setCount(count + 1)
      return count 
    }

    const handleSubmit = 
    (
      // e: FormEvent<HTMLFormElement>
    ) => {
        // e.preventDefault()

        // if (validateForm()) {
        //   console.log(formData)
        //   alert("Form submitted successfully!")
        //   // Here you would typically send the form data to your backend
        // }

        const id = getNextSubmissionId()
        router.push(`/registerIP/${id}`)

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
     
      <form className="space-y-6">
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
        <form onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
          <FilePlus className="h-5 w-5 mr-2" />
          
        </form>
      </form>
      {/* <form id="clickableForm" onClick={handleSubmit} action="/your-action-url" method="post">
        <div class="clickable-area" style="cursor: pointer;">
          <label>Title</label>
          <input type="text" name="title" />
    
          <label>Description</label>
          <textarea name="description"></textarea>
    
          <button type="submit" style="display: none;"></button> <!-- Hidden submit button -->
        </div>
      </form>

      <script>
        // Attach click event to the form
        document.getElementById("clickableForm").addEventListener("click", function() {
          // Programmatically submit the form
          handleSubmit();
        });
      </script> */}
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
