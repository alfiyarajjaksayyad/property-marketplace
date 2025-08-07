// import { Hero } from '@/components/home/Hero'
import { Hero } from '../components/home/Hero';
// import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { FeaturedProperties } from '../components/home/FeaturedProperties';
// import { Features } from '@/components/home/Features'
import { Features } from '../components/home/Features';
import { Stats } from '../components/home/Stats'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Stats />
      <FeaturedProperties />
      <Features />
    </div>
  )
}