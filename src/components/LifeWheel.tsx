'use client';

import React, { useState } from 'react';
import { Heart, Zap, Users, DollarSign, Sparkles, Share2, Smile, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface LifeAspect {
  id: number;
  title: string;
  description: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

const lifeAspects: LifeAspect[] = [
  {
    id: 1,
    title: 'Tâm Linh',
    description: 'Sự bình an và ý nghĩa sống',
    color: '#22c55e',
    gradient: 'from-green-500 to-lime-600',
    icon: <Sparkles className="w-10 h-10" />,
  },
  {
    id: 2,
    title: 'Sức Khỏe',
    description: 'Thể chất và tinh thần',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    icon: <Heart className="w-10 h-10" />,
  },
  {
    id: 3,
    title: 'Phát Triển Bản Thân',
    description: 'Học hỏi và hoàn thiện',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    icon: <Zap className="w-10 h-10" />,
  },
  {
    id: 4,
    title: 'Mối Quan Hệ',
    description: 'Kết nối và yêu thương',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    icon: <Users className="w-10 h-10" />,
  },
  {
    id: 5,
    title: 'Tài Chính',
    description: 'Sự ổn định và tự do tài chính',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    icon: <DollarSign className="w-10 h-10" />,
  },
  {
    id: 6,
    title: 'Sự Nghiệp',
    description: 'Đam mê và đóng góp giá trị',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    icon: <Briefcase className="w-10 h-10" />,
  },
  {
    id: 7,
    title: 'Giải Trí',
    description: 'Niềm vui và trải nghiệm',
    color: '#ec4899',
    gradient: 'from-pink-500 to-fuchsia-600',
    icon: <Smile className="w-10 h-10" />,
  },
  {
    id: 8,
    title: 'Chia Sẻ',
    description: 'Cho đi và tạo ảnh hưởng tích cực',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-sky-600',
    icon: <Share2 className="w-10 h-10" />,
  },
];

export const LifeWheel: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Calculate positions in a circle
  const totalItems = lifeAspects.length;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-slate-900">Khám phá</span> <span className="text-orange-500">Bánh Xe Cuộc Đời</span> của bạn
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Left side - Wheel */}
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
            {/* Center circle */}
            <div className="absolute z-20 w-40 h-40 md:w-48 md:h-48 bg-white rounded-full shadow-2xl border-8 border-slate-100 flex flex-col items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  BÁNH XE
                </h3>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  CUỘC ĐỜI
                </h3>
                <div className="text-slate-500 font-semibold text-xs md:text-sm mt-2">
                  WHEEL OF LIFE
                </div>
              </div>
            </div>

            {/* Wheel segments and icons together in SVG */}
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Draw the 8 segments */}
              {lifeAspects.map((aspect, index) => {
                const startAngle = (index * 360) / totalItems - 90;
                const endAngle = ((index + 1) * 360) / totalItems - 90;
                
                // Calculate path for segment
                const x1 = 200 + 180 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 200 + 180 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 200 + 180 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 200 + 180 * Math.sin((endAngle * Math.PI) / 180);
                
                const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                const pathData = [
                  `M 200 200`,
                  `L ${x1} ${y1}`,
                  `A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`
                ].join(' ');

                // Calculate icon position
                const iconAngle = (index * 360) / totalItems - 90 + (360 / totalItems / 2);
                const iconX = 200 + 120 * Math.cos((iconAngle * Math.PI) / 180);
                const iconY = 200 + 120 * Math.sin((iconAngle * Math.PI) / 180);

                return (
                  <g key={aspect.id}>
                    <path
                      d={pathData}
                      fill={aspect.color}
                      opacity={hoveredId === aspect.id ? 1 : 0.9}
                      style={{ transition: 'opacity 0.3s, transform 0.3s' }}
                      onMouseEnter={() => setHoveredId(aspect.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="cursor-pointer hover:opacity-100"
                    />
                    <line
                      x1="200"
                      y1="200"
                      x2={x1}
                      y2={y1}
                      stroke="white"
                      strokeWidth="4"
                    />
                    
                    {/* Icon circle */}
                    <circle
                      cx={iconX}
                      cy={iconY}
                      r={30}
                      fill="white"
                      stroke="#e2e8f0"
                      strokeWidth="4"
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        filter: hoveredId === aspect.id ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                      }}
                      onMouseEnter={() => setHoveredId(aspect.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    />
                  </g>
                );
              })}
            </svg>
            
            {/* Icons (we'll position them manually with CSS) */}
            {lifeAspects.map((aspect, index) => {
              const iconAngle = (index * 360) / totalItems - 90 + (360 / totalItems / 2);
              const iconX = 200 + 120 * Math.cos((iconAngle * Math.PI) / 180);
              const iconY = 200 + 120 * Math.sin((iconAngle * Math.PI) / 180);

              return (
                <div
                  key={aspect.id}
                  className="absolute z-30 flex items-center justify-center"
                  style={{
                    left: `${(iconX / 400) * 100}%`,
                    top: `${(iconY / 400) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredId(aspect.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="text-3xl" style={{ color: aspect.color }}>
                    {aspect.icon}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side - Details and CTA */}
          <div className="lg:w-1/2 space-y-8">
            {/* Details card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl">
              {hoveredId ? (
                lifeAspects.map((aspect) => 
                  hoveredId === aspect.id && (
                    <div key={aspect.id} className="animate-fade-in-up">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${aspect.gradient} flex items-center justify-center text-white shadow-xl`}>
                          {aspect.icon}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                          {aspect.title}
                        </h3>
                      </div>
                      <p className="text-xl text-slate-700 leading-relaxed">
                        {aspect.description}
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Di chuột vào bánh xe để khám phá!
                  </h3>
                  <p className="text-slate-600 text-lg">
                    Một cuộc sống hoàn hảo cần cân bằng 8 khía cạnh này.
                  </p>
                </div>
              )}
            </div>

            {/* Fixed CTA button */}
            <Link href="/dang-ky" className="w-full group flex items-center justify-center gap-3 px-10 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl rounded-3xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transform hover:-translate-y-2 transition-all duration-300">
              Đăng Ký Ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
