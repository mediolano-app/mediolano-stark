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
import { Bell, DollarSign, Star, MessageSquare, AlertTriangle } from 'lucide-react'





const notifications: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();



  const [notifications, setNotifications] = useState([
    { id: 1, type: 'bid', message: 'New bid on your AI Algorithm', date: '2023-06-05', read: false },
    { id: 2, type: 'sale', message: 'Your Eco-Packaging Design has been sold', date: '2023-06-04', read: false },
    { id: 3, type: 'review', message: 'New review on your Smart Home System', date: '2023-06-03', read: true },
    { id: 4, type: 'message', message: 'New message from a potential buyer', date: '2023-06-02', read: true },
    { id: 5, type: 'alert', message: 'Your listing is about to expire', date: '2023-06-01', read: false },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'bid':
        return <DollarSign className="w-6 h-6 text-green-500" />
      case 'sale':
        return <DollarSign className="w-6 h-6 text-blue-500" />
      case 'review':
        return <Star className="w-6 h-6 text-yellow-500" />
      case 'message':
        return <MessageSquare className="w-6 h-6 text-purple-500" />
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-red-500" />
      default:
        return <Bell className="w-6 h-6 text-gray-500" />
    }
  }





  return (
    <>
     
     
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

              <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white shadow-md rounded-lg p-4 flex items-start ${notif.read ? 'opacity-50' : ''}`}>
            <div className="mr-4 mt-1">
              {getIcon(notif.type)}
            </div>
            <div className="flex-grow">
              <p className="font-semibold mb-1">{notif.message}</p>
              <p className="text-sm text-gray-500">{notif.date}</p>
            </div>
            {!notif.read && (
              <button 
                onClick={() => markAsRead(notif.id)} 
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/settings/notifications" className="text-blue-500 hover:text-blue-600">
          Manage notification settings
        </Link>
      </div>
    </div>



        )}


    </div>  
    </>
  );
};

export default notifications;
