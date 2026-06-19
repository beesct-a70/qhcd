import React from 'react';
import {
  Bus,
  UtensilsCrossed,
  Droplets,
  Shirt,
  GraduationCap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { formatCurrency, TUITION_TIERS } from '@/utils/payment';

const inclusions = [
  {
    icon: <Bus className="w-8 h-8" />,
    title: 'Xe đưa đón',
    description: 'Đi theo xe của Ban Tổ Chức'
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    title: 'Ăn, ở 2 ngày 1 đêm',
    description: 'Nghỉ dưỡng tại Khu điều dưỡng 295'
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: 'Nước uống xuyên suốt',
    description: 'Đầy đủ nước uống trong chương trình'
  },
  {
    icon: <Shirt className="w-8 h-8" />,
    title: '02 áo đồng phục',
    description: 'Áo màu cam, cỡ từ S đến XXL'
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Dụng cụ học tập & hoạt động',
    description: 'Đầy đủ tài liệu và đồ dùng cần thiết'
  }
];

export const CourseInclusions: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">
            Chi Phí Tham Dự Đã Bao Gồm
          </h2>
          <p className="text-lg text-slate-600">Toàn bộ tiện ích và dịch vụ trong chương trình</p>
        </div>

        {/* Inclusions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {inclusions.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center hover:border-orange-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-black text-center mb-10 text-slate-900">
            Học Phí & Thời Gian Đăng Ký
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Early Bird */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-3xl p-8 text-center shadow-lg">
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-orange-600 mb-2">Early Bird</h4>
              <p className="text-slate-600 text-sm mb-4">Đến 24h ngày 30/06/2026</p>
              <div className="text-4xl font-black text-slate-900 mb-2">{formatCurrency(2200000)}</div>
              <p className="text-slate-500 text-sm">/ học viên</p>
            </div>

            {/* Normal Price */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center shadow-lg">
              <Clock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-slate-700 mb-2">Giá Thường</h4>
              <p className="text-slate-600 text-sm mb-4">Từ 1/07 đến 24h ngày 5/07/2026</p>
              <div className="text-4xl font-black text-slate-900 mb-2">{formatCurrency(2300000)}</div>
              <p className="text-slate-500 text-sm">/ học viên</p>
            </div>

            {/* Closed */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-3xl p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-red-600 mb-2">Đóng Danh Sách</h4>
              <p className="text-slate-600 text-sm mb-4">Sau 24h ngày 5/07 đến 11/07/2026</p>
              <div className="text-xl font-bold text-slate-700 mb-2">Chỉ cho thay người</div>
              <p className="text-slate-500 text-sm">Liên hệ BTC để được hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
