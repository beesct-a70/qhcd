'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, User, CheckCircle2, AlertCircle, Loader2, Phone, MapPin, RefreshCw } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import { formatCurrency } from '@/utils/payment';

interface LookupResult {
  status: string;
  data?: Array<{
    fullName: string;
    birthDate: string;
    tuyenTrenPlatinum: string;
    trangThaiDangKy: string;
    soTien: string | number;
    thanhVienTo: string;
  }>;
  message: string;
}

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
};

const LookupPage: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [captcha, setCaptcha] = useState<{ a: number; b: number; answer: number }>({ a: 0, b: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaError(null);
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError(null);
    setResult(null);

    // Validate CAPTCHA
    if (Number(captchaInput) !== captcha.answer) {
      setCaptchaError('Mã CAPTCHA không đúng! Vui lòng thử lại.');
      refreshCaptcha();
      return;
    }

    // Basic validation for phone
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setResult({
        status: 'error',
        message: 'Vui lòng nhập số điện thoại hợp lệ!'
      });
      return;
    }

    setLoading(true);

    try {
      // Call Google Apps Script API
      const url = `${API_ENDPOINTS.LOOKUP}&phone=${encodeURIComponent(cleanPhone)}`;
      
      const response = await fetch(url, {
        method: 'GET'
      });
      const data = await response.json();
      
      setResult(data);
      refreshCaptcha();
      
    } catch (error) {
      console.error('Lookup error:', error);
      setResult({
        status: 'error',
        message: 'Lỗi kết nối hệ thống! Vui lòng thử lại sau.'
      });
      
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = result?.status === 'success';
  const hasData = result?.data && result.data.length > 0;

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Tra Cứu Thông Tin
          </h1>
          <p className="text-lg text-slate-600">
            Nhập số điện thoại đã đăng ký để xem trạng thái của bạn
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                Số điện thoại đã đăng ký
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901234567"
                  className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-500" />
                Mã CAPTCHA
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl px-6 py-4 text-center mb-3">
                    <span className="text-2xl font-black text-slate-900">
                      {captcha.a} + {captcha.b} = ?
                    </span>
                  </div>
                  <input
                    type="number"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Nhập kết quả"
                    className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    required
                  />
                  {captchaError && (
                    <p className="text-sm text-red-500 mt-2">{captchaError}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-4 bg-slate-50 border border-slate-300 rounded-xl text-slate-600 hover:text-orange-500 hover:border-orange-300 transition-all"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Đang tra cứu...
                </>
              ) : (
                <>
                  <Search className="w-6 h-6" />
                  Tra cứu ngay
                </>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className={`rounded-3xl p-8 md:p-10 shadow-xl border ${
            isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {isSuccess ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-1 ${
                  isSuccess ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isSuccess ? (hasData ? 'Tìm thấy thông tin!' : 'Không tìm thấy thông tin!') : 'Lỗi!'}
                </h2>
                <p className="text-slate-600">{result.message}</p>
              </div>
            </div>

            {isSuccess && hasData && result.data && result.data.map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Họ và tên</p>
                    <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      {item.fullName}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Ngày sinh</p>
                    <p className="text-xl font-bold text-slate-900">{item.birthDate}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Tuyến trên Platinum</p>
                    <p className="text-xl font-bold text-slate-900">{item.tuyenTrenPlatinum}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Tình trạng đăng ký</p>
                    <p className={`text-xl font-bold flex items-center gap-2 ${
                      item.trangThaiDangKy === 'Rồi' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {item.trangThaiDangKy}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Số tiền cần nộp</p>
                    <p className="text-xl font-bold text-orange-600">
                      {item.soTien ? (typeof item.soTien === 'number' ? formatCurrency(item.soTien) : item.soTien) : 'Chưa có'}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Thành viên Tổ</p>
                    <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      {item.thanhVienTo || 'Chưa có'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default LookupPage;
