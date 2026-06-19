'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { LifeAreas } from '@/components/LifeAreas';
import { FeaturedCourses } from '@/components/FeaturedCourses';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <LifeAreas />
      <FeaturedCourses />
      <Testimonials />
      <CTA />
    </main>
  );
}
