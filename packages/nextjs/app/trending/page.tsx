"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, TrendingUp, Star, Clock, DollarSign, Eye, ThumbsUp, MessageSquare } from 'lucide-react'


const mockData = {
  trendingNow: [
    { id: 1, title: 'AI-powered Drone Navigation System', type: 'Patent', author: 'Dr. Sarah Lee', price: '$15,000', views: 12500, likes: 1890, comments: 342 },
    { id: 2, title: 'Blockchain-based Supply Chain Management', type: 'Software', author: 'TechChain Solutions', price: '$2,999', views: 9800, likes: 1560, comments: 275 },
    { id: 3, title: 'Quantum Computing for Beginners', type: 'eBook', author: 'Prof. David Quantum', price: '$39.99', views: 15600, likes: 2100, comments: 420 },
  ],
  risingStars: [
    { id: 1, title: 'Eco-friendly Biodegradable Plastics', type: 'Patent', author: 'GreenTech Innovations', price: '$8,500', growth: '+250%' },
    { id: 2, title: 'Virtual Reality Fitness Experience', type: 'Software', author: 'FitVR Inc.', price: '$799', growth: '+180%' },
    { id: 3, title: 'AI-Generated Art Collection', type: 'Digital Art', author: 'ArtificialCreative', price: '$5,000', growth: '+150%' },
  ],
  mostValuable: [
    { id: 1, title: 'Revolutionary Cancer Treatment Method', type: 'Patent', author: 'Dr. Emily Chen', price: '$50,000,000' },
    { id: 2, title: 'Quantum Encryption Algorithm', type: 'Software', author: 'QuantumSafe Solutions', price: '$10,000,000' },
    { id: 3, title: 'Fusion Energy Reactor Design', type: 'Patent', author: 'FusionTech Corp', price: '$75,000,000' },
  ],
}


const trending: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  
  




  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div>
            
            <div className="min-h-screen">
     

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search trending..."
                className="w-full pl-10 pr-4 py-2 rounded-lg input focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative w-full sm:w-64">
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg input focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Patent">Patents</option>
                <option value="Software">Software</option>
                <option value="eBook">eBooks</option>
                <option value="DigitalArt">Digital Art</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-indigo-600" />
              Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockData.trendingNow.map((item) => (
                <div key={item.id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                  <Image src="/background.jpg" alt={item.title} width={300} height={200} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="t mb-2">{item.type}</p>
                    <Link href={`/profile/${item.author.toLowerCase().replace(' ', '-')}`} className="text-indigo-600 hover:underline mb-4 block">
                      {item.author}
                    </Link>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-indigo-600 font-bold">{item.price}</span>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span>{item.views}</span>
                        <ThumbsUp className="h-4 w-4 ml-2" />
                        <span>{item.likes}</span>
                        <MessageSquare className="h-4 w-4 ml-2" />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Buy Now
                      </button>
                      <button className="flex-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-indigo-600" />
              Rising Stars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockData.risingStars.map((item) => (
                <div key={item.id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                  <Image src="/background.jpg" alt={item.title} width={300} height={200} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="t mb-2">{item.type}</p>
                    <Link href={`/profile/${item.author.toLowerCase().replace(' ', '-')}`} className="text-indigo-600 hover:underline mb-4 block">
                      {item.author}
                    </Link>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-indigo-600 font-bold">{item.price}</span>
                      <span className="text-green-600 font-semibold">{item.growth} growth</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Buy Now
                      </button>
                      <button className="flex-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-indigo-600" />
              Most Valuable IP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockData.mostValuable.map((item) => (
                <div key={item.id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                  <Image src="/background.jpg" alt={item.title} width={300} height={200} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="t mb-2">{item.type}</p>
                    <Link href={`/profile/${item.author.toLowerCase().replace(' ', '-')}`} className="text-indigo-600 hover:underline mb-4 block">
                      {item.author}
                    </Link>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-indigo-600 font-bold">{item.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Buy Now
                      </button>
                      <button className="flex-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
      
          </div>


        )}


    </div>  
    </>
  );
};

export default trending;
