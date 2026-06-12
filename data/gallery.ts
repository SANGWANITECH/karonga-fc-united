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
      src: '/images/gallery/fc1.jpeg',
      title: 'The Deciding Strike',
      category: 'Match Action',
      size: 'large',
    },
    {
      id: 'g2',
      src: '/images/gallery/fc2.jpeg',
      title: 'United Front',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g3',
      src: '/images/gallery/fc3.jpeg',
      title: 'Focus & Fire',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g4',
      src: '/images/gallery/fc4.jpeg',
      title: 'Roar of the Crocs',
      category: 'Fans',
      size: 'wide',
    },
    {
      id: 'g5',
      src: '/images/gallery/fc5.jpeg',
      title: 'Matchday Energy',
      category: 'Fans',
      size: 'normal',
    },
    {
      id: 'g6',
      src: '/images/gallery/fc6.jpeg',
      title: 'Sharpening The Edge',
      category: 'Training',
      size: 'normal',
    },
    {
      id: 'g7',
      src: '/images/gallery/fc7.jpeg',
      title: 'Wing Wizard',
      category: 'Match Action',
      size: 'normal',
    },
    {
      id: 'g8',
      src: '/images/gallery/fc8.jpeg',
      title: 'Ground Work',
      category: 'Training',
      size: 'wide',
    },
    {
      id: 'g9',
      src: '/images/gallery/fc9.jpeg',
      title: 'The Wall',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g10',
      src: '/images/gallery/fc10.jpeg',
      title: 'Under The Lights',
      category: 'Match Action',
      size: 'normal',
    },
    {
      id: 'g11',
      src: '/images/gallery/fc11.jpeg',
      title: 'Last Line',
      category: 'Team',
      size: 'normal',
    },
    {
      id: 'g12',
      src: '/images/gallery/fc12.jpeg',
      title: 'Crowd Colours',
      category: 'Fans',
      size: 'normal',
    },
  ]