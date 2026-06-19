import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const contacts = [
    {
      name: "Lê Thanh Bình",
      role: "Trưởng BTC",
      phone: "0912345678",
      zalo: "0912345678"
    },
    {
      name: "Lương Sơn Hưng",
      role: "Phó BTC",
      phone: "0967462091",
      zalo: "0967462091"
    },
    {
      name: "Nguyễn Trung Kiên",
      role: "Hỗ trợ",
      phone: "0949979911",
      zalo: "0949979911"
    }
  ];

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Liên hệ Ban Tổ Chức
          </h1>
          <p className="text-lg text-slate-600">
            Mọi thắc mắc về khóa học, vui lòng liên hệ với chúng tôi!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xl hover:border-orange-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{contact.name}</h3>
                  <p className="text-orange-600 font-semibold">{contact.role}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-slate-700 hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{contact.phone}</span>
                </a>
                <a
                  href={`https://zalo.me/${contact.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-orange-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Zalo: {contact.zalo}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-orange-500" />
            Thông tin khác
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Địa điểm học</h3>
              <a 
                href="https://www.google.com/maps/search/Khu+điều+dưỡng+295+-+Khu+A,+Đồ+Sơn,+Hải+Phòng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-orange-500 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <div>
                  <p>Khu điều dưỡng 295 - Khu A</p>
                  <p>Đồ Sơn, Hải Phòng</p>
                </div>
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Thời gian</h3>
              <p className="text-slate-700">11 - 12 tháng 7 năm 2026</p>
              <p className="text-slate-600">2 ngày 1 đêm</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Mạng xã hội</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
