'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, Zap, Users, DollarSign, Briefcase, Smile, Share2 } from 'lucide-react';

const lifeAspects = [
  { 
    id: 1, 
    title: 'Tâm linh', 
    description: 'Khám phá mục tiêu sống, tìm thấy bình yên trong tâm hồn',
    color: '#22C55E', 
    icon: <Sparkles className="w-8 h-8" />, 
    details: [
      'Thiền định & Tĩnh tâm',
      'Xác định mục tiêu sống',
      'Kết nối giá trị nội tâm'
    ]
  },
  { 
    id: 2, 
    title: 'Sức khỏe', 
    description: 'Chăm sóc thể chất và tinh thần, xây dựng thói quen lành mạnh',
    color: '#EF4444', 
    icon: <Heart className="w-8 h-8" />, 
    details: [
      'Tập thể dục đều đặn',
      'Chế độ dinh dưỡng cân bằng',
      'Ngủ đủ & Thư giãn'
    ]
  },
  { 
    id: 3, 
    title: 'Phát triển', 
    description: 'Học hỏi liên tục, hoàn thiện kỹ năng, vượt qua giới hạn',
    color: '#3B82F6', 
    icon: <Zap className="w-8 h-8" />, 
    details: [
      'Học kỹ năng mới',
      'Đọc sách mỗi ngày',
      'Thoát vùng an toàn'
    ]
  },
  { 
    id: 4, 
    title: 'Mối quan hệ', 
    description: 'Xây dựng các mối quan hệ yêu thương, chân thành, gắn kết',
    color: '#10B981', 
    icon: <Users className="w-8 h-8" />, 
    details: [
      'Giao tiếp hiệu quả',
      'Thời gian chất lượng',
      'Yêu thương & Thấu hiểu'
    ]
  },
  { 
    id: 5, 
    title: 'Tài chính', 
    description: 'Quản lý tài chính thông minh, tự do tài chính, an tâm tương lai',
    color: '#F59E0B', 
    icon: <DollarSign className="w-8 h-8" />, 
    details: [
      'Lập kế hoạch ngân sách',
      'Đầu tư & Tiết kiệm',
      'Thu nhập thụ động'
    ]
  },
  { 
    id: 6, 
    title: 'Sự nghiệp', 
    description: 'Theo đuổi đam mê, đóng góp giá trị, xây dựng sự nghiệp ý nghĩa',
    color: '#8B5CF6', 
    icon: <Briefcase className="w-8 h-8" />, 
    details: [
      'Xác định mục tiêu nghề nghiệp',
      'Xây dựng thương hiệu cá nhân',
      'Mạng lưới kết nối'
    ]
  },
  { 
    id: 7, 
    title: 'Giải trí', 
    description: 'Tận hưởng niềm vui, trải nghiệm cuộc sống, cân bằng & thư giãn',
    color: '#EC4899', 
    icon: <Smile className="w-8 h-8" />, 
    details: [
      'Sở thích & Đam mê',
      'Du lịch & Trải nghiệm',
      'Thư giãn & Phục hồi'
    ]
  },
  { 
    id: 8, 
    title: 'Chia sẻ', 
    description: 'Cho đi, tạo ảnh hưởng tích cực, góp phần làm tốt đẹp cộng đồng',
    color: '#06B6D4', 
    icon: <Share2 className="w-8 h-8" />, 
    details: [
      'Từ thiện & Công việc tình nguyện',
      'Chia sẻ kiến thức',
      'Tạo giá trị cho cộng đồng'
    ]
  },
];

