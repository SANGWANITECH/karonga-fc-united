import type { LeagueTableRow } from '@/types'

export const leagueTable: LeagueTableRow[] = [
  {
    position: 1, club: 'Silver Strikers',
    played: 14, won: 10, drawn: 4, lost: 0,
    goalsFor: 28, goalsAgainst: 10, goalDifference: 18, points: 34,
    form: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    position: 2, club: 'Nyasa Big Bullets',
    played: 14, won: 9, drawn: 4, lost: 1,
    goalsFor: 26, goalsAgainst: 11, goalDifference: 15, points: 31,
    form: ['W', 'D', 'W', 'W', 'L'],
  },
  {
    position: 3, club: 'Karonga United',
    played: 14, won: 8, drawn: 4, lost: 2,
    goalsFor: 22, goalsAgainst: 14, goalDifference: 8, points: 28,
    isCurrentClub: true,
    form: ['W', 'D', 'W', 'L', 'W'],
  },
  {
    position: 4, club: 'Mighty Wanderers',
    played: 14, won: 7, drawn: 5, lost: 2,
    goalsFor: 20, goalsAgainst: 14, goalDifference: 6, points: 26,
    form: ['L', 'W', 'D', 'W', 'D'],
  },
  {
    position: 5, club: 'Blue Eagles',
    played: 14, won: 6, drawn: 4, lost: 4,
    goalsFor: 18, goalsAgainst: 16, goalDifference: 2, points: 22,
    form: ['D', 'L', 'W', 'D', 'W'],
  },
]