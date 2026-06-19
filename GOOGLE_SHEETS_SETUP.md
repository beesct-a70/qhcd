# HƯỚNG DẪN CÀI ĐẶT GOOGLE SHEETS VÀ APPS SCRIPT

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://docs.google.com/spreadsheets/) và tạo một bảng tính mới
2. Đổi tên bảng tính thành: `QHCD K23 - Đăng Ký`
3. Tạo các sheet sau:
   - **Sheet 1**: Đổi tên thành `HocVienDangKy`
   - **Sheet 2**: Đổi tên thành `CauHinh` (tùy chọn, dùng để lưu các cấu hình)

### Cấu trúc sheet `HocVienDangKy`:

Thêm các cột sau vào hàng 1 (tiêu đề):
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|
| STT | MaMemo | HoTen | NgaySinh | GioiTinh | SoDienThoai | CCCD | TuyenDauNhom | TuyenTrenPlatinum | AnChay | SoLanThamDu | PhuongThucAo | CoAo | PhuongTien | BaseTuition | GiamGiaAo | GiamGiaPhuongTien | TongTien | NgayDangKy | TrangThaiThanhToan | ToDuocXep |
| (STT tự tăng) | Mã memo (tự tạo) | Họ tên | Ngày sinh | Giới tính | SĐT | CCCD | Tuyến đầu nhóm | Tuyến trên Platinum | Ăn chay | Số lần tham dự | Phương thức áo | Cỡ áo | Phương tiện | Học phí gốc | Giảm giá áo | Giảm giá phương tiện | Tổng tiền | Ngày đăng ký | Trạng thái thanh toán | Tổ được xếp |

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet vừa tạo, click vào menu: **Extensions** → **Apps Script**
2. Đổi tên project thành: `QHCD K23 Backend`
3. Xóa toàn bộ code mặc định trong file `Code.gs`
4. Dán đoạn code sau vào:

```javascript
// ==============================================
// CẤU HÌNH MẶC ĐỊNH
// ==============================================
const CONFIG = {
  SHEET_NAME: "HocVienDangKy",
  MEMO_PREFIX: "QHCDK23"
};

// ==============================================
// HÀM HỖ TRỢ
// ==============================================

/**
 * Lấy sheet làm việc
 */
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(CONFIG.SHEET_NAME);
}

/**
 * Tạo mã memo duy nhất
 */
function generateMaMemo() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  // Số thứ tự = (dòng cuối - 1) vì hàng 1 là tiêu đề
  const soThuTu = lastRow > 1 ? lastRow : 1;
  
  // Định dạng số thứ tự thành 4 chữ số: 0001, 0002,...
  const sttFormatted = soThuTu.toString().padStart(4, "0");
  
  return `${CONFIG.MEMO_PREFIX}_${sttFormatted}`;
}

/**
 * Lấy thời gian hiện tại định dạng Việt Nam
 */
function getCurrentTimeVN() {
  const now = new Date();
  const formatted = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  return formatted;
}

/**
 * Trả về response JSON
 */
function returnJSON(data, code = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==============================================
// HÀM XỬ LÝ POST (ĐĂNG KÝ)
// ==============================================
function doPost(e) {
  try {
    // Parse dữ liệu từ request
    const requestData = JSON.parse(e.postData.contents);
    
    // Kiểm tra action
    if (requestData.action !== "register") {
      return returnJSON({
        success: false,
        message: "Hành động không hợp lệ!"
      }, 400);
    }
    
    // Validate dữ liệu đầu vào
    const requiredFields = ["hoTen", "soDienThoai", "tongTien"];
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return returnJSON({
          success: false,
          message: `Thiếu trường bắt buộc: ${field}`
        }, 400);
      }
    }
    
    const sheet = getSheet();
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    
    // Tạo mã memo
    const maMemo = generateMaMemo();
    
    // Chuẩn bị dữ liệu để ghi vào sheet
    const rowData = [
      lastRow, // STT
      maMemo, // MaMemo
      requestData.hoTen || "",
      requestData.ngaySinh || "",
      requestData.gioiTinh || "",
      requestData.soDienThoai || "",
      requestData.cccd || "",
      requestData.tuyenDauNhom || "",
      requestData.tuyenTrenPlatinum || "",
      requestData.anChay || "",
      requestData.soLanThamDu || "",
      requestData.phuongThucAo || "",
      requestData.coAo || "",
      requestData.phuongTien || "",
      requestData.baseTuition || 0,
      requestData.giamGiaAo || 0,
      requestData.giamGiaPhuongTien || 0,
      requestData.tongTien || 0,
      getCurrentTimeVN(), // NgayDangKy
      "Chờ duyệt", // TrangThaiThanhToan
      "" // ToDuocXep (điền sau)
    ];
    
    // Ghi dữ liệu vào sheet
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Lưu lại thay đổi
    SpreadsheetApp.flush();
    
    // Trả về kết quả thành công
    return returnJSON({
      success: true,
      message: "Đăng ký thành công!",
      maMemo: maMemo,
      soTien: requestData.tongTien
    });
    
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return returnJSON({
      success: false,
      message: `Đã xảy ra lỗi: ${error.message}`
    }, 500);
  }
}

// ==============================================
// HÀM XỬ LÝ GET (TRA CỨU)
// ==============================================
function doGet(e) {
  try {
    const phoneNumber = e.parameter.phone;
    
    if (!phoneNumber) {
      return returnJSON({
        success: false,
        message: "Vui lòng cung cấp số điện thoại!"
      }, 400);
    }
    
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    
    // Bắt đầu tìm từ hàng 2 (bỏ qua tiêu đề)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const sheetPhone = String(row[5]).trim(); // Cột F là SoDienThoai
      const inputPhone = String(phoneNumber).trim();
      
      // So sánh số điện thoại (bỏ qua các ký tự không phải số)
      const cleanSheetPhone = sheetPhone.replace(/\D/g, "");
      const cleanInputPhone = inputPhone.replace(/\D/g, "");
      
      if (cleanSheetPhone === cleanInputPhone) {
        // Tìm thấy học viên!
        return returnJSON({
          success: true,
          message: "Tìm thấy thông tin học viên!",
          data: {
            hoTen: row[2],
            soDienThoai: row[5],
            tinhTrangThanhToan: row[19],
            soTienCanDong: row[17],
            toDuocXep: row[20] || "",
            ngayDangKy: row[18]
          }
        });
      }
    }
    
    // Không tìm thấy
    return returnJSON({
      success: false,
      message: "Không tìm thấy thông tin học viên với số điện thoại này!"
    }, 404);
    
  } catch (error) {
    console.error("Lỗi tra cứu:", error);
    return returnJSON({
      success: false,
      message: `Đã xảy ra lỗi: ${error.message}`
    }, 500);
  }
}
```

