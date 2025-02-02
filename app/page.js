'use client'

import Hero from '../components/Home/Hero'
import Testimonials from '../components/Home/Testimonial'
import Usage from '../components/Home/Usage'

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Hero />
      <Usage />
    </div>
  );
}