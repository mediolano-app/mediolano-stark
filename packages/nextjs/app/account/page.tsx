"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import Link from 'next/link'
import { useState } from 'react'

const settingsDapp: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  
  const [account, setAccount] = useState({
    fullName: 'Mediolano',
    nickname: 'Demo',
    country: 'Brazil',
    address: '',
    description: 'Dapp demonstration',
    website: 'https://mediolano.app',
    twitter: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    walletAddress: 'mediolano.braavos.stark.id',
    mobile: '',
    email: 'dapp@mediolano.app',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAccount(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Account information saved:', account)
    // Here you would typically save the account information to a backend or blockchain
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

    <div className="max-w-2xl mx-auto bg-base-300 p-6 rounded shadow">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(account).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            {key === 'description' ? (
              <textarea
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            ) : (
              <input
                type={key === 'email' ? 'email' : key === 'mobile' ? 'tel' : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}
        <button type="submit" disabled className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
          

        </div>


        )}
      </div>



      
    </>
  );
};

export default settingsDapp;