export const LifeAreas: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getPosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * distance;
    const y = Math.sin(rad) * distance;
    return { x, y };
  };

  const iconDistance = 155;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-slate-900">8 MỤC TIÊU</span>{" "}
            <span className="text-orange-500">TRONG CUỘC ĐỜI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left column: Wheel */}
          <div className="flex justify-center items-center">
            <div 
              className="relative w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full shadow-2xl border-8 border-white overflow-hidden"
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 8 colored segments */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
                {lifeAspects.map((area, index) => {
                  const startAngle = (index * 360) / lifeAspects.length - 90;
                  const endAngle = ((index + 1) * 360) / lifeAspects.length - 90;

                  const x1 = 240 + 230 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 240 + 230 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 240 + 230 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 240 + 230 * Math.sin((endAngle * Math.PI) / 180);

                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                  const pathData = [
                    `M 240 240`,
                    `L ${x1} ${y1}`,
                    `A 230 230 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    `Z`
                  ].join(' ');

                  return (
                    <path
                      key={area.id}
                      d={pathData}
                      fill={area.color}
                      className="cursor-pointer transition-opacity duration-300"
                      style={{
                        opacity: hoveredId === area.id ? 1 : 0.85,
                      }}
                      onMouseEnter={() => setHoveredId(area.id)}
                      onClick={() => setHoveredId(area.id)}
                    />
                  );
                })}
              </svg>

              {/* White lines separating segments */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 480">
                {lifeAspects.map((area, index) => {
                  const angle = (index * 360) / lifeAspects.length - 90;
                  const x = 240 + 230 * Math.cos((angle * Math.PI) / 180);
                  const y = 240 + 230 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <line key={area.id} x1="240" y1="240" x2={x} y2={y} stroke="white" strokeWidth="8" />
                  );
                })}
              </svg>

              {/* Center circle - smaller */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-xl flex items-center justify-center z-20">
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-black text-slate-900">BÁNH XE</h3>
                    <h3 className="text-lg md:text-xl font-black text-orange-500">CUỘC ĐỜI</h3>
                  </div>
                </div>
              </div>

              {/* Icons on wheel - centered in each segment */}
              {lifeAspects.map((area, index) => {
                const isHovered = hoveredId === area.id;
                const segmentCenterAngle = index * 45 - 67.5;
                const { x, y } = getPosition(segmentCenterAngle, iconDistance);

                return (
                  <div
                    key={area.id}
                    className="absolute z-30 pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        color: area.color,
                        border: isHovered ? `4px solid ${area.color}` : '4px solid white',
                        boxShadow: isHovered ? `0 0 30px ${area.color}` : '0 5px 10px -2px rgb(0 0 0 / 0.1)',
                        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      {React.cloneElement(area.icon as React.ReactElement<{className?: string}>, { className: "w-8 h-8 md:w-10 md:h-10" })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: Description box */}
          <div className="flex justify-center items-center h-full">
            {hoveredId ? (
              <div 
                className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 border-2 transition-all duration-500 animate-fade-in-up h-full"
                style={{ borderColor: lifeAspects.find(a => a.id === hoveredId)?.color }}
              >
                {(() => {
                  const area = lifeAspects.find(a => a.id === hoveredId)!;
                  return (
                    <>
                      <div 
                        className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style={{ 
                          backgroundColor: `${area.color}15`,
                          color: area.color,
                          boxShadow: `0 0 30px ${area.color}30`
                        }}
                      >
                        {React.cloneElement(area.icon as React.ReactElement<{className?: string}>, { className: "w-12 h-12" })}
                      </div>
                      <h3 
                        className="text-4xl font-black text-center mb-4"
                        style={{ color: area.color }}
                      >
                        {area.title}
                      </h3>
                      <p className="text-slate-600 text-center text-xl mb-8 leading-relaxed">
                        {area.description}
                      </p>
                      <div className="space-y-3">
                        {area.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: area.color }}
                            >
                              <span className="text-white text-sm font-bold">{idx + 1}</span>
                            </div>
                            <span className="text-slate-700 text-lg font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="w-full max-w-lg bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-lg p-12 border-2 border-slate-200 flex flex-col items-center justify-center text-center h-full">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <Sparkles className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-4">
                  KHÁM PHÁ BÁNH XE CUỘC ĐỜI
                </h3>
                <p className="text-slate-600 text-xl">
                  Một cuộc sống hoàn hảo cần cân bằng 8 khía cạnh này.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
