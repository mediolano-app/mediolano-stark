"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import Link from 'next/link'
import { useState } from 'react'

const preferencesDapp: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    gasPrice: 20,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Settings saved:', settings)
    // Here you would typically save the settings to a backend or local storage
  }

  return (
    <>
      
      
      
      <div className="flex justify-center flex-col pt-10" >


      <div className="flex items-center flex-col flex-grow pt-10">
        <h1 className="text-center mb-4">
          <span className="block text-4xl font-bold">Account Settings</span>
        </h1>
    </div>



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

      <div className="container py-12 max-w-7xl mx-auto">

<div className="max-w-2xl mx-auto bg-base-100 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="theme" className="block mb-1">Theme</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block mb-1">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
        <div>
          <label htmlFor="gasPrice" className="block mb-1">Default Gas Price (Gwei)</label>
          <input
            type="number"
            id="gasPrice"
            name="gasPrice"
            value={settings.gasPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Settings
        </button>
      </form>
    </div>
          

        </div>


        )}
      </div>



      
    </>
  );
};

export default preferencesDapp;
