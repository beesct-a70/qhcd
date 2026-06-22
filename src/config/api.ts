// CẤU HÌNH GOOGLE APPS SCRIPT URL (HARDCODE TẠM THỜI ĐỂ TEST)
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/.../exec"; // THAY URL CỦA BẠN VÀO ĐÂY
const SECRET_KEY = "Hn121KnM^"; // THAY KEY CỦA BẠN VÀO ĐÂY

// CÁC ENDPOINT CHỨC NĂNG
export const API_ENDPOINTS = {
  REGISTER: `${GOOGLE_APPS_SCRIPT_URL}?key=${encodeURIComponent(SECRET_KEY)}`,
  LOOKUP: `${GOOGLE_APPS_SCRIPT_URL}?key=${encodeURIComponent(SECRET_KEY)}`,
} as const;