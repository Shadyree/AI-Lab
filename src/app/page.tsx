import Hero from '@/components/home/Hero';
import JourneyPreview from '@/components/home/JourneyPreview';
import FeaturedKnowledge from '@/components/home/FeaturedKnowledge';
import RecentProjects from '@/components/home/RecentProjects';

export default function Home() {
  return (
    <>
      <Hero />
      <JourneyPreview />
      <FeaturedKnowledge />
      <RecentProjects />
    </>
  );
}
