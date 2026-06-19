import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Trịnh Thanh Tùng',
    role: 'Doanh nhân',
    image: '/hv1.png',
    content: 'Sau khi tham gia QHCD, tôi đã thay đổi hoàn toàn cách nhìn về cuộc đời. Tôi có được mục tiêu rõ ràng và kế hoạch hành động cụ thể!',
  },
  {
    id: 2,
    name: 'Nguyễn Thị Xuân',
    role: 'Nhân viên văn phòng',
    image: '/hv2.png',
    content: 'QHCD giúp tôi cân bằng giữa công việc và cuộc sống. Tôi cảm thấy hạnh phúc và tràn đầy năng lượng hơn mỗi ngày!',
  },
  {
    id: 3,
    name: 'Nguyễn Xuân Trường',
    role: 'Kỹ sư IT',
    image: '/hv3.png',
    content: 'Tôi đã tìm thấy mục tiêu và định hướng cho tương lai. Cảm ơn BTC đã tạo ra một khóa học tuyệt vời!',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            HỌC VIÊN <span className="text-orange-500">NÓI GÌ</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Lời chia sẻ thực tế từ những học viên đã tham gia khóa học!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-orange-300 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <div className="text-4xl text-orange-500 mb-6">
                <Quote className="w-12 h-12" />
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-8">{testimonial.content}</p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-orange-100"
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
