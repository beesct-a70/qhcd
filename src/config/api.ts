// CẤU HÌNH GOOGLE APPS SCRIPT URL (Updated 2026-06-26)
const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "";
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

// CẤU HÌNH THÔNG TIN NGÂN HÀNG
export const BANK_INFO = {
  bankBin: process.env.NEXT_PUBLIC_BANK_BIN || "",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "",
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "",
  bankName: process.env.NEXT_PUBLIC_BANK_NAME || ""
};

// CÁC ENDPOINT CHỨC NĂNG
export const API_ENDPOINTS = {
  REGISTER: `${GOOGLE_APPS_SCRIPT_URL}?key=${encodeURIComponent(SECRET_KEY)}`,
  LOOKUP: `${GOOGLE_APPS_SCRIPT_URL}?key=${encodeURIComponent(SECRET_KEY)}`,
} as const;