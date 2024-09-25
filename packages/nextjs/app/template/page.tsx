"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import Link from 'next/link'
import { useState } from 'react'

const templateDapp: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  
  const [formData, setFormData] = useState({
    text: '',
    number: '',
    email: '',
    password: '',
    textarea: '',
    select: '',
    switch: false,
    checkbox: false,
    radio: '',
    slider: 50,
    file: null,
    date: '',
    time: '',
    color: '#000000',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'file' ? (e.target as HTMLInputElement).files?.[0] : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
    // Here you would typically process the form data
  }

  return (
    <>
      
      
      
      <div className="flex justify-center flex-col pt-10" >


      <div className="flex items-center flex-col flex-grow pt-10">
        <h1 className="text-center mb-4">
          <span className="block text-4xl font-bold">Template Settings</span>
        </h1>
    </div>



        {!isConnected || isConnecting ? (
          <CustomConnectButton />
        ) : (
         

      <div className="container py-12 max-w-7xl mx-auto">

    

<div className="max-w-2xl mx-auto bg-base-100 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Template Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block mb-1 capitalize">{key}</label>
            {(() => {
              switch (key) {
                case 'textarea':
                  return (
                    <textarea
                      id={key}
                      name={key}
                      value={value as string}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                  )
                case 'select':
                  return (
                    <select
                      id={key}
                      name={key}
                      value={value as string}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select an option</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  )
                case 'switch':
                case 'checkbox':
                  return (
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={value as boolean}
                      onChange={handleChange}
                    />
                  )
                case 'radio':
                  return (
                    <div>
                      {['option1', 'option2', 'option3'].map((option) => (
                        <label key={option} className="mr-4">
                          <input
                            type="radio"
                            name={key}
                            value={option}
                            checked={value === option}
                            onChange={handleChange}
                          />
                          {' '}{option}
                        </label>
                      ))}
                    </div>
                  )
                case 'slider':
                  return (
                    <input
                      type="range"
                      id={key}
                      name={key}
                      value={value as number}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  )
                case 'file':
                  return (
                    <input
                      type="file"
                      id={key}
                      name={key}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  )
                default:
                  return (
                    <input
                      type={key === 'password' ? 'password' : key === 'email' ? 'email' : key === 'number' ? 'number' : key}
                      id={key}
                      name={key}
                      value={value as string}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  )
              }
            })()}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Form
        </button>
      </form>
    </div>
          

        </div>


        )}
      </div>



      
    </>
  );
};

export default templateDapp;
