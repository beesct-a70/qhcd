'use client';

import React, { useState } from 'react';
import { Search, User, CheckCircle2, AlertCircle, Loader2, Phone, MapPin } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import { formatCurrency } from '@/utils/payment';

interface LookupResult {
  success: boolean;
  data?: {
    hoTen: string;
    soDienThoai: string;
    tinhTrangThanhToan: 'Đã đóng' | 'Chờ duyệt' | 'Chưa đóng';
    soTienCanDong: number;
    toDuocXep?: string;
    ngayDangKy: string;
  };
  message: string;
}

export default function LookupPage() {
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LookupResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setResult({
        success: false,
        message: 'Vui lòng nhập số điện thoại hợp lệ!'
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Call Google Apps Script API
      const response = await fetch(`${API_ENDPOINTS.LOOKUP}?phone=${encodeURIComponent(cleanPhone)}`, {
        method: 'GET',
        mode: 'cors'
      });

      const data = await response.json();
      setResult(data as LookupResult);

    } catch (error) {
      console.error('Lookup error:', error);
      setResult({
        success: false,
        message: 'Đã xảy ra lỗi khi kết nối đến hệ thống. Vui lòng thử lại sau!'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Tra Cứu Thông Tin
          </h1>
          <p className="text-lg text-slate-400">
            Nhập số điện thoại đã đăng ký để xem trạng thái của bạn
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-10 shadow-2xl mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                Số điện thoại đã đăng ký
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901234567"
                  className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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

        {/* Results */}
        {result && (
          <div className={`rounded-3xl p-8 md:p-10 shadow-2xl border ${
            result.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
          }`}>
            {/* Status Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                result.success ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {result.success ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-1 ${
                  result.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result.success ? 'Tìm thấy thông tin!' : 'Không tìm thấy!'}
                </h2>
                <p className="text-slate-400">{result.message}</p>
              </div>
            </div>

            {/* Details */}
            {result.success && result.data && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Họ và tên</p>
                    <p className="text-xl font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      {result.data.hoTen}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Trạng thái thanh toán</p>
                    <p className={`text-xl font-bold flex items-center gap-2 ${
                      result.data.tinhTrangThanhToan === 'Đã đóng' ? 'text-green-400' :
                      result.data.tinhTrangThanhToan === 'Chờ duyệt' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {result.data.tinhTrangThanhToan === 'Đã đóng' && <CheckCircle2 className="w-5 h-5" />}
                      {result.data.tinhTrangThanhToan}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Số tiền cần đóng</p>
                    <p className="text-xl font-bold text-orange-400">
                      {formatCurrency(result.data.soTienCanDong)}
                    </p>
                  </div>
                  {result.data.toDuocXep && (
                    <div className="p-4 bg-slate-800/50 rounded-xl">
                      <p className="text-sm text-slate-500 mb-1">Tổ được xếp</p>
                      <p className="text-xl font-bold text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        {result.data.toDuocXep}
                      </p>
                    </div>
                  )}
                </div>
                <div className="pt-4 border-t border-slate-700/50">
                  <p className="text-sm text-slate-500">Ngày đăng ký</p>
                  <p className="text-slate-300">{result.data.ngayDangKy}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
