import ButtonCommon from "@/common/button-common";
import { Button } from "./ui/button";

const Careers = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 rounded-3xl mb-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Khám phá sự nghiệp cùng HomeCRD
      </h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src="https://picsum.photos/id/28/400/300"
              alt="Careers at HomeCRD"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">Cơ hội nghề nghiệp</h3>
            <p className="text-gray-600 mb-4">
              HomeCRD Việt Nam luôn tìm kiếm những tài năng để cùng phát triển
              và mang đến những giải pháp tài chính tốt nhất cho khách hàng.
              Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, năng động và
              nhiều cơ hội phát triển.
            </p>
            <ButtonCommon color="error" sx={{ borderRadius: 10 }}>
              Tìm hiểu thêm
            </ButtonCommon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
