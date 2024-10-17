"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { notification } from "~~/utils/scaffold-stark";
import { useState } from "react";

import Link from 'next/link'
import { ArrowLeft, Music, User, Calendar, Tag, Disc, Users, MapPin, Copyright, Link as LinkIcon } from 'lucide-react'

const mockData = [
  { id: 1, title: 'Harmony in G', artist: 'Alice Wonder', album: 'Classical Wonders', releaseDate: '2023-05-15', genre: 'Classical' },
  { id: 2, title: 'Electric Dreams', artist: 'Neon Nights', album: 'Synthwave Anthology', releaseDate: '2023-04-20', genre: 'Electronic' },
  { id: 3, title: 'Acoustic Sunrise', artist: 'Melody Makers', album: 'Morning Serenity', releaseDate: '2023-05-10', genre: 'Folk' },
]




const registerMusic: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();


  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    releaseDate: '',
    genre: '',
    composer: '',
    band: '',
    recordLabel: '',
    location: '',
    copyright: '',
    terms: '',
    fileLink: '',
    lyrics: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Music registration successful!')
    setFormData({
      title: '',
      artist: '',
      album: '',
      releaseDate: '',
      genre: '',
      composer: '',
      band: '',
      recordLabel: '',
      location: '',
      copyright: '',
      terms: '',
      fileLink: '',
      lyrics: '',
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
        <h1 className="text-3xl font-extrabold  mb-8">Music Template</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Register your Music</h2>
            <p>Your intellectual property will be registered with the information you provided.</p>
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
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="artist" className="block text-sm font-medium ">Artist</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="album" className="block text-sm font-medium ">Album</label>
                <input
                  type="text"
                  id="album"
                  name="album"
                  value={formData.album}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="composer" className="block text-sm font-medium ">Composer</label>
                <input
                  type="text"
                  id="composer"
                  name="composer"
                  value={formData.composer}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="band" className="block text-sm font-medium ">Band</label>
                <input
                  type="text"
                  id="band"
                  name="band"
                  value={formData.band}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="recordLabel" className="block text-sm font-medium ">Record Label</label>
                <input
                  type="text"
                  id="recordLabel"
                  name="recordLabel"
                  value={formData.recordLabel}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium ">Recording Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
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
                <label htmlFor="terms" className="block text-sm font-medium ">Terms of Use</label>
                <textarea
                  id="terms"
                  name="terms"
                  value={formData.terms}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div>
                <label htmlFor="fileLink" className="block text-sm font-medium ">Link to File</label>
                <input
                  type="url"
                  id="fileLink"
                  name="fileLink"
                  value={formData.fileLink}
                  onChange={handleChange}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="lyrics" className="block text-sm font-medium ">Lyrics</label>
                <textarea
                  id="lyrics"
                  name="lyrics"
                  value={formData.lyrics}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full input bg-base-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register Music
              </button>
            </form>
          </div>

          

          <div className="">
            <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h4 className="text-xm">Marketplace</h4>
            <h2 className="text-xl font-semibold mb-10">Recent added Music</h2>
            
            <ul className="space-y-4">
              {mockData.map((item) => (
                <li key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Music className="h-5 w-5 text-accent mr-2" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-sm text-accent">{item.genre}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-neutral">
                    <User className="h-4 w-4 mr-1" />
                    <span>{item.artist}</span>
                    <Disc className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.album}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>{item.releaseDate}</span>
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

export default registerMusic;
