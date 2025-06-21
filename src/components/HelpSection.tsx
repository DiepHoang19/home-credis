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
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
              <img
                src="https://picsum.photos/id/1/200/200"
                alt="Home Credit App"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">
                Ứng dụng Home Credit
              </h3>
              <p className="text-gray-600 mb-4">
                Quản lý khoản vay, thanh toán dễ dàng và nhận nhiều ưu đãi hấp
                dẫn với ứng dụng Home Credit.
              </p>
              <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full">
                Tải ứng dụng
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
              <img
                src="https://picsum.photos/id/2/200/200"
                alt="Home Credit Support"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">Hỗ trợ khách hàng</h3>
              <p className="text-gray-600 mb-4">
                Đội ngũ chăm sóc khách hàng chuyên nghiệp sẵn sàng hỗ trợ bạn
                24/7.
              </p>
              <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full">
                Liên hệ ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
