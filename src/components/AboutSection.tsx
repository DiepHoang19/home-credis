import { Button } from "./ui/button";

const stats = [
  { id: 1, value: "16 Triệu", label: "Khách hàng" },
  { id: 2, value: "6,000", label: "Nhân viên" },
  { id: 3, value: "16,000", label: "Điểm bán hàng" },
  { id: 4, value: "63", label: "Tỉnh thành" },
];

const AboutSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Về Home Credit Việt Nam
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <p className="text-gray-700 mb-4">
              Home Credit Việt Nam là công ty tài chính tiêu dùng quốc tế đã có
              mặt tại Việt Nam từ năm 2008, chuyên cung cấp các dịch vụ tài
              chính tiêu dùng đơn giản, thông minh và thân thiện cho tất cả mọi
              người.
            </p>
            <p className="text-gray-700 mb-6">
              Với đội ngũ nhân viên chuyên nghiệp cùng mạng lưới chi nhánh rộng
              khắp, Home Credit cam kết mang đến những giải pháp tài chính phù
              hợp với nhu cầu của khách hàng.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-[#E11E31] text-xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-[#E11E31]/10 rounded-full p-6">
                <img
                  src="https://www.homecredit.vn./static/b22fc1561a5821fa6745e558a104d838/0f57a/Web_banner_desktop_7a8bb72a4e.webp"
                  alt="Home Credit App"
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full px-6">
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
