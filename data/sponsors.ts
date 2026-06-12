export interface Sponsor {
  id: string
  name: string
  logo: string
  tier: 'Title Sponsor' | 'Gold Partner' | 'Silver Partner' | 'Community Partner'
  href: string
  blurb?: string
}

export const sponsors: Sponsor[] = [
  {
    id: 's1',
    name: 'Blue Fish Lodge',
    logo: '/images/sponsors/sponser1.jpeg',
    tier: 'Title Sponsor',
    href: '#',
    blurb: 'Blue Fish Lodge proudly partners with Karonga United FC as our principal sponsor, sharing in the club\'s vision and supporting the Crocodiles on and off the pitch.',
  },
  {
    id: 's2',
    name: 'Chipanga Customs and Clearing Company',
    logo: '/images/sponsors/sponser2.jpeg',
    tier: 'Gold Partner',
    href: '#',
    blurb: 'Chipanga Customs and Clearing Company — "power to do more" — backs the Crocodiles as an official club partner, helping drive the team forward.',
  },
]