"use client";

import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation' 

export interface FormData {
    title: string,
    briefDescription: string,
    detailedDescription: string,
    // date: Date | null,
    date: string,
    authors: Array<string>,
}

export default function IntellectualPropertyForm(){
    const router = useRouter()

    const [formData, setFormData] = useState<FormData>({
        title: '',
        briefDescription: '',
        detailedDescription: '',
        date: '',
        authors: [],
    })

    const [errors, setErrors] = useState<Partial<FormData>>({})

    const[count, setCount] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // const validateForm = (): boolean => {
    //     const newErrors: Partial<FormData> = {}
    //     if (formData.title.length < 2) {
    //       newErrors.title = "Title must be at least 2 characters."
    //     }
    //     if (formData.briefDescription.length < 10) {
    //       newErrors.briefDescription = "Brief description must be at least 10 characters."
    //     }
    //     if (formData.detailedDescription.length < 50) {
    //       newErrors.detailedDescription = "Detailed description must be at least 50 characters."
    //     }
    //     if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
    //       newErrors.date = "Please enter a valid date in YYYY-MM-DD format."
    //     }
    //     if (formData.authors.length < 2) {
    //       newErrors.authors = "Please enter at least one author."
    //     }
    //     setErrors(newErrors)
    //     return Object.keys(newErrors).length === 0
    //   }
    
    const getNextSubmissionId = () => {
      setCount(count + 1)
      return count 
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // if (validateForm()) {
        //   console.log(formData)
        //   alert("Form submitted successfully!")
        //   // Here you would typically send the form data to your backend
        // }

        const id = getNextSubmissionId()
        router.push(`/register/${id}`)

      }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Intellectual Property Submission</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title of Intellectual Property
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
            placeholder="Enter the title"
          />
          {/* {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>} */}
        </div>

        <div>
          <label htmlFor="briefDescription" className="block text-sm font-medium text-gray-700">
            Brief Description
          </label>
          <textarea
            id="briefDescription"
            name="briefDescription"
            value={formData.briefDescription}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter a brief description"
          />
          {/* {errors.briefDescription && <p className="mt-1 text-sm text-red-600">{errors.briefDescription}</p>} */}
        </div>

        <div>
          <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700">
            Detailed Description
          </label>
          <textarea
            id="detailedDescription"
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter a detailed description"
          />
          {/* {errors.detailedDescription && <p className="mt-1 text-sm text-red-600">{errors.detailedDescription}</p>} */}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date of Intellectual Property
          </label>
          <input
            type="date"
            id="date"
            name="date"
            // value={formData.date ? formData.date.toISOString() : ''}
            // onChange={(e) => setFormData(prev => ({
            //   ...prev,
            //   date: e.target.value ? new Date(e.target.value) : null
            // }))}
            value = {formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {/* {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>} */}
        </div>

        <div>
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
            Authors
          </label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter author names, separated by commas"
          />
          {/* {errors.authors && <p className="mt-1 text-sm text-red-600">{errors.authors}</p>} */}
        </div>

        <button
          // onClick={route}
          type="submit" 
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}