"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, Music, User, Calendar, Tag, Disc, Users, MapPin, Copyright, Link as LinkIcon, Globe, DollarSign, Shield, FileText, Building, Car, Gem, Briefcase } from 'lucide-react'

const mockData = [
  { id: 1, title: 'Diamond Ring', artist: 'Artesan', album: 'Jewelry', releaseDate: '2023-05-15', genre: 'Classical' },
  { id: 2, title: 'Electric Dreams', artist: 'Neon Nights', album: 'Synthwave Anthology', releaseDate: '2023-04-20', genre: 'Electronic' },
  { id: 3, title: 'Acoustic Sunrise', artist: 'Melody Makers', album: 'Morning Serenity', releaseDate: '2023-05-10', genre: 'Folk' },
]




const registerRWA: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: '',
    estimatedValue: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Real World Asset registration successful!')
    setFormData({
      title: '',
      type: '',
      description: '',
      location: '',
      estimatedValue: '',
    })
  }
  

  return (
    <>
     
     
     <div>

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/registerIP" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          IP Templates
        </Link>
        <h1 className="text-3xl font-extrabold  mb-8">Real World Asset</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Register your RWA</h2>
            <p>Your intellectual property will be registered with the information you provided.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium ">Asset Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium ">Type</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium ">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full input rounded bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium ">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="estimatedValue" className="block text-sm font-medium ">Estimated Value (USD)</label>
                <input
                  type="text"
                  id="estimatedValue"
                  name="estimatedValue"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register Asset
              </button>
            </form>
          </div>

          

          <div className="">


          <div className="bg-base-300 p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Why Tokenize Real World Assets?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Globe className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">Access global investors</span>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">Unlock liquidity in illiquid assets</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">Enhanced security and transparency</span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">Simplified asset management</span>
                </li>
              </ul>
            </div>
            

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">RWA Types Examples</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Building className="h-6 w-6 text-indigo-500 mr-2" />
                  <span className="text-sm">Real Estate</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-6 w-6 text-indigo-500 mr-2" />
                  <span className="text-sm">Vehicles</span>
                </div>
                <div className="flex items-center">
                  <Gem className="h-6 w-6 text-indigo-500 mr-2" />
                  <span className="text-sm">Jewelry</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-6 w-6 text-indigo-500 mr-2" />
                  <span className="text-sm">Businesses</span>
                </div>
              </div>
            </div>
            
            <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h4 className="text-xm">Marketplace</h4>
            <h2 className="text-xl font-semibold mb-10">Registered Real World Asset</h2>
            
            <ul className="space-y-4">
              {mockData.map((item) => (
                <li key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gem className="h-5 w-5 text-accent mr-2" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-sm text-accent">{item.genre}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-neutral">
                    <User className="h-4 w-4 mr-1" />
                    <span>{item.artist}</span>
                    <Disc className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.album}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.releaseDate}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <a className="btn mt-10" href="#">Open Listing</a>
            </div>
           


            
            


          </div>
        </div>
      </div>
    </div>


        )}


    </div>  
    </>
  );
};

export default registerRWA;
