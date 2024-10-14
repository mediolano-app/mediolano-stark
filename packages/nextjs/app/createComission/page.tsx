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
import { Select, SelectItem } from "~~/components/ui/select2"
import { DollarSign, Target, Users } from "lucide-react";

const createComission: NextPage = () => {
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

      <h1 className="text-3xl font-bold mb-6">Commission Intellectual Property</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      
      <Card className="bg-base-100">
        <CardHeader>
          <CardTitle>Commission IP from a Freelancer</CardTitle>
          <CardDescription>Describe the intellectual property you need created</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter a name for your project" className="w-full rounded input input-bordered bg-base-300" />
              </div>
              <div>
                <Label htmlFor="ip-type">IP Type</Label>
                <Select id="ip-type" className="w-full rounded input input-bordered bg-base-300">
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="design">Graphic Design</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="invention">Invention</SelectItem>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" placeholder="Describe the intellectual property you need created" className="w-full rounded input input-bordered bg-base-300" />
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="Enter your budget for this project" className="w-full rounded input input-bordered bg-base-300" />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" className="w-full rounded input input-bordered bg-base-300" />
              </div>
              <div>
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea id="requirements" placeholder="Any specific requirements or skills needed" className="w-full rounded input input-bordered bg-base-300" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Post Project</Button>
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
                <h3 className="font-semibold">Publish</h3>
                <p className="text-sm text-muted-foreground">Order your intellectual property on our marketplace.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-muted-foreground">Your order is executed through smart contracts.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Licensing</h3>
                <p className="text-sm text-muted-foreground">All information is recorded on the blockchain.</p>
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
              <li>Set your budget and extra details</li>
              <li>Publish your order</li>
              <li>Stay tuned for app updates and notifications.</li>
              <li>Analise prospect proposals</li>
              <li>Aprove the comission</li>
              <li>Receive your digital asset</li>
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

export default createComission;
