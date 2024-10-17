"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Grid, List, ChevronDown, Star, DollarSign, Eye, Heart, Share2 } from 'lucide-react'



const marketplace: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = [
    'All',
    'AI & Machine Learning',
    'Blockchain',
    'IoT',
    'Green Tech',
    'Biotech',
    'Robotics',
    'AR/VR',
    'Cybersecurity',
  ]

  const listings = [
    {
      id: 1,
      title: 'AI-Powered Image Recognition System',
      description: 'Advanced AI algorithm for real-time image recognition and classification.',
      price: 2500,
      currency: 'ETH',
      category: 'AI & Machine Learning',
      image: '/background.jpg',
      creator: 'Stark',
      creatorAvatar: '/background.jpg',
      rating: 4.8,
      reviews: 56,
      views: 1200,
      favorites: 89,
    },
    {
      id: 2,
      title: 'Blockchain-Based Supply Chain Solution',
      description: 'Decentralized supply chain management system using blockchain technology.',
      price: 3800,
      currency: 'ETH',
      category: 'Blockchain',
      image: '/background.jpg',
      creator: 'Stark',
      creatorAvatar: '/background.jpg',
      rating: 4.6,
      reviews: 42,
      views: 980,
      favorites: 72,
    },
    {
      id: 3,
      title: 'Smart Home IoT Ecosystem',
      description: 'Comprehensive IoT solution for intelligent home automation and energy management.',
      price: 1800,
      currency: 'ETH',
      category: 'IoT',
      image: '/background.jpg',
      creator: 'Stark',
      creatorAvatar: '/background.jpg',
      rating: 4.9,
      reviews: 78,
      views: 2100,
      favorites: 156,
    },
    {
      id: 4,
      title: 'Eco-Friendly Water Purification Technology',
      description: 'Innovative water purification system using sustainable materials and processes.',
      price: 4200,
      currency: 'ETH',
      category: 'Green Tech',
      image: '/background.jpg',
      creator: 'Stark',
      creatorAvatar: '/background.jpg',
      rating: 4.7,
      reviews: 35,
      views: 850,
      favorites: 64,
    },
    {
      id: 5,
      title: 'CRISPR Gene Editing Toolkit',
      description: 'Advanced gene editing toolkit using CRISPR technology for medical research.',
      price: 6500,
      currency: 'ETH',
      category: 'Biotech',
      image: '/background.jpg',
      creator: 'Stark',
      creatorAvatar: '/background.jpg',
      rating: 4.9,
      reviews: 62,
      views: 1800,
      favorites: 137,
    },
    {
      id: 6,
      title: 'Autonomous Drone Navigation System',
      description: 'AI-powered navigation and obstacle avoidance system for autonomous drones.',
      price: 3200,
      currency: 'ETH',
      category: 'Robotics',
      image: '/background.jpg',
      creator: 'Stark',
      creatorAvatar: '/background.jpg',
      rating: 4.5,
      reviews: 28,
      views: 720,
      favorites: 53,
    },
  ]

  const filteredListings = listings.filter(
    listing => categoryFilter === 'all' || listing.category.toLowerCase() === categoryFilter.toLowerCase()
  )

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id
    if (sortBy === 'price-low-high') return a.price - b.price
    if (sortBy === 'price-high-low') return b.price - a.price
    if (sortBy === 'most-viewed') return b.views - a.views
    if (sortBy === 'most-favorited') return b.favorites - a.favorites
    return 0
  })




  const categoriesIP = [
    { id: 1, name: "Art", count: 150 },
    { id: 2, name: "Culture", count: 80 },
    { id: 3, name: "Design", count: 60 },
    { id: 4, name: "News", count: 45 },
    { id: 5, name: "Music", count: 30 },
    { id: 6, name: "Reviews", count: 55 },
    { id: 7, name: "Patents", count: 25 },
    { id: 8, name: "Technology", count: 40 },
    { id: 8, name: "Videos", count: 140 },
  ]




  const collections = [
    { id: 1, name: "Movie Reviews", creator: "Author", items: 25, image: "/background.jpg" },
    { id: 2, name: "Fine Art Paintings", creator: "Stark", items: 18, image: "/background.jpg" },
    { id: 3, name: "Medical Breakthroughs", creator: "HealthTech", items: 30, image: "/background.jpg" },
    { id: 4, name: "Future of Transportation", creator: "Corp", items: 22, image: "/background.jpg" },
    { id: 5, name: "Music Releases", creator: "Author", items: 50, image: "/background.jpg" },
    { id: 6, name: "Art Colab", creator: "DAO", items: 22, image: "/background.jpg" },
  ]



  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         



          <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">IP Marketplace</h1>


          <div>
          <h2 className="mb-8 text-2xl">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesIP.map((category) => (
              <Link key={category.id} href={`/marketplace?category=${category.name}`} className="block">
                <div className="bg-base-200 hover:bg-base-300 shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                  <p className="text">{category.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div></div>
        
        

        <h2 className="text-3xl font-bold mt-20 mb-8">Listings</h2>

    
          {/* Search and Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for IP..."
                  className="w-full pl-10 pr-4 py-2 input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-base-100 input rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-base-100 input rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="most-viewed">Most Viewed</option>
                  <option value="most-favorited">Most Favorited</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {viewMode === 'grid' ? <List /> : <Grid />}
              </button>
            </div>
          </div>
    
          {/* Listings */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedListings.map((listing) => (
              <div key={listing.id} className={`bg-base-100 rounded-lg shadow-md overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                  <Image src={listing.image} alt={listing.title} width={400} height={300} className="w-full h-48 object-cover" />
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                  <div className="flex items-center mb-4">
                    <Image src={listing.creatorAvatar} alt={listing.creator} width={32} height={32} className="rounded-full mr-2" />
                    <span className="text-sm text-neutral">{listing.creator}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{listing.rating}</span>
                      <span className="text-neutral ml-1">({listing.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-neutral space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        <span>{listing.favorites}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      {listing.price} {listing.currency}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-neutral hover:text-blue-500 focus:outline-none">
                        <Heart />
                      </button>
                      <button className="p-2 text-neutral hover:text-blue-500 focus:outline-none">
                        <Share2 />
                      </button>
                      <Link href={`/marketIP`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
    
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="px-3 py-2 rounded-l-md border  bg-base-100 text-neutral hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="px-3 py-2 border-t border-b  bg-base-100 text-blue-600 font-medium">
                1
              </a>
              <a href="#" className="px-3 py-2 border-t border-b  bg-base-100 text-neutral hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-3 py-2 border-t border-b  bg-base-100 text-neutral hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-3 py-2 rounded-r-md border  bg-base-100 text-neutral hover:bg-gray-50">
                Next
              </a>
            </nav>
          </div>
        
        
        <div className="mt-20"></div>
        
        
          <div>
          <h2 className="text-3xl font-bold mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`} className="block">
                <div className="bg-base-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image src={collection.image} alt={collection.name} width={400} height={200} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
                    <p className="text-gray-600 mb-2">By {collection.creator}</p>
                    <p className="text-blue-600">{collection.items} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        
        
        
        
        </div>


            



         

        )}


    </div>  
    </>
  );
};

export default marketplace;
