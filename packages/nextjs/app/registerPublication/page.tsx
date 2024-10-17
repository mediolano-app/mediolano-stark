"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, FileText, Book, Calendar, User, Tag, Globe, Copyright, Image as ImageIcon } from 'lucide-react'

const mockData = [
  { id: 1, type: 'Article', title: 'The Future of AI', author: 'John Doe', date: '2023-05-15', publisher: 'Tech Insights', category: 'Technology' },
  { id: 2, type: 'Publication', title: 'Quantum Computing: A Comprehensive Guide', author: 'Jane Smith', date: '2023-04-20', publisher: 'Science Today', category: 'Science' },
  { id: 3, type: 'Article', title: 'Blockchain Revolution', author: 'Alice Johnson', date: '2023-05-10', publisher: 'Crypto Weekly', category: 'Finance' },
]





const registerPublication: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();



  const [formData, setFormData] = useState({
    type: 'Article',
    title: '',
    author: '',
    date: '',
    publisher: '',
    category: '',
    tags: '',
    content: '',
    featureImage: '',
    license: '',
    copyright: '',
    doi: '',
    abstract: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Registration successful!')
    setFormData({
      type: 'Article',
      title: '',
      author: '',
      date: '',
      publisher: '',
      category: '',
      tags: '',
      content: '',
      featureImage: '',
      license: '',
      copyright: '',
      doi: '',
      abstract: '',
    })
  }
  

  return (
    <>
     
     
     <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">

        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

          <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/registerIP" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          IP Templates
        </Link>
        <h1 className="text-3xl font-extrabold mb-8">Articles & Publications</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Register New Article or Publication</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium ">Type</label>
                <select
                  
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Article">Article</option>
                  <option value="Publication">Publication</option>
                </select>
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium ">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium ">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium ">Publication Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="publisher" className="block text-sm font-medium ">Publisher</label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium ">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium ">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium ">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div>
                <label htmlFor="featureImage" className="block text-sm font-medium ">Feature Image URL</label>
                <input
                  type="url"
                  id="featureImage"
                  name="featureImage"
                  value={formData.featureImage}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="license" className="block text-sm font-medium ">License</label>
                <input
                  type="text"
                  id="license"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="copyright" className="block text-sm font-medium ">Copyright</label>
                <input
                  type="text"
                  id="copyright"
                  name="copyright"
                  value={formData.copyright}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="doi" className="block text-sm font-medium ">DOI (Digital Object Identifier)</label>
                <input
                  type="text"
                  id="doi"
                  name="doi"
                  value={formData.doi}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="abstract" className="block text-sm font-medium ">Abstract</label>
                <textarea
                  id="abstract"
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </form>
          </div>


          <div>
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Articles & Publications</h2>
            <ul className="space-y-4">
              {mockData.map((item) => (
                <li key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.type === 'Article' ? (
                        <FileText className="h-5 w-5 text-accent mr-2" />
                      ) : (
                        <Book className="h-5 w-5 text-accent mr-2" />
                      )}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-sm text-neutral">{item.type}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-neutral">
                    <User className="h-4 w-4 mr-1" />
                    <span>{item.author}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-neutral">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{item.publisher}</span>
                    <Tag className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.category}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a className="btn mt-10" href="#">Open Listing</a>

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

export default registerPublication;
