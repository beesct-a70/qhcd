'use client';

import React, { useState, useMemo } from 'react';
import {
  User,
  Users,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  QrCode,
  MessageCircle,
  ShieldAlert,
  Loader2,
  Send
} from 'lucide-react';
import {
  FormData,
  calculatePricing,
  formatCurrency,
  generateVietQRUrl,
  generateZaloMessage,
  TUYEN_DAU_NHOM_OPTIONS,
  ATTENDANCE_OPTIONS,
  BANK_INFO,
  removeVietnameseAccents
} from '@/utils/payment';
import { API_ENDPOINTS } from '@/config/api';

const initialFormData: FormData = {
  fullName: '',
  birthDate: '',
  gender: '',
  phoneNumber: '',
  cccd: '',
  maSoAdaOrCccd: '',
  tuyenDauNhom: '',
  tuyenTrenPlatinum: '',
  isVegetarian: '',
  attendanceCount: '',
  uniformOption: 'mac-dinh',
  shirtSize: '',
  transportOption: 'btc',
};

interface SubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
  data?: {
    maMemo: string;
    soTien: number;
  };
}

export const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const pricing = useMemo(() => calculatePricing(formData), [formData]);
  const [isAttendanceDropdownOpen, setIsAttendanceDropdownOpen] = useState(false);
  const [isTuyenDauDropdownOpen, setIsTuyenDauDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
    message: ''
  });

  // Close dropdowns when clicking outside
  const attendanceDropdownRef = React.useRef<HTMLDivElement>(null);
  const tuyenDauDropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        attendanceDropdownRef.current &&
        !attendanceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAttendanceDropdownOpen(false);
      }
      if (
        tuyenDauDropdownRef.current &&
        !tuyenDauDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTuyenDauDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Sanitize input to prevent XSS
    const sanitizedValue = value
      .replace(/[<>\"'&;]/g, '');
    
    let validatedValue = sanitizedValue;
    
    // Validate specific fields
    if (
      field === 'cccd' ||
      field === 'maSoAdaOrCccd' ||
      field === 'phoneNumber'
    ) {
      // Only allow numbers
      validatedValue = sanitizedValue.replace(/[^0-9]/g, '');
    } else if (field === 'birthDate') {
      // Auto format dd/mm/yyyy
      let digits = validatedValue.replace(/\D/g, '');
      if (digits.length >= 2) {
        digits = digits.slice(0, 2) + '/' + digits.slice(2);
      }
      if (digits.length >= 5) {
        digits = digits.slice(0, 5) + '/' + digits.slice(5, 9);
      }
      validatedValue = digits;
    }
    
    setFormData(prev => ({ ...prev, [field]: validatedValue }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate full name
    if (!formData.fullName || formData.fullName.trim().length === 0) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }
    
    // Validate birth date
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    if (!formData.birthDate || !dateRegex.test(formData.birthDate)) {
      newErrors.birthDate = 'Vui lòng nhập ngày sinh đúng định dạng dd/mm/yyyy';
    }
    
    // Validate gender
    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }
    
    // Validate phone number
    if (!formData.phoneNumber || formData.phoneNumber.length < 10 || formData.phoneNumber.length > 11) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại từ 10-11 số';
    }
    
    // Validate CMT/CCCD
    if (!formData.cccd || formData.cccd.length < 9 || formData.cccd.length > 12) {
      newErrors.cccd = 'Vui lòng nhập số CMT/CCCD từ 9-12 số';
    }
    
    // Validate ADA/CCCD
    if (!formData.maSoAdaOrCccd || formData.maSoAdaOrCccd.length < 9 || formData.maSoAdaOrCccd.length > 12) {
      newErrors.maSoAdaOrCccd = 'Vui lòng nhập mã số ADA hoặc CCCD từ 9-12 số';
    }
    
    // Validate vegetarian option
    if (!formData.isVegetarian) {
      newErrors.isVegetarian = 'Vui lòng chọn';
    }
    
    // Validate attendance count
    if (!formData.attendanceCount) {
      newErrors.attendanceCount = 'Vui lòng chọn số lần tham dự';
    }
    
    // Validate Tuyen dau nhom
    if (!formData.tuyenDauNhom) {
      newErrors.tuyenDauNhom = 'Vui lòng chọn tuyến đầu nhóm';
    }
    
    // Validate Tuyen tren Platinum
    if (!formData.tuyenTrenPlatinum || formData.tuyenTrenPlatinum.trim().length === 0) {
      newErrors.tuyenTrenPlatinum = 'Vui lòng nhập tuyến trên Platinum';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (pricing.isRegistrationClosed) return;
    setSubmission({ status: 'submitting', message: 'Đang gửi thông tin đăng ký...' });
    
    const maMemo = `${removeVietnameseAccents(formData.fullName)} ${formData.phoneNumber} QHCD K23`;
    
    console.log('Registering with data:', {
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      maSoAdaOrCccd: formData.maSoAdaOrCccd,
      phoneNumber: formData.phoneNumber,
      tuyenDauNhom: formData.tuyenDauNhom,
      tuyenTrenPlatinum: formData.tuyenTrenPlatinum,
      cccd: formData.cccd,
      uniformOption: formData.uniformOption,
      shirtSize: formData.shirtSize,
      gender: formData.gender,
      isVegetarian: formData.isVegetarian,
      transportOption: formData.transportOption,
      attendanceCount: formData.attendanceCount,
      soTien: pricing.totalAmount,
      maMemo: maMemo
    });
    console.log('API Endpoint:', API_ENDPOINTS.REGISTER);
    
    try {
      // Gửi dữ liệu lên Google Sheets
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          birthDate: formData.birthDate,
          maSoAdaOrCccd: formData.maSoAdaOrCccd,
          phoneNumber: formData.phoneNumber,
          tuyenDauNhom: formData.tuyenDauNhom,
          tuyenTrenPlatinum: formData.tuyenTrenPlatinum,
          cccd: formData.cccd,
          uniformOption: formData.uniformOption,
          shirtSize: formData.shirtSize,
          gender: formData.gender,
          isVegetarian: formData.isVegetarian,
          transportOption: formData.transportOption,
          attendanceCount: formData.attendanceCount,
          soTien: pricing.totalAmount,
          maMemo: maMemo
        })
      });
      
      console.log('Response status:', response.status, response.statusText);
      
      // Kiểm tra response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Không thể kết nối đến máy chủ (${response.status}): ${errorText}`);
      }
      
      // Thử parse response (nếu có)
      let result;
      try {
        result = await response.json();
        console.log('Response data:', result);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        // Nếu không parse được JSON, vẫn coi là thành công
      }
      
      // Kiểm tra nếu response có lỗi
      if (result && result.status === 'error') {
        throw new Error(result.message);
      }
      
      setSubmission({
        status: 'success',
        message: 'Đăng ký thành công! Vui lòng thanh toán để hoàn tất.',
        data: {
          maMemo: maMemo,
          soTien: pricing.totalAmount
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setSubmission({
        status: 'error',
        message: error instanceof Error ? error.message : 'Đã xảy ra lỗi'
      });
    }
  };

  return (
    <section id="registration" className="px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12 gap-4">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  step < currentStep
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl'
                    : step === currentStep
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-110 shadow-2xl shadow-orange-500/30'
                    : 'bg-slate-200 text-slate-500 border-2 border-slate-300'
                }`}
              >
                {step < currentStep ? <Check className="w-6 h-6" /> : step}
              </div>
              <span className={`text-sm font-semibold hidden md:block ${
                step === currentStep ? 'text-orange-600' : 'text-slate-500'
              }`}>
                {step === 1 ? 'Thông tin' : step === 2 ? 'Dịch vụ' : 'Thanh toán'}
              </span>
              {step < 3 && <div className="w-8 h-1 rounded-full hidden md:block bg-slate-300" />}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
          {pricing.isRegistrationClosed && pricing.isChangeOnly ? (
            <div className="text-center py-16">
              <ShieldAlert className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-yellow-700 mb-4">Đóng Danh Sách Lớp K23!</h3>
              <p className="text-xl text-slate-600 mb-6">Hết thời gian đăng ký mới. Chỉ cho thay người tham dự!</p>
              <p className="text-slate-500">Vui lòng liên hệ Ban Tổ Chức để được hỗ trợ thay đổi thông tin học viên.</p>
            </div>
          ) : pricing.isRegistrationClosed ? (
            <div className="text-center py-16">
              <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-red-600 mb-4">Đóng Hòm Phiếu!</h3>
              <p className="text-xl text-slate-600">Hết thời gian đăng ký và thay đổi. Hẹn gặp lại ở các khóa học tiếp theo!</p>
            </div>
          ) : (
            <>
              {/* STEP 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <User className="w-8 h-8 text-orange-500" />
                    THÔNG TIN CÁ NHÂN
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                        placeholder="Nhập họ tên đầy đủ"
                      />
                      {errors.fullName && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Ngày sinh (dd/mm/yyyy)
                      </label>
                      <input
                        type="text"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.birthDate ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                        placeholder="dd/mm/yyyy"
                        maxLength={10}
                      />
                      {errors.birthDate && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.birthDate}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Giới tính</label>
                      <div className="flex gap-4">
                        {['Nam', 'Nữ'].map(g => (
                          <button
                            key={g}
                            onClick={() => handleInputChange('gender', g)}
                            className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
                              formData.gender === g
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-slate-300 bg-white text-slate-600 hover:border-orange-300'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                      {errors.gender && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.gender}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Số điện thoại (Zalo)
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                        placeholder="09xxxxxxxx"
                        maxLength={11}
                      />
                      {errors.phoneNumber && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.phoneNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Số CMT/CCCD (hỗ trợ đăng ký lưu trú)</label>
                      <input
                        type="text"
                        value={formData.cccd}
                        onChange={(e) => handleInputChange('cccd', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.cccd ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                        placeholder="Nhập số CMT/CCCD"
                        maxLength={12}
                      />
                      {errors.cccd && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.cccd}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Mã số ADA hoặc CCCD</label>
                      <input
                        type="text"
                        value={formData.maSoAdaOrCccd}
                        onChange={(e) => handleInputChange('maSoAdaOrCccd', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.maSoAdaOrCccd ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                        placeholder="Nhập mã số ADA hoặc CCCD"
                        maxLength={12}
                      />
                      {errors.maSoAdaOrCccd && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.maSoAdaOrCccd}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Anh/chị có ăn chay không?</label>
                      <div className="flex gap-4">
                        {['Có', 'Không'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleInputChange('isVegetarian', opt as any)}
                            className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
                              formData.isVegetarian === opt
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-slate-300 bg-white text-slate-600 hover:border-orange-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.isVegetarian && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.isVegetarian}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Đây là lần thứ mấy bạn tham dự?</label>
                      <div ref={attendanceDropdownRef} className="relative" style={{ zIndex: 9999 }}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAttendanceDropdownOpen(!isAttendanceDropdownOpen);
                            setIsTuyenDauDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all flex justify-between items-center ${errors.attendanceCount ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                        >
                          {formData.attendanceCount || 'Chọn số lần tham dự'}
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isAttendanceDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-y-auto" style={{ zIndex: 9999 }}>
                            {ATTENDANCE_OPTIONS.map((option, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  handleInputChange('attendanceCount', option);
                                  setIsAttendanceDropdownOpen(false);
                                }}
                                className="px-4 py-4 cursor-pointer hover:bg-orange-50 transition-colors border-b border-slate-100 last:border-b-0"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.attendanceCount && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.attendanceCount}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Tuyến đầu nhóm trong BĐH
                    </label>
                    <div ref={tuyenDauDropdownRef} className="relative" style={{ zIndex: 1 }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTuyenDauDropdownOpen(!isTuyenDauDropdownOpen);
                          setIsAttendanceDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all flex justify-between items-center ${errors.tuyenDauNhom ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                      >
                        {formData.tuyenDauNhom || 'Chọn tuyến đầu nhóm'}
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isTuyenDauDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-y-auto" style={{ zIndex: 1 }}>
                          {TUYEN_DAU_NHOM_OPTIONS.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                handleInputChange('tuyenDauNhom', option);
                                setIsTuyenDauDropdownOpen(false);
                              }}
                              className="px-4 py-4 cursor-pointer hover:bg-orange-50 transition-colors border-b border-slate-100 last:border-b-0"
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.tuyenDauNhom && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.tuyenDauNhom}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Tuyến trên Platinum
                    </label>
                    <input
                      type="text"
                      value={formData.tuyenTrenPlatinum}
                      onChange={(e) => handleInputChange('tuyenTrenPlatinum', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.tuyenTrenPlatinum ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-orange-500 focus:ring-orange-500/20'}`}
                      placeholder="Nhập tên tuyến trên Platinum"
                    />
                    {errors.tuyenTrenPlatinum && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.tuyenTrenPlatinum}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: Services & Uniform */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-orange-500" />
                    Tùy Chọn Dịch Vụ & Đồng Phục
                  </h3>
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Lựa chọn Áo đồng phục
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleInputChange('uniformOption', 'mac-dinh')}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.uniformOption === 'mac-dinh'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-slate-300 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-lg font-bold text-slate-900">Mặc định theo chương trình</span>
                          {formData.uniformOption === 'mac-dinh' && <CheckCircle2 className="w-6 h-6 text-orange-500" />}
                        </div>
                        <p className="text-slate-600 text-sm">Nhận áo đồng phục màu cam của chương trình</p>
                      </button>
                      <button
                        onClick={() => handleInputChange('uniformOption', 'tu-chuan-bi')}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.uniformOption === 'tu-chuan-bi'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-slate-300 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-lg font-bold text-slate-900">Tự chuẩn bị áo đồng phục</span>
                            <div className="text-green-600 font-semibold mt-1">- {formatCurrency(200000)}</div>
                          </div>
                          {formData.uniformOption === 'tu-chuan-bi' && <CheckCircle2 className="w-6 h-6 text-orange-500" />}
                        </div>
                        <p className="text-slate-600 text-sm">Chuẩn bị 2 áo MÀU CAM, giảm ngay 200k</p>
                      </button>
                    </div>
                    {formData.uniformOption === 'mac-dinh' && (
                      <div className="mt-4 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Chọn cỡ áo</label>
                        <div className="flex flex-wrap gap-3">
                          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                              key={size}
                              onClick={() => handleInputChange('shirtSize', size as any)}
                              className={`w-16 h-14 rounded-xl font-bold transition-all ${
                                formData.shirtSize === size
                                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                                  : 'bg-slate-100 text-slate-700 border border-slate-300 hover:border-orange-500/50'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Lựa chọn di chuyển
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleInputChange('transportOption', 'btc')}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.transportOption === 'btc'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-slate-300 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-lg font-bold text-slate-900">Di chuyển theo BTC</span>
                          {formData.transportOption === 'btc' && <CheckCircle2 className="w-6 h-6 text-orange-500" />}
                        </div>
                        <p className="text-slate-600 text-sm">Đi theo xe của Ban Tổ Chức</p>
                      </button>
                      <button
                        onClick={() => handleInputChange('transportOption', 'tu-di')}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.transportOption === 'tu-di'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-slate-300 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-lg font-bold text-slate-900">Tự di chuyển</span>
                            <div className="text-green-600 font-semibold mt-1">- {formatCurrency(100000)}</div>
                          </div>
                          {formData.transportOption === 'tu-di' && <CheckCircle2 className="w-6 h-6 text-orange-500" />}
                        </div>
                        <p className="text-slate-600 text-sm">Tự tiện di chuyển, giảm ngay 100k</p>
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl">
                    <h4 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Tổng tiền tạm tính
                    </h4>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex justify-between"><span>Học phí gốc</span><span>{formatCurrency(pricing.baseTuition)}</span></div>
                      {pricing.uniformDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Giảm tự chuẩn bị áo</span>
                          <span>- {formatCurrency(pricing.uniformDiscount)}</span>
                        </div>
                      )}
                      {pricing.transportDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Giảm tự di chuyển</span>
                          <span>- {formatCurrency(pricing.transportDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-2xl font-black text-slate-900 pt-2 border-t border-orange-200">
                        <span>Tổng tiền</span>
                        <span className="text-orange-600">{formatCurrency(pricing.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Confirmation & Payment */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <QrCode className="w-8 h-8 text-orange-500" />
                    Xác Nhận & Thanh Toán
                  </h3>
                  {submission.status === 'idle' && (
                    <div className="p-6 bg-slate-100 rounded-2xl text-center">
                      <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Xác nhận thông tin</h4>
                      <p className="text-slate-600 mb-6">Vui lòng kiểm tra lại thông tin trước khi gửi đăng ký!</p>
                      <button
                        onClick={handleSubmit}
                        className="w-full px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <Send className="w-6 h-6" />
                        Gửi thông tin đăng ký
                      </button>
                    </div>
                  )}
                  {submission.status === 'submitting' && (
                    <div className="p-8 bg-slate-100 rounded-2xl text-center">
                      <Loader2 className="w-24 h-24 text-orange-500 animate-spin mx-auto mb-6" />
                      <h4 className="text-2xl font-bold text-slate-900 mb-2">Đang xử lý...</h4>
                      <p className="text-slate-600">{submission.message}</p>
                    </div>
                  )}
                  {submission.status === 'error' && (
                    <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
                      <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                      <h4 className="text-2xl font-bold text-red-600 mb-2">Đăng ký thất bại!</h4>
                      <p className="text-slate-600 mb-6">{submission.message}</p>
                      <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                      >
                        Thử lại
                      </button>
                    </div>
                  )}
                  {submission.status === 'success' && submission.data && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
                      <div className="h-full">
                        <div className="bg-white p-8 rounded-3xl flex flex-col items-center shadow-xl border border-slate-200 h-full">
                          <img
                            src={generateVietQRUrl(formData, submission.data.soTien, submission.data.maMemo)}
                            alt="VietQR"
                            className="w-full max-w-sm rounded-2xl"
                          />
                          <div className="text-center mt-6">
                            <h4 className="text-lg font-bold text-slate-900 mb-1">Quét mã để thanh toán</h4>
                            <p className="text-slate-600 text-sm">Số tiền: <span className="font-bold text-slate-900">{formatCurrency(submission.data.soTien)}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6 h-full flex flex-col">
                        <div className="p-6 bg-slate-100 rounded-2xl flex-1">
                          <h4 className="font-bold text-slate-900 mb-4">Thông tin chuyển khoản</h4>
                          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-600 font-bold text-center">⚠️ Anh chị kiểm tra chính xác thông tin STK và số tiền trước khi chuyển khoản!</p>
                          </div>
                          <div className="space-y-3 text-slate-700">
                            <div><span className="text-slate-500">Ngân hàng:</span> {BANK_INFO.bankName}</div>
                            <div><span className="text-slate-500">Số tài khoản:</span> <span className="font-mono">{BANK_INFO.accountNumber}</span></div>
                            <div><span className="text-slate-500">Chủ tài khoản:</span> {BANK_INFO.accountName}</div>
                            <div className="pt-3 border-t border-slate-300">
                              <div className="text-slate-500 mb-1">Nội dung chuyển khoản:</div>
                              <div className="font-mono bg-white p-3 rounded-lg text-orange-700 break-all border border-slate-200">
                                {submission.data.maMemo}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6 flex-1">
                          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl">
                            <h4 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                              <CheckCircle2 className="w-6 h-6" />
                              Đăng ký thành công!
                            </h4>
                            <p className="text-slate-700">Vui lòng giữ lại ảnh chụp màn hình giao dịch để xác nhận với BTC.</p>
                          </div>
                          <a
                            href={generateZaloMessage()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full p-5 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                          >
                            <MessageCircle className="w-6 h-6" />
                            Liên hệ BTC để xác nhận
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              {!submission.data && (
                <div className="flex justify-between mt-12">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrev}
                      className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold flex items-center gap-2 hover:border-slate-400 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Quay lại
                    </button>
                  )}
                  {currentStep < 3 && (
                    <button
                      onClick={handleNext}
                      className="px-10 py-4 rounded-2xl bg-orange-500 text-white font-bold flex items-center gap-2 hover:bg-orange-600 transition-all ml-auto"
                    >
                      Tiếp theo
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};