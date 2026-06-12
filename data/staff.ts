import type { StaffMember } from '@/types'

// staff[0] = Head Coach (shown in the featured "Technical Leadership" block)
// staff[1...] = Technical Staff (shown in the grid)
export const staff: StaffMember[] = [
  {
    id: 'st1',
    name: 'Audlow Makonyola',
    role: 'Head Coach',
    image: '/images/players/staff1.jpeg',
    bio: 'The man in charge of the Crocodiles on matchday. Coach Makonyola leads the team\'s tactical approach, training, and overall on-pitch identity, instilling the discipline and fighting spirit Karonga United is known for.',
  },
  {
    id: 'st2',
    name: 'Chris Chimkwita',
    role: 'Assistant Coach',
    image: '/images/players/staff2.jpeg',
    bio: 'Supports the head coach in training sessions, match preparation, and player development as part of the senior technical team.',
  },
  {
    id: 'st3',
    name: ' Fortune Mhango',
    role: 'Second Assistant Coach',
    image: '/images/players/staff3.jpeg',
    bio: 'Works alongside the coaching staff to sharpen tactical detail and support the squad through the demands of the season.',
  },
  {
    id: 'st4',
    name: 'Donald Zgambo',
    role: 'Goalkeeper Trainer',
    image: '/images/players/staff4.jpeg',
    bio: 'Dedicated to developing the club\'s goalkeepers — handling, positioning, distribution, and the focus needed to keep clean sheets.',
  },
  {
    id: 'st5',
    name: 'Lloyd Munthali',
    role: 'Fitness Coach',
    image: '/images/players/staff5.jpeg',
    bio: 'Responsible for the physical conditioning of the squad, keeping players strong, sharp, and ready for ninety minutes of competitive football.',
  },
  {
    id: 'st6',
    name: 'Fred Chiwambo',
    role: 'Team Doctor',
    image: '/images/players/staff6.jpeg',
    bio: 'Oversees the medical wellbeing of the squad, managing injury prevention, treatment, and player recovery.',
  },

  {
    id: 'st7',
    name: 'Elick Elalio',
    role: 'Media & Communication Officer',
    image: '/images/players/staff7.jpeg',
    bio: 'Manages the club\'s communications, media relations, and the voice of the Crocodiles across official channels.',
  },
]

// The Executive Committee — shown under "The Executive Team"
export const boardMembers = [
  { id: 'b1', name: 'Alufeyo Chipanga Banda', role: 'President & Technical Director' },
  { id: 'b2', name: 'Kingsley Chibwana', role: 'Vice President' },
  { id: 'b3', name: 'Ramzy Simwaka', role: 'General Secretary' },
  { id: 'b4', name: 'Omar Hussein', role: 'Vice General Secretary' },
  { id: 'b5', name: 'Maupo Kumwenda', role: 'Treasurer' },
  { id: 'b6', name: 'Jembe Bentry', role: 'Vice Treasurer' },
  { id: 'b7', name: 'Matchona Ngwira', role: 'Executive Member' },
  { id: 'b8', name: 'Shadrick Kisyombe', role: 'Executive Member' },
  { id: 'b9', name: 'Anderson Mwakyelu', role: 'Executive Member' },
  { id: 'b10', name: 'Raphael Mwakyajala', role: 'Executive Member' },
  { id: 'b11', name: 'Davilis Mwale', role: 'Executive Member' },
  { id: 'b12', name: 'McClellan Kaponda', role: 'Executive Member' },
  { id: 'b13', name: 'Eston Mwambuli', role: 'Executive Member' },
  { id: 'b14', name: 'Limbani Chinyanga', role: 'Executive Member' },
]