## Bước 3: Triển khai Apps Script thành Web App

1. Trong Apps Script, click nút **Deploy** (góc phải trên cùng) → chọn **New deployment**
2. Cấu hình như sau:
   - **Select type**: Chọn **Web app**
   - **Execute as**: Chọn **Me (your-email@gmail.com)** (Điều này rất quan trọng để script có quyền ghi vào Sheet!)
   - **Who has access**: Chọn **Anyone** (Để GitHub Pages có thể gọi API!)
3. Click nút **Deploy**
4. Ở bước tiếp theo, hệ thống có thể hỏi quyền truy cập. Bạn cần:
   - Click **Review permissions**
   - Chọn tài khoản Google của bạn
   - Nếu thấy cảnh báo "Google hasn’t verified this app", click **Advanced** → **Go to QHCD K23 Backend (unsafe)**
   - Click **Allow** để cấp quyền
5. Sau khi deploy xong, bạn sẽ thấy một **URL** giống như:
   ```
   https://script.google.com/macros/s/AKfycbw123456789abcdefghijklmnopqrstuvwxyz123456789/exec
   ```
6. **Sao chép URL này lại**!

## Bước 4: Cập nhật URL vào Next.js

1. Mở file `src/config/api.ts` trong dự án Next.js
2. Thay thế giá trị của `GOOGLE_APPS_SCRIPT_URL` bằng URL bạn vừa sao chép:
   ```typescript
   export const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw123456789abcdefghijklmnopqrstuvwxyz123456789/exec";
   ```
3. Lưu file

## Bước 5: Kiểm tra hoạt động

1. Chạy dự án Next.js: `npm run dev`
2. Điền form đăng ký thử
3. Kiểm tra xem dữ liệu có được ghi vào Google Sheet không
4. Thử tra cứu thông tin bằng số điện thoại vừa đăng ký

## Bảo vệ hệ thống (Tùy chọn nhưng nên làm)

### 1. Đổi tên sheet để bảo vệ
Nếu bạn lo lắng về việc lộ tên sheet, bạn có thể đổi tên sheet thành một tên khó đoán hơn, sau đó cập nhật lại `SHEET_NAME` trong `CONFIG`.

### 2. Sử dụng Cloudflare (Nếu có tên miền riêng)
Nếu bạn sử dụng tên miền riêng, hãy kết nối Cloudflare để:
- Chống DDoS
- Chống bot tự động spam form
- Tăng tốc độ truy cập

### 3. Thêm Rate Limiting vào Apps Script (Nâng cao)
Bạn có thể sửa code để giới hạn số lần đăng ký từ một IP trong một khoảng thời gian.

### 4. Thêm Google reCAPTCHA vào form (Nâng cao)
Để chống bot spam, bạn có thể tích hợp reCAPTCHA vào form đăng ký.

## Lưu ý quan trọng

1. **KHÔNG CÔNG KHAI ID HOẶC LINK GOOGLE SHEET**: Không chia sẻ link Google Sheet cho người ngoài!
2. **KHÔNG ĐƯỜC CHỈNH SỬA CODE TRƯỚC KHI HIỂU RÕ**: Nếu bạn không hiểu rõ, không nên chỉnh sửa code Apps Script!
3. **LUÔN LƯU LẠI PHIÊN BẢN SAO CHÉP**: Trước khi chỉnh sửa Sheet hay Script, hãy tạo bản sao để backup!

## Hỗ trợ

Nếu gặp khó khăn, hãy kiểm tra:
1. Logs trong Apps Script (menu **Executions**)
2. Console trong trình duyệt (F12 → Console)
3. Đảm bảo URL Apps Script chính xác
