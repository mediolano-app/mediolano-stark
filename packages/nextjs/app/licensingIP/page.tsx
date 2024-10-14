"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";
import { Shield, DollarSign, Link, Copy, ChevronRight } from 'lucide-react'

// Mocked data for existing intellectual property
const mockIPs = [
  { id: 1, name: 'Patent A', type: 'Patent' },
  { id: 2, name: 'Trademark B', type: 'Trademark' },
  { id: 3, name: 'Copyright C', type: 'Copyright' },
  { id: 4, name: 'Trade Secret D', type: 'Trade Secret' },
]

// Mocked data for existing licenses
const mockLicenses = [
  { id: 1, name: 'License 1', ipName: 'Patent A', licensee: 'Company X', value: 10000, currency: 'USD' },
  { id: 2, name: 'License 2', ipName: 'Trademark B', licensee: 'Company Y', value: 5000, currency: 'EUR' },
  { id: 3, name: 'License 3', ipName: 'Copyright C', licensee: 'Company Z', value: 7500, currency: 'GBP' },
]




const licensingIP: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const [selectedIP, setSelectedIP] = useState(null)
  const [formData, setFormData] = useState({
    licenseName: '',
    startDate: '',
    endDate: '',
    licenseType: '',
    territory: '',
    useOfRights: '',
    value: '',
    currency: 'USD',
    recipient: '',
    licenseTerms: '',
  })

  const handleIPSelection = (ip) => {
    setSelectedIP(ip)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleCreateLicense = (e) => {
    e.preventDefault()
    // Handle license creation logic here
    console.log('Creating license for:', selectedIP)
    console.log('Form data:', formData)
  }

  const handleCloneLicense = (license) => {
    setFormData({
      licenseName: `Copy of ${license.name}`,
      startDate: '',
      endDate: '',
      licenseType: '',
      territory: '',
      useOfRights: '',
      value: license.value.toString(),
      currency: license.currency,
      recipient: license.licensee,
      licenseTerms: '',
    })
  }



  return (
    <>
      
      
      
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          

          <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">IP Licensing</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Licensing Form Column */}
            <div className="bg-base-100  shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Create New License</h2>
              <form onSubmit={handleCreateLicense} className="space-y-4">
                <div>
                  <label htmlFor="ipSelect" className="block text-sm font-medium mb-1">
                    Select Intellectual Property
                  </label>
                  <select
                    id="ipSelect"
                    name="ipSelect"
                    onChange={(e) => handleIPSelection(mockIPs.find(ip => ip.id === parseInt(e.target.value)))}
                    className="w-full rounded input input-bordered bg-base-300"
                  >
                    <option value="">Select an IP</option>
                    {mockIPs.map((ip) => (
                      <option key={ip.id} value={ip.id}>
                        {ip.name} ({ip.type})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="licenseName" className="block text-sm font-medium mb-1">
                    License Name
                  </label>
                  <input
                    type="text"
                    id="licenseName"
                    name="licenseName"
                    value={formData.licenseName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded input input-bordered bg-base-300 "
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded input input-bordered bg-base-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded input input-bordered bg-base-300"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="licenseType" className="block text-sm font-medium mb-1">
                    License Type
                  </label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded input input-bordered bg-base-300"
                  >
                    <option value="">Select a license type</option>
                    <option value="exclusive">Exclusive</option>
                    <option value="non-exclusive">Non-exclusive</option>
                    <option value="sole">Sole</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="territory" className="block text-sm font-medium mb-1">
                    Territory
                  </label>
                  <input
                    type="text"
                    id="territory"
                    name="territory"
                    value={formData.territory}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Worldwide, North America, Europe"
                    className="w-full rounded input input-bordered bg-base-300"
                  />
                </div>
                <div>
                  <label htmlFor="useOfRights" className="block text-sm font-medium mb-1">
                    Use of Rights
                  </label>
                  <input
                    type="text"
                    id="useOfRights"
                    name="useOfRights"
                    value={formData.useOfRights}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Manufacturing, Distribution, Sublicensing"
                    className="w-full rounded input input-bordered bg-base-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="value" className="block text-sm font-medium mb-1">
                      License Fee
                    </label>
                    <input
                      type="number"
                      id="value"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter license fee"
                      className="w-full rounded input input-bordered bg-base-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium mb-1">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded input input-bordered bg-base-300"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                      <option value="CNY">CNY</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium mb-1">
                    Contracting Recipient
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter recipient name or company"
                    className="w-full rounded input input-bordered bg-base-300"
                  />
                </div>
                <div>
                  <label htmlFor="licenseTerms" className="block text-sm font-medium mb-1">
                    License Terms
                  </label>
                  <textarea
                    id="licenseTerms"
                    name="licenseTerms"
                    value={formData.licenseTerms}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Enter detailed license terms and conditions"
                    className="w-full rounded input input-bordered bg-base-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 input input-bordered"
                >
                  Create License
                </button>
              </form>
            </div>
  
            {/* Existing Licenses Column */}
            <div className="bg-base-300 shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Recent Licenses</h2>
              <div className="space-y-4">
                {mockLicenses.map((license) => (
                  <div key={license.id} className="flex items-center justify-between p-4 bg-base-100 rounded-md">
                    <div>
                      <h3 className="font-semibold">{license.name}</h3>
                      <p className="text-sm  ">
                        {license.ipName} - {license.licensee}
                      </p>
                      <p className="text-sm  ">
                        {license.value} {license.currency}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCloneLicense(license)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <Copy className="w-5 h-5" />
                      <span className="sr-only">Clone License</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a
                  href="/myLicenses"
                  className="inline-flex items-center px-4 py-2 border hover:bg-primary text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Show More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        
        </div>


      


        )}



      </div>

    </>
  );
};

export default licensingIP;
