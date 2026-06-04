export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'
export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'postponed'
export type MatchVenue = 'home' | 'away' | 'neutral'
export type NewsCategory = 'Match Report' | 'Club News' | 'Transfer' | 'Academy' | 'Community' | 'Interview'
export type SponsorTier = 'title' | 'gold' | 'silver' | 'bronze' | 'community'

export interface Player {
  id: string
  name: string
  number: number
  position: PlayerPosition
  positionLabel: string
  nationality: string
  age: number
  image: string
  stats: {
    appearances: number
    goals?: number
    assists?: number
    saves?: number
    cleanSheets?: number
    tackles?: number
  }
  isFeatured?: boolean
}

export interface Fixture {
  id: string
  opponent: string
  date: string
  venue: MatchVenue
  stadium: string
  competition: string
  status: MatchStatus
}

export interface Result {
  id: string
  opponent: string
  date: string
  venue: MatchVenue
  competition: string
  kuScore: number
  opponentScore: number
  scorers?: string[]
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  publishedAt: string
  author: string
  isFeatured?: boolean
  content: string[] 
}

export interface LeagueTableRow {
  position: number
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  isCurrentClub?: boolean
  form?: ('W' | 'D' | 'L')[]
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  tier: SponsorTier
  website?: string
}

export interface StaffMember {
  id: string
  name: string
  role: string
  image: string
  bio?: string
}