import React from 'react';
import { Calendar, MapPin, Users, Award, Clock, AlertTriangle } from 'lucide-react';

const highlights = [
  {
    icon: <Award className="w-8 h-8 text-orange-500" />,
    value: "6",
    label: "Năm hành trình",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    value: "3,000+",
    label: "Học viên thay đổi",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: <Calendar className="w-8 h-8 text-orange-500" />,
    value: "11-12/7",
    label: "Thời gian 2026",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: <MapPin className="w-8 h-8 text-orange-500" />,
    value: "Đồ Sơn",
    label: "Hải Phòng",
    color: "from-orange-500 to-orange-600",
  },
];

const urgencyItem = {
  icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
  value: "TỐI ĐA 144",
  label: "Học viên/lớp",
  color: "from-yellow-500 to-orange-600",
};

export const CourseHighlights: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
          Điểm nhấn khóa học
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-orange-300 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-center mb-4">{highlight.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
                {highlight.value}
              </div>
              <div className="text-slate-600 text-sm font-medium">
                {highlight.label}
              </div>
            </div>
          ))}
          <div className="col-span-2 lg:col-span-1">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 text-center hover:border-yellow-300 hover:scale-105 transition-all duration-300 shadow-sm">
              <div className="flex justify-center mb-4">{urgencyItem.icon}</div>
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent mb-1">
                {urgencyItem.value}
              </div>
              <div className="text-yellow-700 text-sm font-medium">
                {urgencyItem.label}
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  <Clock className="w-3 h-3" />
                  Chỉ còn ít chỗ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
