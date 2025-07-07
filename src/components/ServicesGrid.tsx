import ButtonCommon from "@/common/button-common";

const services = [
  {
    id: 1,
    title: "Vay tiền mặt",
    description: "Giải ngân nhanh chóng, thủ tục đơn giản",
    image:
      "http://api-auction.site/uploads/images/cc1_1_6663544a3a-1751142092030.webp",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 2,
    title: "Thẻ tín dụng",
    description: "Thanh toán linh hoạt, nhiều ưu đãi hấp dẫn",
    image:
      "http://api-auction.site/uploads/images/cd_1_791d839154-1751142092031.webp",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 3,
    title: "Tài khoản trả sau",
    description: "Mua trước, trả sau dễ dàng",
    image:
      "http://api-auction.site/uploads/images/CL_1_69f62e6b8a-1751142092032.webp",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 4,
    title: "Tài khoản trả sau",
    description: "Mua trước, trả sau dễ dàng",
    image:
      "http://api-auction.site/uploads/images/HPL_41ef204406-1751142092033.webp",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 5,
    title: "Tài khoản trả sau",
    description: "Mua trước, trả sau dễ dàng",
    image:
      "http://api-auction.site/uploads/images/VAS_1_c606e6597c-1751142092034.webp",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 6,
    title: "Tài khoản trả sau",
    description: "Mua trước, trả sau dễ dàng",
    image:
      "http://api-auction.site/uploads/images/web_banner_desktop_6_960ccea116-1751142092035.webp",
    buttonText: "Tìm hiểu thêm",
  },
];

const ServicesGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12" id="news">
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

      <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src="http://api-auction.site/uploads/images/20-300x300-1751142622512.jpg"
              alt="Trợ giúp dịch vụ"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">
              Trợ giúp dịch vụ khách hàng
            </h3>
            <p className="text-gray-600 mb-4">
              HomeCRD luôn sẵn sàng hỗ trợ khách hàng 24/7. Đội ngũ chăm sóc
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
