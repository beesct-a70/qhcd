import React from 'react';
import { RegisterForm } from '@/components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Đăng ký tham gia khóa học
          </h1>
          <p className="text-2xl font-black text-slate-900 mb-2">
            QUY HOẠCH CUỘC ĐỜI - NỀN TẢNG THÀNH CÔNG
          </p>
          <p className="text-lg text-slate-600">
            3 bước đơn giản để tham gia khóa học QHCĐ K23
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
