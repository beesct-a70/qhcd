// ============ INTERFACES ============
export interface FormData {
  // Step 1: Personal Info
  fullName: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ' | '';
  phoneNumber: string;
  cccd: string;
  maSoAdaOrCccd: string;
  tuyenDauNhom: string;
  tuyenTrenPlatinum: string;
  isVegetarian: 'Có' | 'Không' | '';
  attendanceCount: string;
  
  // Step 2: Services & Uniform
  uniformOption: 'mac-dinh' | 'tu-chuan-bi';
  shirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
  transportOption: 'btc' | 'tu-di';
}

export interface PricingBreakdown {
  baseTuition: number;
  uniformDiscount: number;
  transportDiscount: number;
  totalAmount: number;
  isRegistrationClosed: boolean;
  isChangeOnly: boolean;
}

// ============ CONSTANTS ============
export const BANK_INFO = {
  bankBin: '970426', // MSB
  accountNumber: '7001031991',
  accountName: 'NGUYEN THI THAO',
  bankName: 'MSB (TMCP Hàng Hải)'
};

export const TUITION_TIERS = {
  normal: { deadline: new Date('2026-07-09T23:59:59+07:00'), price: 2100000 },
};

export const DISCOUNTS = {
  uniform: 200000,
  transport: 100000,
};

// Sample data for dropdowns
export const TUYEN_DAU_NHOM_OPTIONS = [
  'TDI Trần Phạm Bình & Nguyễn Thị Việt Nga',
  'DI Lê Thanh Bình & Nguyễn Minh Thảo',
  'FEMR Nguyễn Thanh Hiếu & Nguyễn Bảo Ngọc',
  'EMR Đào Thu Hiền',
  'EMR Nguyễn Văn Dương & Lê Thị Mai Anh',
  'FDD Nguyễn Thị Hằng & Nguyễn Thanh Tùng',
  // THÊM LỰA CHỌN MỚI Ở ĐÂY, VÍ DỤ:
  // 'TÊN TUYỀN MỚI',
];

export const ATTENDANCE_OPTIONS = ['Lần 1', 'Lần 2', 'Lần 3 trở lên'];

export const TUYEN_TREN_PLATINUM_OPTIONS = [
  'Anh Nguyễn Văn A',
  'Chị Trần Thị B',
  'Anh Lê Văn C',
  'Chị Phạm Thị D',
  'Anh Hoàng Văn E',
  'Chị Đỗ Thị F',
  'Anh Trịnh Văn G',
  'Chị Vũ Thị H',
  'Anh Bùi Văn I',
  'Chị Hồ Thị K',
];

// ============ UTILITY FUNCTIONS ============

/**
 * Remove Vietnamese accents from string
 */
export const removeVietnameseAccents = (str: string): string => {
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
};

/**
 * Calculate base tuition based on current date
 */
export const calculateBaseTuition = (currentDate: Date = new Date()): { price: number; isClosed: boolean; isChangeOnly: boolean } => {
  const changeOnlyDeadline = new Date('2026-07-05T23:59:59+07:00');
  
  if (currentDate > TUITION_TIERS.normal.deadline) {
    return { price: 0, isClosed: true, isChangeOnly: true };
  }
  if (currentDate > changeOnlyDeadline) {
    return { price: TUITION_TIERS.normal.price, isClosed: false, isChangeOnly: true };
  }
  return { price: TUITION_TIERS.normal.price, isClosed: false, isChangeOnly: false };
};

/**
 * Calculate total discount
 */
export const calculateDiscounts = (uniformOption: string, transportOption: string): number => {
  let discount = 0;
  if (uniformOption === 'tu-chuan-bi') discount += DISCOUNTS.uniform;
  if (transportOption === 'tu-di') discount += DISCOUNTS.transport;
  return discount;
};

/**
 * Calculate full pricing breakdown
 */
export const calculatePricing = (formData: Partial<FormData>, currentDate: Date = new Date()): PricingBreakdown => {
  const { price: baseTuition, isClosed: isRegistrationClosed, isChangeOnly } = calculateBaseTuition(currentDate);
  const uniformDiscount = formData.uniformOption === 'tu-chuan-bi' ? DISCOUNTS.uniform : 0;
  const transportDiscount = formData.transportOption === 'tu-di' ? DISCOUNTS.transport : 0;
  const totalAmount = Math.max(0, baseTuition - uniformDiscount - transportDiscount);

  return {
    baseTuition,
    uniformDiscount,
    transportDiscount,
    totalAmount,
    isRegistrationClosed,
    isChangeOnly,
  };
};

/**
 * Format currency in VND
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Generate VietQR URL
 */
export const generateVietQRUrl = (formData: FormData, totalAmount: number, maMemo?: string): string => {
  const amountStr = totalAmount.toString();
  const cleanFullName = removeVietnameseAccents(formData.fullName);
  const description = maMemo ? maMemo : `${cleanFullName} ${formData.phoneNumber} QHCD K23`;
  const encodedDescription = encodeURIComponent(description);
  
  return `https://img.vietqr.io/image/${BANK_INFO.bankBin}-${BANK_INFO.accountNumber}-compact2.png?amount=${amountStr}&addInfo=${encodedDescription}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;
};

/**
 * Generate Zalo message
 */
export const generateZaloMessage = (): string => {
  return `https://zalo.me/0975514256`;
};

// Validation functions
export const validateFullName = (name: string): { valid: boolean; message?: string } => {
  if (!name || name.trim().length === 0) return { valid: false, message: "Vui lòng nhập họ và tên" };
  return { valid: true };
};

export const validatePhone = (phone: string): { valid: boolean; message?: string } => {
  if (!phone || phone.trim().length === 0) return { valid: false, message: "Vui lòng nhập số điện thoại" };
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) return { valid: false, message: "Số điện thoại phải từ 10-11 số" };
  return { valid: true };
};

export const validateIdNumber = (id: string): { valid: boolean; message?: string } => {
  if (!id || id.trim().length === 0) return { valid: false, message: "Vui lòng nhập số" };
  const idRegex = /^[0-9]{9,12}$/;
  if (!idRegex.test(id)) return { valid: false, message: "Số phải từ 9-12 chữ số" };
  return { valid: true };
};

export const validateDate = (date: string): { valid: boolean; message?: string } => {
  if (!date || date.trim().length === 0) return { valid: false, message: "Vui lòng nhập ngày sinh" };
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  if (!dateRegex.test(date)) return { valid: false, message: "Ngày sinh phải ở định dạng dd/mm/yyyy" };
  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  // Remove potentially malicious characters and trim whitespace
  return input.replace(/[<>"'&;]/g, "").trim();
};
