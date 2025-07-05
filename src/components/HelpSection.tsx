import ButtonCommon from "@/common/button-common";
import { Button } from "./ui/button";

const HelpSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Ứng dụng hấp dẫn
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100  flex items-center justify-center p-2">
              <img
                src="http://api-auction.site/uploads/images/cd_1_791d839154-1751142092031.webp"
                alt="HomeCRD App"
                className="object-contain rounded-xl"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">Ứng dụng HomeCRD</h3>
              <p className="text-gray-600 mb-4">
                Quản lý khoản vay, thanh toán dễ dàng và nhận nhiều ưu đãi hấp
                dẫn với ứng dụng HomeCRD.
              </p>
              <ButtonCommon color="error" sx={{ borderRadius: 10 }}>
                Tải ứng dụng
              </ButtonCommon>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-2">
              <img
                src="http://api-auction.site/uploads/images/cd_1_791d839154-1751142092031.webp"
                alt="HomeCRD Support"
                className=" object-contain rounded-xl"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">Hỗ trợ khách hàng</h3>
              <p className="text-gray-600 mb-4">
                Đội ngũ chăm sóc khách hàng chuyên nghiệp sẵn sàng hỗ trợ bạn
                24/7.
              </p>
              <ButtonCommon color="error" sx={{ borderRadius: 10 }}>
                Liên hệ ngay
              </ButtonCommon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
