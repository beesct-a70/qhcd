import React from "react";
import { CheckCircle, User, CreditCard, BookOpen } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const QuyTrinh: React.FC = () => {
  const steps: Step[] = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Đăng ký thông tin",
      description: "Điền đầy đủ thông tin cá nhân vào form đăng ký",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Thanh toán học phí",
      description: "Thực hiện thanh toán theo phương thức bạn chọn",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Tham gia khóa học",
      description: "Nhận tài liệu và bắt đầu học tập",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Hoàn thành khóa học",
      description: "Nhận chứng chỉ và áp dụng kiến thức vào cuộc sống",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Quy trình đăng ký
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-orange-500/30">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
