"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, FileText, User, Calendar, Tag, Globe, Copyright, FileType, Lock } from 'lucide-react'

const mockData = [
  { id: 1, title: 'Fine Art Print', author: 'Leonardo Dali', date: '2023-12-31', type: 'Painting', medium: 'Confidential' },
  { id: 2, title: 'Illustration The Pirate', author: 'Kung Fu Tsu', date: '2023-06-15', type: 'Illustration', medium: 'Internal' },
  { id: 3, title: 'Cover Arte The Batman 21', author: 'Fred Muller', date: '2023-07-01', type: 'Digital Art', medium: 'Restricted' },
]




const registerArt: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    ArtType: '',
    description: '',
    version: '',
    department: '',
    medium: '',
    fileUrl: '',
    tags: '',
    collection: '',
    creationDate: '',
    language: '',
    reviewStatus: '',
    approvedBy: '',
    lastModified: '',
    fileFormat: '',
    fileSize: '',
    copyright: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Art registration successful!')
    setFormData({
      title: '',
      author: '',
      date: '',
      ArtType: '',
      description: '',
      version: '',
      department: '',
      medium: '',
      fileUrl: '',
      tags: '',
      collection: '',
      creationDate: '',
      language: '',
      reviewStatus: '',
      approvedBy: '',
      lastModified: '',
      fileFormat: '',
      fileSize: '',
      copyright: '',
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
        <h1 className="text-3xl font-extrabold mb-8">Art Registration</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Register New Artwork</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium ">Art Title</label>
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
                <label htmlFor="author" className="block text-sm font-medium ">Author/Creator</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium ">Creation Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="ArtType" className="block text-sm font-medium ">Art Type</label>
                <input
                  type="text"
                  id="ArtType"
                  name="ArtType"
                  value={formData.ArtType}
                  onChange={handleChange}
                  required
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
                <label htmlFor="version" className="block text-sm font-medium ">Version</label>
                <input
                  type="text"
                  id="version"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium ">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="medium" className="block text-sm font-medium ">Medium</label>
                <select
                  id="medium"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  required
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select Medium</option>
                  <option value="Oil Painting">Oil Painting</option>
                  <option value="Acrylic Painting">Acrylic Painting</option>
                  <option value="AI Generated">AI Generated</option>
                  <option value="Watercolor">Watercolor</option>
                   <option value="Digital Art">Digital Art</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Photography">Photography</option>
                  <option value="Mixed Media">Mixed Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="fileUrl" className="block text-sm font-medium ">File URL</label>
                <input
                  type="url"
                  id="fileUrl"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleChange}
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium ">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Comma-separated tags"
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="collection" className="block text-sm font-medium ">Collection</label>
                <input
                  type="text"
                  id="collection"
                  name="collection"
                  value={formData.collection}
                  onChange={handleChange}
                  placeholder="Inform a Collection"
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium ">Language</label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label htmlFor="copyright" className="block text-sm font-medium ">Copyright Information</label>
                <input
                  type="text"
                  id="copyright"
                  name="copyright"
                  value={formData.copyright}
                  onChange={handleChange}
                  className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register Art
              </button>
            </form>
          </div>

          <div>
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Arts</h2>
            <ul className="space-y-4">
              {mockData.map((item) => (
                <li key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.type}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span>{item.author}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Lock className="h-4 w-4 mr-1" />
                    <span>{item.medium}</span>
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

export default registerArt;
