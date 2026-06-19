import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 whitespace-nowrap">
          ĐỪNG BỎ LỠ CƠ HỘI THAY ĐỔI!
        </h2>
        
        <Link
          href="/dang-ky"
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-orange-600 font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
        >
          Đăng ký ngay
          <ArrowRight className="w-7 h-7" />
        </Link>
      </div>
    </section>
  );
};
