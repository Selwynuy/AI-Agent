import React from 'react';
import AgentMessages from './messages';
import Navbar from '../../../src/src/components/layout/Navbar';

// Mock data fetch (replace with real fetch in production)
async function getAgent(id: string) {
  return {
    id,
    name: 'Jane Doe',
    avatarUrl: '/public/logo192.png',
    bio: 'Experienced real estate agent specializing in downtown properties.',
    location: 'New York, NY',
    language: 'English, Spanish',
    experience: '10 years',
    email: 'jane@example.com',
    phone: '+1 (555) 123-4567',
    specialties: ['Downtown Properties', 'Luxury Homes', 'Investment Properties'],
    rating: 4.8,
    reviews: 127,
  };
}

async function getListings(agentId: string) {
  return [
    {
      id: '1',
      title: 'Modern Loft',
      image: '/public/logo512.png',
      price: '$1,200,000',
      location: 'Downtown',
      beds: 2,
      baths: 2,
      sqft: 1200,
    },
    {
      id: '2',
      title: 'Cozy Studio',
      image: '/public/logo192.png',
      price: '$650,000',
      location: 'Midtown',
      beds: 1,
      baths: 1,
      sqft: 750,
    },
  ];
}

export default async function AgentProfilePage({ params }: { params: { id: string } }) {
  const agent = await getAgent(params.id);
  const listings = await getListings(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Agent Avatar */}
            <div className="relative">
              <img 
                src={agent.avatarUrl} 
                alt={agent.name} 
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl" 
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
                Online
              </div>
            </div>
            
            {/* Agent Info */}
            <div className="text-center lg:text-left text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{agent.name}</h1>
              <p className="text-xl text-blue-100 mb-4">{agent.bio}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">⭐</span>
                  <span>{agent.rating} ({agent.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">📍</span>
                  <span>{agent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">🗣️</span>
                  <span>{agent.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">⏰</span>
                  <span>{agent.experience} experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {agent.name}</h2>
              <p className="text-gray-600 mb-6">{agent.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                  <p className="text-gray-600">{agent.language}</p>
                </div>
              </div>
            </div>

            {/* Listings Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Listings by {agent.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map(listing => (
                  <div key={listing.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{listing.title}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-2">{listing.price}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>{listing.beds} beds</span>
                        <span>{listing.baths} baths</span>
                        <span>{listing.sqft} sqft</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{listing.location}</p>
                      <a 
                        href={`/properties/${listing.id}`} 
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Messages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <AgentMessages />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact {agent.name}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter your email" 
                    type="email" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter your phone" 
                    type="tel" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Tell us about your needs..." 
                    rows={4}
                    required 
                  />
                </div>
                <button 
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors" 
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📧</span>
                  <span className="text-gray-700">{agent.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📞</span>
                  <span className="text-gray-700">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📍</span>
                  <span className="text-gray-700">{agent.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Properties Sold</span>
                  <span className="font-bold text-gray-900">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Days on Market</span>
                  <span className="font-bold text-gray-900">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Client Satisfaction</span>
                  <span className="font-bold text-green-600">{agent.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 