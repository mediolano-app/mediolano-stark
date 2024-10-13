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
import { Mail, Globe, Twitter, Linkedin, Edit, Star, Award, TrendingUp, DollarSign, BarChart2, Activity, Package, ShoppingCart, Heart, Trophy, Users, GroupIcon } from 'lucide-react'

const publicProfile: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  
  const user = {
    name: "Stark",
    username: "stark",
    avatar: "/background.jpg",
    coverImage: "/background.jpg",
    bio: "Innovative tech entrepreneur and IP creator specializing in AI and blockchain technologies",
    email: "stark@example.com",
    website: "https://stark.com",
    github: "stark",
    twitter: "stark",
    linkedin: "starknet",
    joinDate: "January 2023",
    reputation: 4.8,
    totalSales: 250000,
    activeListings: 5,
    completedSales: 15,
    listings: [
      { id: 1, title: "AI-Powered Image Recognition", price: 50, image: "/background.jpg", status: "Active", views: 1200, favorites: 45 },
      { id: 2, title: "Eco-Friendly Packaging Solution", price: 25, image: "/background.jpg", status: "Sold", views: 3500, favorites: 120 },
      { id: 3, title: "Blockchain-Based Supply Chain Management", price: 75, image: "/background.jpg", status: "Active", views: 800, favorites: 30 },
      { id: 4, title: "Smart Home Energy Optimization", price: 60, image: "/background.jpg", status: "Active", views: 950, favorites: 38 },
      { id: 5, title: "Augmented Reality Navigation System", price: 90, image: "/background.jpg", status: "Sold", views: 2800, favorites: 105 },
    ],
    purchases: [
      { id: 1, title: "Quantum Encryption Protocol", price: 100, image: "/background.jpg", date: "2023-05-15", seller: "QuantumTech" },
      { id: 2, title: "Advanced Machine Learning Model", price: 80, image: "/background.jpg", date: "2023-04-22", seller: "AIInnovate" },
      { id: 3, title: "Sustainable Water Purification Method", price: 70, image: "/background.jpg", date: "2023-06-03", seller: "EcoSolutions" },
      { id: 4, title: "Next-Gen Battery Technology", price: 120, image: "/background.jpg", date: "2023-05-28", seller: "EnergyFuture" },
    ],
    favorites: [
      { id: 1, title: "Novel Drug Delivery System", price: 75, image: "/background.jpg", creator: "BioTechInnovator" },
      { id: 2, title: "Smart City Infrastructure Design", price: 120, image: "/background.jpg", creator: "UrbanPlanner" },
      { id: 3, title: "Quantum Computing Algorithm", price: 150, image: "/background.jpg", creator: "QuantumMinds" },
      { id: 4, title: "Biodegradable Plastic Alternative", price: 85, image: "/background.jpg", creator: "GreenMaterials" },
    ],
    achievements: [
      { id: 1, title: "Top Seller", description: "Achieved over $100,000 in sales", icon: <Award className="w-8 h-8 text-yellow-400" /> },
      { id: 2, title: "Innovation Master", description: "Listed 10+ unique IPs", icon: <TrendingUp className="w-8 h-8 text-blue-400" /> },
      { id: 3, title: "Quick Seller", description: "Sold an IP within 24 hours of listing", icon: <Activity className="w-8 h-8 text-green-400" /> },
      { id: 4, title: "Consistent Performer", description: "Maintained 4.5+ rating for 6 months", icon: <Star className="w-8 h-8 text-purple-400" /> },
      { id: 5, title: "Community Leader", description: "Helped 50+ users with their queries", icon: <Users className="w-8 h-8 text-red-400" /> },
    ],
    collections: [
      { id: 1, title: "AI Innovations", items: 5, image: "/background.jpg" },
      { id: 2, title: "Green Technologies", items: 3, image: "/background.jpg" },
      { id: 3, title: "Blockchain Solutions", items: 4, image: "/background.jpg" },
    ],
  }



  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         


          <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-blue-600">
            <Image
              src={user.coverImage}
              alt="Cover"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue to-transparent"></div>
          </div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 mb-4 sm:mb-0">
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-primary">{user.name} @{user.username}</h1>
                <br/><br/>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-2">
                <Link href="/messages" className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors duration-200">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Link>
                <Link href="/settings" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center hover:bg-gray-300 transition-colors duration-200">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 ">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">{user.website}</a>
              </div>
              
              <div className="flex items-center">
                <Twitter className="w-4 h-4 mr-2" />
                <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">{user.twitter}</a>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">{user.linkedin}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Panel */}
        <div className="mt-8 bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BarChart2 className="w-6 h-6 mr-2 text-blue-600" />
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Reputation</h3>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold">{user.reputation.toFixed(1)}</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(user.reputation / 5) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-base-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Total Sales</h3>
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold">${user.totalSales.toLocaleString()}</div>
            </div>
            <div className="bg-base-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Activity</h3>
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex justify-between text-center">
                <div>
                  <div className="text-2xl font-bold">{user.activeListings}</div>
                  <div className="text-sm ">Active Listings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.completedSales}</div>
                  <div className="text-sm ">Completed Sales</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Panel */}
        <div className="mt-8 bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Package className="w-6 h-6 mr-2 text-blue-600" />
            Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.listings.map((listing) => (
              <div key={listing.id} className="bg-base-200 rounded-lg overflow-hidden">
                <Image src={listing.image} alt={listing.title} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                  <p className="text-blue-600 font-bold mb-2">{listing.price} ETH</p>
                  <p className={`text-sm ${listing.status === 'Active' ? 'text-green-600' : 'text-red-600'} mb-2`}>
                    Status: {listing.status}
                  </p>
                  <div className="flex justify-between text-sm ">
                    <span>{listing.views} views</span>
                    <span>{listing.favorites} favorites</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchases Panel */}
        <div className="mt-8 bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
            Purchases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.purchases.map((purchase) => (
              <div key={purchase.id} className="bg-base-200 rounded-lg overflow-hidden">
                <Image src={purchase.image} alt={purchase.title} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{purchase.title}</h3>
                  <p className="text-blue-600 font-bold mb-2">{purchase.price} ETH</p>
                  <p className="text-sm  mb-2">Purchased on: {purchase.date}</p>
                  <p className="text-sm ">Seller: {purchase.seller}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorites Panel */}
        <div className="mt-8 bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-blue-600" />
            Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.favorites.map((favorite) => (
              <div key={favorite.id} className="bg-base-200 rounded-lg overflow-hidden">
                <Image src={favorite.image} alt={favorite.title} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{favorite.title}</h3>
                  <p className="text-blue-600 font-bold mb-2">{favorite.price}   ETH</p>
                  <p className="text-sm  mb-2">Created by: {favorite.creator}</p>
                  <button className="w-full px-4 py-2 text-red-600 rounded-md flex items-center justify-center hover:bg-red-200 transition-colors duration-200">
                    <Heart className="w-4 h-4 mr-2" />
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Panel */}
        <div className="mt-8 bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-blue-600" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-base-200 rounded-lg p-6 flex items-center">
                <div className="mr-4">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm ">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections Panel */}
        <div className="mt-8 bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <GroupIcon className="w-6 h-6 mr-2 text-blue-600" />
            Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.collections.map((collection) => (
              <div key={collection.id} className="bg-base-200 rounded-lg overflow-hidden">
                <Image src={collection.image} alt={collection.title} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{collection.title}</h3>
                  <p className=" mb-4">{collection.items} items</p>
                  <Link href="#" className="px-4 py-2 bg-blue-600 text-white rounded-md inline-block hover:bg-blue-700 transition-colors duration-200">
                    View Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>






        )}


    </div>  
    </>
  );
};

export default publicProfile;
