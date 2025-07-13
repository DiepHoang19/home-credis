import ButtonCommon from "@/common/button-common";
import { setIsShow } from "@/redux/slices/toggleBoxChat";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const getYear = new Date();
  const isShow = useSelector((state: any) => state.toggleBoxChat.isShow);
  const dispatch = useDispatch();
  return (
    <footer className="bg-[#E11E31] text-white rounded-tl-4xl rounded-tr-4xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Lịch sử phát triển
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tầm nhìn & Sứ mệnh
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cơ hội nghề nghiệp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline"
                  onClick={() => dispatch(setIsShow(true))}
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sản phẩm & Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Vay tiền mặt
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Thẻ tín dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tài khoản trả sau
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trả góp Điện máy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trả góp Xe máy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bảo hiểm
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điểm giao dịch
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Kết nối với chúng tôi
            </h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-gray-200">
                <Facebook />
              </a>
              <a href="#" className="hover:text-gray-200">
                <Youtube />
              </a>
              <a href="#" className="hover:text-gray-200">
                <Instagram />
              </a>
              <a href="#" className="hover:text-gray-200">
                <Linkedin />
              </a>
            </div>
            <p className="mb-4">Hotline: 1900 7458</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-sm">
          <p>© {getYear.getFullYear()} HomeCRD Vietnam.</p>
          <p className="mt-2">
            Công ty TNHH MTV Tài chính HomeCre Việt Nam – Giấy phép đăng ký hoạt
            động số 95/GP-NHNN do Ngân hàng Nhà nước cấp ngày 28/09/2018.
          </p>
          <p className="mt-2">
            Địa chỉ: Tầng G, 8 và 10 Tòa nhà Phụ Nữ, Số 20 Nguyễn Đăng Giai,
            Phường Thảo Điền, TP. Thủ Đức, TP.HCM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
