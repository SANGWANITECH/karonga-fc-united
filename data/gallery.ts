export interface GalleryImage {
    id: string
    src: string
    title: string
    category: 'Match Action' | 'Training' | 'Fans' | 'Team'
    size?: 'large' | 'wide' | 'normal'  // for bento layout
  }
  
  export const galleryImages: GalleryImage[] = [
    {
      id: 'g1',
      src: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1000&q=80',
      title: 'The Deciding Strike',
      category: 'Match Action',
      size: 'large',
    },
    {
      id: 'g2',
      src: '/images/players/player8.jpg',
      title: 'United Front',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g3',
      src: '/images/players/player13.jpg',
      title: 'Focus & Fire',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g4',
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&q=80',
      title: 'Roar of the Crocs',
      category: 'Fans',
      size: 'wide',
    },
    {
      id: 'g5',
      src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1000&q=80',
      title: 'Matchday Energy',
      category: 'Fans',
      size: 'normal',
    },
    {
      id: 'g6',
      src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1800&q=85',
      title: 'Sharpening The Edge',
      category: 'Training',
      size: 'normal',
    },
    {
      id: 'g7',
      src: '/images/players/player9.jpg',
      title: 'Wing Wizard',
      category: 'Match Action',
      size: 'normal',
    },
    {
      id: 'g8',
      src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1000&q=80',
      title: 'Ground Work',
      category: 'Training',
      size: 'wide',
    },
    {
      id: 'g9',
      src: '/images/players/player3.jpg',
      title: 'The Wall',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g10',
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&q=80',
      title: 'Under The Lights',
      category: 'Match Action',
      size: 'normal',
    },
    {
      id: 'g11',
      src: '/images/players/player1.jpg',
      title: 'Last Line',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g12',
      src: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1000&q=80',
      title: 'Crowd Colours',
      category: 'Fans',
      size: 'normal',
    },
  ]