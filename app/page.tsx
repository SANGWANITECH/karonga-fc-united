import HeroSection from '@/components/home/HeroSection'
import ResultsStrip from '@/components/home/ResultsStrip'
import NewsAndTable from '@/components/home/NewsAndTable'
import FeaturedPlayers from '@/components/home/FeaturedPlayers'
import NextFixture from '@/components/home/NextFixture'
import StadiumHighlight from '@/components/home/StadiumHighlight'
import SponsorsStrip from '@/components/home/SponsorsStrip'
import FanEngagement from '@/components/home/FanEngagement'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ResultsStrip />
      <NewsAndTable />
      <FeaturedPlayers />
      <NextFixture />
      <StadiumHighlight />
      <SponsorsStrip />
      <FanEngagement />
    </main>
  )
}