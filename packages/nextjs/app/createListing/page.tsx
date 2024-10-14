"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { SetStateAction, useState } from "react"
import { Button } from "~~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"
import { Input } from "~~/components/ui/input"
import { Label } from "~~/components/ui/label"
import { Textarea } from "~~/components/ui/textarea"
import { Select } from "~~/components/ui/select"
import { Switch } from "~~/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "~~/components/ui/radio-group"
import { Slider } from "~~/components/ui/slider"
import { Tag, DollarSign, FileText, Briefcase, ShoppingBag, Users } from "lucide-react"

const createListing: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const [listingType, setListingType] = useState("sell")
  const [price, setPrice] = useState(1000)

  return (
    <>
      
      
      
      <div className="flex justify-center flex-col pt-10" >



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">    

  


      {/*
      <div className="container py-12 max-w-7xl mx-auto">


        <section className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Ready to step up?</h2>
          <p className="mb-6">Start trading intellectual property today!</p>
          <div className="space-x-4">
            <Button>
              <Link href="/registerIP">Register New</Link>
            </Button>
            <Button variant="outline">
              <Link href="/licensingIP">Licensing Your IP</Link>
            </Button>
          </div>
        </section>
        
      </div>*/}
          
      



      <div className="container">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Listing</h1>
      
      <Card className="shadow bg-base-200">
        <CardHeader>
          <CardTitle>Listing Details</CardTitle>
          <CardDescription>Create a new listing for your intellectual property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ip-select">Select Intellectual Property</Label>
            <Input id="ip-select" type="text" placeholder="Enter your license type" />
          </div>

          <div className="space-y-2">
            <Label>Listing Type</Label>
            <RadioGroup defaultValue="sell" onVolumeChange={setListingType}>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell" id="sell" />
                  <Label htmlFor="sell">Sell</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="license" id="license" />
                  <Label htmlFor="license">License</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crowdfunding" id="crowdfunding" />
                  <Label htmlFor="crowdfunding">Crowdfunding</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="listing-title">Listing Title</Label>
            <Input id="listing-title" placeholder="Enter a catchy title for your listing" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="listing-description">Listing Description</Label>
            <Textarea id="listing-description" placeholder="Describe your intellectual property and its potential applications" />
          </div>

          {listingType !== "crowdfunding" && (
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-32"
                />
                <Slider
                  value={[price]}
                  onValueChange={(value: SetStateAction<number>[]) => setPrice(value[0])}
                  max={1000000}
                  step={100}
                  className="flex-1"
                />
              </div>
            </div>
          )}

          {listingType === "license" && (
            <div className="space-y-2">
              <Label htmlFor="license-type">License Type</Label>
              <Input id="license-type" type="text" placeholder="Enter your license type" />
            </div>
          )}

          {listingType === "crowdfunding" && (
            <div className="space-y-2">
              <Label htmlFor="funding-goal">Funding Goal (USD)</Label>
              <Input id="funding-goal" type="number" placeholder="Enter your funding goal" />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch id="terms" />
            <Label htmlFor="terms">I agree to the marketplace terms and conditions</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Listing</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Listing Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Tag className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Increased Visibility</h3>
                <p className="text-sm text-muted-foreground">Showcase your IP to a global audience of potential buyers and investors</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Monetization Opportunities</h3>
                <p className="text-sm text-muted-foreground">Sell, license, or crowdfund your intellectual property</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Secure Transactions</h3>
                <p className="text-sm text-muted-foreground">Blockchain-backed listings ensure transparency and security</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listing Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Sell</h3>
                <p className="text-sm text-muted-foreground">Transfer full ownership of your IP for a one-time payment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Briefcase className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">License</h3>
                <p className="text-sm text-muted-foreground">Grant usage rights while retaining ownership</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Crowdfunding</h3>
                <p className="text-sm text-muted-foreground">Raise funds for further development or commercialization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>





      </div>

        )}
      </div>



      
    </>
  );
};

export default createListing;
