import React from 'react';
import AgentCard from '../../src/src/components/AgentCard';
import Navbar from '../../src/src/components/layout/Navbar';

// Mock agents data - expanded to 16 agents for 4x4 grid
const agents = [
  {
    id: '1',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Carlos Mendoza',
    location: 'Makati City',
    language: 'English, Filipino',
    experience: '8+ years',
    profileUrl: '/agents/1',
  },
  {
    id: '2',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Maria Santos',
    location: 'Quezon City',
    language: 'English, Filipino',
    experience: '5+ years',
    profileUrl: '/agents/2',
  },
  {
    id: '3',
    avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'John Lee',
    location: 'Taguig City',
    language: 'English, Chinese',
    experience: '10+ years',
    profileUrl: '/agents/3',
  },
  {
    id: '4',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    name: 'Sarah Johnson',
    location: 'Manila',
    language: 'English, Spanish',
    experience: '7+ years',
    profileUrl: '/agents/4',
  },
  {
    id: '5',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'David Chen',
    location: 'Pasig City',
    language: 'English, Mandarin',
    experience: '12+ years',
    profileUrl: '/agents/5',
  },
  {
    id: '6',
    avatarUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
    name: 'Emily Rodriguez',
    location: 'Marikina City',
    language: 'English, Filipino',
    experience: '6+ years',
    profileUrl: '/agents/6',
  },
  {
    id: '7',
    avatarUrl: 'https://randomuser.me/api/portraits/men/89.jpg',
    name: 'Michael Wong',
    location: 'Mandaluyong City',
    language: 'English, Cantonese',
    experience: '9+ years',
    profileUrl: '/agents/7',
  },
  {
    id: '8',
    avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    name: 'Lisa Thompson',
    location: 'San Juan City',
    language: 'English, French',
    experience: '11+ years',
    profileUrl: '/agents/8',
  },
  {
    id: '9',
    avatarUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
    name: 'Robert Garcia',
    location: 'Caloocan City',
    language: 'English, Filipino',
    experience: '4+ years',
    profileUrl: '/agents/9',
  },
  {
    id: '10',
    avatarUrl: 'https://randomuser.me/api/portraits/women/78.jpg',
    name: 'Jennifer Kim',
    location: 'Malabon City',
    language: 'English, Korean',
    experience: '8+ years',
    profileUrl: '/agents/10',
  },
  {
    id: '11',
    avatarUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
    name: 'Anthony Martinez',
    location: 'Navotas City',
    language: 'English, Spanish',
    experience: '6+ years',
    profileUrl: '/agents/11',
  },
  {
    id: '12',
    avatarUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
    name: 'Amanda Wilson',
    location: 'Valenzuela City',
    language: 'English, Filipino',
    experience: '7+ years',
    profileUrl: '/agents/12',
  },
  {
    id: '13',
    avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
    name: 'Christopher Brown',
    location: 'Las Piñas City',
    language: 'English, German',
    experience: '9+ years',
    profileUrl: '/agents/13',
  },
  {
    id: '14',
    avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: 'Nicole Davis',
    location: 'Muntinlupa City',
    language: 'English, Italian',
    experience: '5+ years',
    profileUrl: '/agents/14',
  },
  {
    id: '15',
    avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: 'Daniel Taylor',
    location: 'Parañaque City',
    language: 'English, Portuguese',
    experience: '10+ years',
    profileUrl: '/agents/15',
  },
  {
    id: '16',
    avatarUrl: 'https://randomuser.me/api/portraits/women/89.jpg',
    name: 'Rachel Anderson',
    location: 'Pasay City',
    language: 'English, Japanese',
    experience: '8+ years',
    profileUrl: '/agents/16',
  },
];

const AgentsDirectoryPage: React.FC = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Our Agents</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet our experienced real estate professionals who are here to help you find your perfect property
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map(agent => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </div>
  </div>
);

export default AgentsDirectoryPage; 