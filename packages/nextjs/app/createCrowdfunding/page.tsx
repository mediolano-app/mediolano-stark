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
import { Slider } from "~~/components/ui/slider"
import { Switch } from "~~/components/ui/switch"
import { Calendar, DollarSign, Users, Clock, Target } from "lucide-react"

const createCrowdfunding: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const [fundingGoal, setFundingGoal] = useState(10000)
  const [duration, setDuration] = useState(30)

  // Mock user's IP data
  const userIPs = [
    { id: "ip1", name: "AI-Powered Neural Interface" },
    { id: "ip2", "name": "Quantum Encryption Algorithm" },
    { id: "ip3", "name": "Sustainable Energy Converter" },
  ]
  return (
    <>
      
      
      
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

      <div className="max-w-10xl mx-auto">   

      <h1 className="text-3xl font-bold mb-6">Create Crowdfunding Campaign</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      
      <Card className="shadow bg-base-100">
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>Set up your intellectual property crowdfunding campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ip-select">Select Intellectual Property</Label>
            <Input id="ip-select" placeholder="Select your IP" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="Enter campaign name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-description">Campaign Description</Label>
            <Textarea id="campaign-description" placeholder="Describe your campaign and how the funds will be used" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="funding-goal">Funding Goal (USD)</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="funding-goal"
                type="number"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(Number(e.target.value))}
                className="w-32"
              />
              <Slider
                value={[fundingGoal]}
                onValueChange={(value) => setFundingGoal(value[0])}
                max={1000000}
                step={1000}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-duration">Campaign Duration (Days)</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="campaign-duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-20"
              />
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                max={90}
                step={1}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="terms" />
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Campaign</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Raise Capital</h3>
                <p className="text-sm text-muted-foreground">Secure funding for your intellectual property development</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Build Community</h3>
                <p className="text-sm text-muted-foreground">Engage with supporters and potential customers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Validate Market</h3>
                <p className="text-sm text-muted-foreground">Gauge interest and demand for your innovation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create your campaign with details about your IP</li>
              <li>Set your funding goal and campaign duration</li>
              <li>Share your campaign with potential backers</li>
              <li>Receive funds if your goal is met within the timeframe</li>
              <li>Deliver on your promises and keep backers updated</li>
            </ol>
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

export default createCrowdfunding;
