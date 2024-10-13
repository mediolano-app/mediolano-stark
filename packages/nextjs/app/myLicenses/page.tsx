"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";
import Link from 'next/link'
import { Search, Filter, Shield, DollarSign, Link as LinkIcon, ExternalLink, Plus, ArrowRight, Eye } from 'lucide-react'

// Mocked data for intellectual properties and their licenses
const mockIPsWithLicenses = [
    {
      id: 1,
      name: 'Patent A',
      type: 'Patent',
      description: 'A revolutionary technology for renewable energy',
      licenses: [
        { id: 1, name: 'License 1', licensee: 'Company X', value: 10000, currency: 'USD' },
        { id: 2, name: 'License 2', licensee: 'Company Y', value: 15000, currency: 'USD' },
      ],
    },
    {
      id: 2,
      name: 'Trademark B',
      type: 'Trademark',
      description: 'A well-known brand in the fashion industry',
      licenses: [
        { id: 3, name: 'License 3', licensee: 'Company Z', value: 5000, currency: 'EUR' },
      ],
    },
    {
      id: 3,
      name: 'Copyright C',
      type: 'Copyright',
      description: 'An award-winning musical composition',
      licenses: [
        { id: 4, name: 'License 4', licensee: 'Company W', value: 7500, currency: 'GBP' },
        { id: 5, name: 'License 5', licensee: 'Company V', value: 6000, currency: 'GBP' },
      ],
    },
  ]




const myLicenses: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredIPs = mockIPsWithLicenses.filter(ip => 
    (ip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ip.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === '' || ip.type === selectedType)
  )


  return (
    <>
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          
    
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My IP Licensing</h1>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search IPs or licenses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative w-full sm:w-64">
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none  "
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Patent">Patent</option>
              <option value="Trademark">Trademark</option>
              <option value="Copyright">Copyright</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredIPs.map((ip) => (
            <div key={ip.id} className="bg-base-100 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{ip.name}</h2>
                <p className="text-sm text-blue-600 mb-4">{ip.type}</p>
                <p className="mb-4">{ip.description}</p>
                <div className="space-y-2 py-5">
                  {ip.licenses.map((license) => (
                    <Link key={license.id} href={`/viewLicense`} className="block">
                      <div className="flex justify-between items-center p-2 rounded border transition duration-300">
                        <span>{license.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {license.value} {license.currency}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className=" px-6 py-4 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/viewIP`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  transition duration-300">
                    <Eye className="w-4 h-4 mr-1" />
                    View IP
                  </Link>
                  <Link href={`/licensingIP`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  transition duration-300">
                    <Plus className="w-4 h-4 mr-1" />
                    New License
                  </Link>
                  <Link href={`/viewIP`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  transition duration-300">
                    <LinkIcon className="w-4 h-4 mr-1" />
                    View Licenses
                  </Link>
                  <Link href={`/transfersIP`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  transition duration-300">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Transfers IP
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>


        )}


    </div>  
    </>
  );
};

export default myLicenses;
