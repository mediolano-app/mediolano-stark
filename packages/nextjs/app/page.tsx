"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import Image from "next/image";

import { Button } from "~~/components/ui/buttom";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { ArrowRight, BookOpen, Download, HeartHandshake, List, MessageSquare, ShieldCheck } from 'lucide-react';

const Home: NextPage = () => {
  const connectedAddress = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Mediolano</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium text-[#00A3FF]">
              Connected Address:
            </p>
            <Address address={connectedAddress.address as AddressType} />
          </div>
          
          
        </div>

        
        {/* <div
          onClick={() => {
            writeAsync();
          }}
        >
          TEST TX
        </div> */}
      </div>


      <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Protect Your Intellectual Property
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Register, license, and market your intellectual property with ease. Secure your ideas and innovations today.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BookOpen className="h-6 w-6 mb-2" />
                  <CardTitle>Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Register your intellectual property quickly and securely.</p>
                    <Button className="mt-4" variant="outline" asChild>
                      <Link href="/register">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <List className="h-6 w-6 mb-2" />
                  <CardTitle>Listing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>List your intellectual property for potential buyers or licensees.</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/list">List Property <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <HeartHandshake className="h-6 w-6 mb-2" />
                  <CardTitle>Licensing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>License your intellectual property to interested parties.</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/license">License Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Download className="h-6 w-6 mb-2" />
                  <CardTitle>Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access and download important documents and resources.</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/downloads">Download <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get help and support for all your IP-related queries.</p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/support">Get Support <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
    </div>




    </>
  );
};

export default Home;
