"use client";

import { lazy, useEffect, useState } from "react";
import type { NextPage } from "next";
import { notification } from "~~/utils/scaffold-stark/notification";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Textarea } from "~~/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"
import { Select } from "~~/components/ui/select"

const LazyReactJson = lazy(() => import("react-json-view"));

const IpfsDownload: NextPage = () => {
  const [yourJSON, setYourJSON] = useState({});
  const [ipfsPath, setIpfsPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);



  const [selectedIP, setSelectedIP] = useState('')

  const ipOptions = [
    { value: "ip1", label: "Intellectual Property 1" },
    { value: "ip2", label: "Intellectual Property 2" },
    { value: "ip3", label: "Intellectual Property 3" },
  ]


  const handleIpfsDownload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Getting data from IPFS");
    try {
      const metaData = await getMetadataFromIPFS(ipfsPath);
      notification.remove(notificationId);
      notification.success("Downloaded from IPFS");

      setYourJSON(metaData);
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Error downloading from IPFS");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

<div className="flex items-center flex-col flex-grow pt-10">
<h1 className="text-center mb-4">
          <span className="block text-4xl font-bold">Licence your IP</span>
        </h1>
    </div>


    <div className="flex items-center flex-col flex-grow pt-10">
    <Card className="bg-main border-accent/50 rounded-full" >
        <CardHeader>
          <CardTitle>IP Licensing Form</CardTitle>
          <CardDescription>Create a license for your registered intellectual property.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Select
                  options={ipOptions}
                  value={selectedIP}
                  onChange={(e) => setSelectedIP(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="licensee" placeholder="Licensee Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Textarea placeholder="License Terms" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="duration" placeholder="License Duration" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="fee" placeholder="License Fee" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create License</Button>
        </CardFooter>
      </Card>


    </div>



      <div className="flex items-center flex-col flex-grow pt-10">
      <Card className="bg-main border-accent/50 rounded-full" >
        <CardHeader>
          <CardTitle>Create your Digital Property</CardTitle>
          <CardDescription>Load your metadata from IPFS and edit your contract information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
        <div
          className={`flex border-2 border-accent/50 rounded-full w-100`}
        >
          <input
            className="input input-ghost focus:outline-none focus:bg-transparent focus:text-secondary-content h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-secondary-content/75"
            placeholder="IPFS CID"
            value={ipfsPath}
            onChange={(e) => setIpfsPath(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button
          className={`btn btn-primary my-6 ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleIpfsDownload}
        >
          Download from IPFS
        </button>

        {mounted && (
          <LazyReactJson
            style={{ padding: "1rem", borderRadius: "0.75rem" }}
            src={yourJSON}
            theme="solarized"
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


            <div className="flex flex-col space-y-1.5">
                <Input id="licensee" placeholder="Asset Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Textarea placeholder="Asset Content" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="duration" placeholder="Author Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="fee" placeholder="Asset Type" />
              </div>


            </div> </form> 
      </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="btn btn-primary my-6">Create Asset</Button>
        </CardFooter>
      </Card>


      </div>





    </>
  );
};

export default IpfsDownload;
