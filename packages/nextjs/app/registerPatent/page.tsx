"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, Lightbulb, User, Calendar, Tag, FileText, Globe, Copyright, Briefcase } from 'lucide-react'

const mockData = [
  { id: 1, title: 'Quantum Encryption Device', inventor: 'Dr. Emily Chen', filingDate: '2023-05-15', status: 'Pending', type: 'Utility' },
  { id: 2, title: 'Nano-scale Energy Harvester', inventor: 'Prof. James Wilson', filingDate: '2023-04-20', status: 'Approved', type: 'Utility' },
  { id: 3, title: 'AI-powered Climate Prediction System', inventor: 'Dr. Maria Garcia', filingDate: '2023-06-10', status: 'Under Review', type: 'Software' },
]



const registerPatent: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const [formData, setFormData] = useState({
    title: '',
    inventor: '',
    filingDate: '',
    description: '',
    claims: '',
    patentType: 'Utility',
    assignee: '',
    applicationNumber: '',
    publicationNumber: '',
    priorityDate: '',
    examinationStatus: '',
    attorney: '',
    drawings: '',
    ipcClassification: '',
    priorArt: '',
    abstract: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Patent registration successful!')
    setFormData({
      title: '',
      inventor: '',
      filingDate: '',
      description: '',
      claims: '',
      patentType: 'Utility',
      assignee: '',
      applicationNumber: '',
      publicationNumber: '',
      priorityDate: '',
      examinationStatus: '',
      attorney: '',
      drawings: '',
      ipcClassification: '',
      priorArt: '',
      abstract: '',
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
            <h1 className="text-3xl font-extrabold mb-8">Patent Registration</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-base-100 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Register New Patent</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium ">Patent Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="inventor" className="block text-sm font-medium ">Inventor(s)</label>
                    <input
                      type="text"
                      id="inventor"
                      name="inventor"
                      value={formData.inventor}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="filingDate" className="block text-sm font-medium ">Filing Date</label>
                    <input
                      type="date"
                      id="filingDate"
                      name="filingDate"
                      value={formData.filingDate}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="patentType" className="block text-sm font-medium ">Patent Type</label>
                    <select
                      id="patentType"
                      name="patentType"
                      value={formData.patentType}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="Utility">Utility</option>
                      <option value="Design">Design</option>
                      <option value="Plant">Plant</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="assignee" className="block text-sm font-medium ">Assignee</label>
                    <input
                      type="text"
                      id="assignee"
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="applicationNumber" className="block text-sm font-medium ">Application Number</label>
                    <input
                      type="text"
                      id="applicationNumber"
                      name="applicationNumber"
                      value={formData.applicationNumber}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="publicationNumber" className="block text-sm font-medium ">Publication Number</label>
                    <input
                      type="text"
                      id="publicationNumber"
                      name="publicationNumber"
                      value={formData.publicationNumber}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="priorityDate" className="block text-sm font-medium ">Priority Date</label>
                    <input
                      type="date"
                      id="priorityDate"
                      name="priorityDate"
                      value={formData.priorityDate}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="examinationStatus" className="block text-sm font-medium ">Examination Status</label>
                    <input
                      type="text"
                      id="examinationStatus"
                      name="examinationStatus"
                      value={formData.examinationStatus}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="attorney" className="block text-sm font-medium ">Patent Attorney</label>
                    <input
                      type="text"
                      id="attorney"
                      name="attorney"
                      value={formData.attorney}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="claims" className="block text-sm font-medium ">Claims</label>
                    <textarea
                      id="claims"
                      name="claims"
                      value={formData.claims}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="drawings" className="block text-sm font-medium ">Drawings (URLs, comma-separated)</label>
                    <input
                      type="text"
                      id="drawings"
                      name="drawings"
                      value={formData.drawings}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="ipcClassification" className="block text-sm font-medium ">IPC Classification</label>
                    <input
                      type="text"
                      id="ipcClassification"
                      name="ipcClassification"
                      value={formData.ipcClassification}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="priorArt" className="block text-sm font-medium ">Prior Art</label>
                    <textarea
                      id="priorArt"
                      name="priorArt"
                      value={formData.priorArt}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="abstract" className="block text-sm font-medium ">Abstract</label>
                    <textarea
                      id="abstract"
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register Patent
                  </button>
                </form>
              </div>

              <div>
              <div className="bg-base-100 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Registered Patents</h2>
                <ul className="space-y-4">
                  {mockData.map((item) => (
                    <li key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lightbulb className="h-5 w-5 text-indigo-500 mr-2" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{item.status}</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span>{item.inventor}</span>
                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                        <span>{item.filingDate}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{item.type}</span>
                      </div>
                    </li>
                  ))}
                </ul>
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

export default registerPatent;
