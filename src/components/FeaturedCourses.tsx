import React from 'react';
import { Calendar, MapPin, Users, ArrowRight, Check, Clock, AlertTriangle, Bus, Coffee, Utensils, Shirt, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const FeaturedCourses: React.FC = () => {
  const inclusions = [
    { icon: <Bus className="w-5 h-5" />, text: 'Xe đưa đón' },
    { icon: <Utensils className="w-5 h-5" />, text: 'Ăn, ở 2 ngày 1 đêm' },
    { icon: <Coffee className="w-5 h-5" />, text: 'Nước uống xuyên suốt' },
    { icon: <Shirt className="w-5 h-5" />, text: '02 áo đồng phục' },
    { icon: <BookOpen className="w-5 h-5" />, text: 'Dụng cụ học tập' }
  ];

  const pricingTiers = [
    {
      title: 'Đến 24h ngày 9/07/2026',
      price: '2.100.000đ',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-green-500 bg-green-50',
      highlight: true
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-orange-100 text-orange-700 rounded-full font-bold">
            KHÓA HỌC CHÍNH
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            QUY HOẠCH CUỘC ĐỜI <span className="text-orange-500">K23</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Khoá học 2 ngày 1 đêm giúp bạn vẽ ra bản thiết kế cuộc đời hoàn hảo!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Info & Inclusions */}
          <div className="flex flex-col">
            {/* Basic Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-base font-bold text-slate-900">11-12/07/2026</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-base font-bold text-slate-900">Đồ Sơn, Hải Phòng</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-base font-bold text-slate-900">2 Ngày 1 Đêm</div>
                </div>
              </div>

              {/* Inclusions */}
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-orange-500" />
                </div>
                CHI PHÍ THAM DỰ ĐÃ BAO GỒM
              </h3>
              <div className="grid grid-cols-1 gap-3 flex-1">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-green-600">
                      {item.icon}
                    </div>
                    <span className="text-slate-700 font-semibold text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing */}
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 flex-1">
              <h3 className="text-lg font-black text-slate-900 mb-4 text-center">
                HỌC PHÍ & THỜI GIAN ĐĂNG KÝ
              </h3>
              
              <div className="space-y-2">
                {pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                      tier.highlight 
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100/50 shadow-lg scale-[1.02]' 
                        : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow hover:bg-orange-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${tier.color}`}>
                        {tier.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900 mb-1 text-sm">{tier.title}</div>
                        <div className={`text-2xl font-black ${
                          idx === pricingTiers.length - 1 ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {tier.price}
                        </div>
                      </div>
                      {tier.highlight && (
                        <div className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-sm">
                          MUA SỚM
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Options */}
              <div className="mt-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-500" />
                    Giảm trừ
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold text-sm">Tự di chuyển</span>
                        <span className="text-xl font-black text-orange-600">2.000.000đ</span>
                      </div>
                      <div className="text-sm font-bold text-slate-600 mt-1">Trừ 100k</div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold text-sm">Tự chuẩn bị 2 áo</span>
                        <span className="text-xl font-black text-orange-600">1.900.000đ</span>
                      </div>
                      <div className="text-sm font-bold text-slate-600 mt-1">Trừ 200k</div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold text-sm">Tự chuẩn bị áo + Tự di chuyển</span>
                        <span className="text-xl font-black text-orange-600">1.800.000đ</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-300 flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-green-600">Học phí</span>
                    <span className="text-lg font-black text-green-600">Hoàn toàn miễn phí</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Change Only Notice */}
                  <div className="p-3 rounded-2xl border border-red-200 bg-red-50">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-red-500 bg-red-100">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900 text-sm">Sau 24h ngày 5/07/2026</div>
                        <div className="text-lg font-black text-red-600">Chỉ cho thay người</div>
                        <div className="text-xs text-slate-500 mt-0.5">Không có chính sách hoàn hủy</div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/dang-ky"
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    Đăng ký ngay
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
