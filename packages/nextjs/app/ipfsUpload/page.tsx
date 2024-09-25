"use client";

import { lazy, useEffect, useState } from "react";
import type { NextPage } from "next";
import { notification } from "~~/utils/scaffold-stark/notification";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
import { Collectible } from "~~/components/SimpleNFT/MyHoldings";

import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Textarea } from "~~/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"
import { Select } from "~~/components/ui/select"
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const LazyReactJson = lazy(() => import("react-json-view"));

const NFTCard = ({ nft }: { nft: Collectible }) => {
  const [transferToAddress, setTransferToAddress] = useState("");

  const { writeAsync: transferNFT } = useScaffoldWriteContract({
    contractName: "YourCollectible",
    functionName: "transfer_from",
    args: [nft.owner, transferToAddress, BigInt(nft.id.toString())],
  });

  const wrapInTryCatch =
    (fn: () => Promise<any>, errorMessageFnDescription: string) => async () => {
      try {
        await fn();
      } catch (error) {
        console.error(
          `Error calling ${errorMessageFnDescription} function`,
          error,
        );
      }
    };
  }


const IpfsUpload: NextPage = () => {
  const [yourJSON, setYourJSON] = useState<object>(nftsMetadata[0]);
  const [loading, setLoading] = useState(false);
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIpfsUpload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Uploading to IPFS...");
    try {
      const uploadedItem = await addToIPFS(yourJSON);
      notification.remove(notificationId);
      notification.success("Uploaded to IPFS");

      setUploadedIpfsPath(uploadedItem.path);
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Error uploading to IPFS");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div>

      <div className="flex items-center flex-col flex-grow pt-10">
      <h1 className="text-3xl font-bold mb-6">Register Your Asset</h1>
      </div>

      
      <div className="flex items-center flex-col flex-grow pt-10">
      <Card className="bg-main border-accent/50 rounded-full" >
        <CardHeader>
          <CardTitle>1st - Upload Your Metadata to IPFS</CardTitle>
          <CardDescription>Save your information to a descentralized server.</CardDescription>
        </CardHeader>
        <CardContent>
  

        {mounted && (
          <LazyReactJson
            style={{ padding: "1rem", borderRadius: "0.75rem" }}
            src={yourJSON}
            theme="colors"
            enableClipboard={false}
            onEdit={(edit) => {
              setYourJSON(edit.updated_src);
            }}
            onAdd={(add) => {
              setYourJSON(add.updated_src);
            }}
            onDelete={(del) => {
              setYourJSON(del.updated_src);
            }}
          />
        )}
        <button
          className={`btn btn-secondary text-white my-4 ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleIpfsUpload}
        >
          Upload to IPFS
        </button>
       
     

      </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>

       </div> 


       <div className="flex items-center flex-col flex-grow pt-10">
       <Card className="bg-main border-accent/50 rounded-full" >
        <CardHeader>
          <CardTitle>2nd - Generate your Asset as NFT</CardTitle>
          <CardDescription>Your property will be protected as a smart contract.</CardDescription>
        </CardHeader>
        <CardContent>
        {uploadedIpfsPath && (
          <div className="mt-4">
            <p>Metadata onChain:</p>
            <a
              href={`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              {`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
            </a>
          </div>
        )}
        
        
        
      </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
      </div>




      </div>
    </>
  );
};

export default IpfsUpload;
