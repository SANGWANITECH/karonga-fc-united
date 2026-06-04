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
      name: 'TNM Malawi',
      logo: '/images/sponsors/tnm.png',
      tier: 'Title Sponsor',
      href: '#',
      blurb: 'As our principal title partner, TNM Malawi powers the ambitions of Karonga United FC, connecting the club to supporters across the nation.',
    },
    {
      id: 's2',
      name: 'Airtel Malawi',
      logo: '/images/sponsors/airtel.png',
      tier: 'Gold Partner',
      href: '#',
      blurb: 'Airtel Malawi backs the Crocodiles with the connectivity that keeps the club and its community moving forward.',
    },
    {
      id: 's3',
      name: 'FDH Bank',
      logo: '/images/sponsors/fdh.png',
      tier: 'Gold Partner',
      href: '#',
      blurb: 'FDH Bank supports the financial foundation of the club, fuelling growth on and off the pitch.',
    },
    {
      id: 's4',
      name: 'National Bank',
      logo: '/images/sponsors/nb.png',
      tier: 'Silver Partner',
      href: '#',
      blurb: 'A trusted partner supporting the development of football in the Northern Region.',
    },
  ]