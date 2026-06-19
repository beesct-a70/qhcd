'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Users, Award, TrendingUp, MapPin, Calendar } from 'lucide-react';

const slides = [
  {
    id: 1,
    src: '/qhcd1.png',
    title: 'PHÁT TRIỂN & ĐỊNH VỊ BẢN THÂN',
    subtitle: 'Khóa học QHCD K22',
    description: 'Khám phá tiềm năng, xác định mục tiêu và xây dựng lộ trình phát triển cá nhân rõ ràng',
    icon: <Zap className="w-12 h-12" />,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 2,
    src: '/qhcd2.png',
    title: 'CƠ HỘI KHỞI NGHIỆP',
    subtitle: 'Khóa học QHCD K21',
    description: 'Kết nối mạng lưới doanh nhân, tìm kiếm cơ hội hợp tác và bắt đầu hành trình khởi nghiệp',
    icon: <TrendingUp className="w-12 h-12" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 3,
    src: '/qhcd3.png',
    title: 'HLV HÀNG ĐẦU HUẤN LUYỆN',
    subtitle: 'Khóa học QHCD K20',
    description: 'Được đào tạo trực tiếp bởi các chuyên gia, HLV đầu ngành với nhiều năm kinh nghiệm',
    icon: <Award className="w-12 h-12" />,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 4,
    src: '/qhcd4.png',
    title: 'TỔ CHỨC CHUYÊN NGHIỆP',
    subtitle: 'Khóa học QHCD K19',
    description: 'Học tập trong môi trường đỉnh cao, cơ sở vật chất hiện đại và chương trình bài bản',
    icon: <Users className="w-12 h-12" />,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 5,
    src: '/qhcd5.png',
    title: 'ĐỊA ĐIỂM HẤP DẪN',
    subtitle: 'Khóa học QHCD K18',
    description: 'Học tập và trải nghiệm tại Khu điều dưỡng 295 - Đồ Sơn, Hải Phòng',
    icon: <MapPin className="w-12 h-12" />,
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 6,
    src: '/qhcd6.png',
    title: '3 NGÀY BIẾN ĐỔI',
    subtitle: 'Khóa học QHCD K17',
    description: 'Chương trình 11-12/7/2026 - 3 ngày 2 đêm thay đổi hoàn toàn tư duy và cuộc sống',
    icon: <Calendar className="w-12 h-12" />,
    color: 'from-cyan-500 to-blue-600'
  }
];

export const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl">
      {/* Slides container - LARGER! */}
      <div className="relative h-80 md:h-96 lg:h-[500px]">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + slides.length) % slides.length;
          const isNext = index === (currentIndex + 1) % slides.length;

          let positionClass = 'opacity-0 scale-75 translate-x-full';
          if (isActive) {
            positionClass = 'opacity-100 scale-100 translate-x-0 z-20';
          } else if (isPrev) {
            positionClass = 'opacity-30 scale-90 -translate-x-full z-10';
          } else if (isNext) {
            positionClass = 'opacity-30 scale-90 translate-x-full z-10';
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${positionClass}`}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color}`}>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className={`transition-all duration-700 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl border border-white/30`}>
                    {slide.icon}
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                    {slide.title}
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-white/80 font-semibold mb-6">
                    {slide.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows - Larger & more prominent */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 hover:scale-110 shadow-2xl"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 hover:scale-110 shadow-2xl"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots indicators - Larger */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-12 bg-white shadow-lg'
                : 'w-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
