'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    src: '/qhcd1.png',
    caption: 'Bản thiết kế cuộc đời',
  },
  {
    id: 2,
    src: '/qhcd2.png',
    caption: 'Sự nghiệp phát triển bền vững',
  },
  {
    id: 3,
    src: '/qhcd3.png',
    caption: 'Môi trường học tập nhiều năng lượng',
  },
  {
    id: 4,
    src: '/qhcd4.png',
    caption: 'Giảng viên chuyên nghiệp',
  },
  {
    id: 5,
    src: '/qhcd5.png',
    caption: 'Trải nghiệm cuộc sống đầy màu sắc và có mối quan hệ tốt đẹp',
  },
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Side - Text (1/3) */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full text-orange-700 text-sm font-semibold">
              <Calendar className="w-4 h-4" />
              Khóa học K23 - 11-12/07/2026
            </div>

            {/* Title - 2 lines, color swapped words */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              <span className="block">
                <span className="text-orange-600">QUY HOẠCH</span>{" "}
                <span className="text-slate-900">CUỘC ĐỜI</span>
              </span>
              <span className="block mt-2">
                <span className="text-slate-900">NỀN TẢNG</span>{" "}
                <span className="text-orange-600">THÀNH CÔNG</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Cuộc đời như một ngôi nhà. Nếu xây không có bản thiết kế, bạn sẽ lãng phí thời gian, tiền bạc và năng lượng. Hãy cùng QHCD vẽ ra bản thiết kế hoàn hảo cho cuộc đời bạn!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/dang-ky"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Đăng ký
                <ArrowRight className="w-6 h-6" />
              </Link>

              <Link
                href="/tra-cuu"
                className="px-8 py-4 bg-slate-100 text-slate-900 font-bold text-lg rounded-2xl border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-300"
              >
                Tra cứu
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900">7+</div>
                <div className="text-slate-500 text-sm">Năm hành trình</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900">3000+</div>
                <div className="text-slate-500 text-sm">Học viên tham dự</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900">200+</div>
                <div className="text-slate-500 text-sm">Lãnh đạo, HLV</div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Slider (2/3) */}
          <div className="lg:col-span-2">
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl">
              <div className="relative h-72 md:h-96 lg:h-[500px]">
                {slides.map((slide, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'
                      }`}
                    >
                      {/* Image */}
                      <div className="w-full h-full">
                        <img
                          src={slide.src}
                          alt={slide.caption}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      </div>
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                        <p className="text-xl md:text-2xl text-white font-bold">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-slate-800 hover:bg-white transition-all duration-300 hover:scale-110 shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-slate-800 hover:bg-white transition-all duration-300 hover:scale-110 shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-10 bg-orange-500'
                        : 'w-3 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
