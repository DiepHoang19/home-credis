import ButtonCommon from "@/common/button-common";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Vay tiền mặt",
    description: "Giải ngân nhanh chóng, thủ tục đơn giản",
    image: "https://picsum.photos/id/1/300/200",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 2,
    title: "Thẻ tín dụng",
    description: "Thanh toán linh hoạt, nhiều ưu đãi hấp dẫn",
    image: "https://picsum.photos/id/2/300/200",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 3,
    title: "Tài khoản trả sau",
    description: "Mua trước, trả sau dễ dàng",
    image: "https://picsum.photos/id/3/300/200",
    buttonText: "Tìm hiểu thêm",
  },
];

const ServicesGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Sản phẩm và Dịch vụ
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ButtonCommon sx={{ borderRadius: 10 }} color="error">
                {service.buttonText}
              </ButtonCommon>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Điện máy</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Mua sắm trả góp 0%</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Thủ tục đơn giản</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Duyệt hồ sơ nhanh chóng</span>
            </li>
          </ul>
          <ButtonCommon sx={{ borderRadius: 10 }} color="error">
            Tìm hiểu thêm
          </ButtonCommon>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Xe máy</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Sở hữu xe máy dễ dàng</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Lãi suất ưu đãi</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Thời gian vay linh hoạt</span>
            </li>
          </ul>

          <ButtonCommon sx={{ borderRadius: 10 }} color="error">
            Tìm hiểu thêm
          </ButtonCommon>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Bảo hiểm</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Bảo vệ toàn diện</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Chi phí hợp lý</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 text-[#E11E31] mr-2" />
              <span>Quy trình bồi thường đơn giản</span>
            </li>
          </ul>
          <ButtonCommon sx={{ borderRadius: 10 }} color="error">
            Tìm hiểu thêm
          </ButtonCommon>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src="https://picsum.photos/id/20/300/300"
              alt="Trợ giúp dịch vụ"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">
              Trợ giúp dịch vụ khách hàng
            </h3>
            <p className="text-gray-600 mb-4">
              Home Credit luôn sẵn sàng hỗ trợ khách hàng 24/7. Đội ngũ chăm sóc
              khách hàng chuyên nghiệp của chúng tôi sẽ giải đáp mọi thắc mắc và
              hỗ trợ bạn trong quá trình sử dụng dịch vụ.
            </p>
            <ButtonCommon sx={{ borderRadius: 10 }} color="error">
              Liên hệ ngay
            </ButtonCommon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
