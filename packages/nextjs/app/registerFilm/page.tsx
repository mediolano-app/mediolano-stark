"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, Film, User, Calendar, Clock, Tag, Globe, Copyright, Image as ImageIcon, Users, Star } from 'lucide-react'

const mockData = [
  { id: 1, title: 'The Quantum Paradox', director: 'Sarah Johnson', releaseDate: '2023-07-15', duration: '2h 15m', genre: 'Sci-Fi', rating: '8.5' },
  { id: 2, title: 'Echoes of Tomorrow', director: 'Michael Chang', releaseDate: '2023-06-20', duration: '1h 55m', genre: 'Drama', rating: '7.9' },
  { id: 3, title: 'Beyond the Horizon', director: 'Emma Rodriguez', releaseDate: '2023-08-10', duration: '2h 30m', genre: 'Adventure', rating: '8.2' },
]




const registerFilm: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseDate: '',
    duration: '',
    genre: '',
    synopsis: '',
    cast: '',
    producer: '',
    studio: '',
    country: '',
    language: '',
    rating: '',
    budget: '',
    boxOffice: '',
    awards: '',
    posterUrl: '',
    trailerUrl: '',
    copyright: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Film registration successful!')
    setFormData({
      title: '',
      director: '',
      releaseDate: '',
      duration: '',
      genre: '',
      synopsis: '',
      cast: '',
      producer: '',
      studio: '',
      country: '',
      language: '',
      rating: '',
      budget: '',
      boxOffice: '',
      awards: '',
      posterUrl: '',
      trailerUrl: '',
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
            <h1 className="text-3xl font-extrabold mb-8">Film Registration</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-base-100 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Register New Film</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium ">Title</label>
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
                    <label htmlFor="director" className="block text-sm font-medium ">Director</label>
                    <input
                      type="text"
                      id="director"
                      name="director"
                      value={formData.director}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium ">Release Date</label>
                    <input
                      type="date"
                      id="releaseDate"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium ">Duration</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 2h 15m"
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="genre" className="block text-sm font-medium ">Genre</label>
                    <input
                      type="text"
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      required
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="synopsis" className="block text-sm font-medium ">Synopsis</label>
                    <textarea
                      id="synopsis"
                      name="synopsis"
                      value={formData.synopsis}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="cast" className="block text-sm font-medium ">Cast</label>
                    <input
                      type="text"
                      id="cast"
                      name="cast"
                      value={formData.cast}
                      onChange={handleChange}
                      placeholder="Comma-separated list of main actors"
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="producer" className="block text-sm font-medium ">Producer</label>
                    <input
                      type="text"
                      id="producer"
                      name="producer"
                      value={formData.producer}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="studio" className="block text-sm font-medium ">Studio</label>
                    <input
                      type="text"
                      id="studio"
                      name="studio"
                      value={formData.studio}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium ">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
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
                    <label htmlFor="rating" className="block text-sm font-medium ">Rating</label>
                    <input
                      type="text"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="e.g., PG-13"
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium ">Budget</label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., $100 million"
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="boxOffice" className="block text-sm font-medium ">Box Office</label>
                    <input
                      type="text"
                      id="boxOffice"
                      name="boxOffice"
                      value={formData.boxOffice}
                      onChange={handleChange}
                      placeholder="e.g., $500 million"
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="awards" className="block text-sm font-medium ">Awards</label>
                    <input
                      type="text"
                      id="awards"
                      name="awards"
                      value={formData.awards}
                      onChange={handleChange}
                      placeholder="Comma-separated list of awards"
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="posterUrl" className="block text-sm font-medium ">Poster URL</label>
                    <input
                      type="url"
                      id="posterUrl"
                      name="posterUrl"
                      value={formData.posterUrl}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="trailerUrl" className="block text-sm font-medium ">Trailer URL</label>
                    <input
                      type="url"
                      id="trailerUrl"
                      name="trailerUrl"
                      value={formData.trailerUrl}
                      onChange={handleChange}
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      className="mt-1 input w-full rounded-md bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register Film
                  </button>
                </form>
              </div>
    
              <div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Registered Films</h2>
                <ul className="space-y-4">
                  {mockData.map((item) => (
                    <li key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Film className="h-5 w-5 text-indigo-500 mr-2" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{item.duration}</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span>{item.director}</span>
                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                        <span>{item.releaseDate}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Tag className="h-4 w-4 mr-1" />
                        
                        <span>{item.genre}</span>
                        <Star className="h-4 w-4 ml-4 mr-1" />
                        <span>{item.rating}</span>
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

export default registerFilm;
