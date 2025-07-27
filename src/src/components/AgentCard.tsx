import React from 'react';
import Link from 'next/link';

interface AgentCardProps {
  avatarUrl: string;
  name: string;
  location: string;
  language: string;
  experience: string;
  profileUrl: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  avatarUrl,
  name,
  location,
  language,
  experience,
  profileUrl,
}) => (
  <div className="group relative bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden max-w-xs mx-auto" style={{minWidth: '220px'}}>
    {/* Top Section - Profile Image with Margins */}
    <div className="relative h-82 w-full bg-muted p-5">
      <img 
        src={avatarUrl} 
        alt={name} 
        className="w-full h-full object-cover object-center rounded-xl"
        loading="lazy"
      />
      {/* Bookmark Icon */}
      <button className="absolute top-3 right-3 w-7 h-7 bg-gray-800/80 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-200">
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      </button>
    </div>
    
    {/* Middle Section - Agent Info */}
    <div className="p-5">
      {/* Name and Verified Badge */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-base font-bold text-card-foreground">{name}</h3>
        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Title/Description */}
      <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
        Experienced real estate agent specializing in {location} properties with {experience} of expertise.
      </p>
      
      {/* Stats Row */}
      <div className="flex items-center justify-between py-3 border-t border-border">
        {/* Rating */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-1 mb-1">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-card-foreground text-xs">4.8</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Rating</span>
        </div>
        
        {/* Separator */}
        <div className="w-px h-6 bg-border"></div>
        
        {/* Properties Sold */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-1 mb-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-card-foreground text-xs">47</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Sold</span>
        </div>
        
        {/* Separator */}
        <div className="w-px h-6 bg-border"></div>
        
        {/* Experience */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-1 mb-1">
            <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-card-foreground text-xs">{experience}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Experience</span>
        </div>
      </div>
    </div>
    
    {/* Bottom Section - Call to Action */}
    <div className="px-5 pb-5">
      <Link 
        href={profileUrl}
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium text-center block hover:opacity-90 transition-opacity"
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default AgentCard; 