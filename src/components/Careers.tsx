import { Button } from './ui/button';

const Careers = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Khám phá sự nghiệp cùng Home Credit</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src="https://picsum.photos/id/28/400/300" 
              alt="Careers at Home Credit" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">Cơ hội nghề nghiệp</h3>
            <p className="text-gray-600 mb-4">
              Home Credit Việt Nam luôn tìm kiếm những tài năng để cùng phát triển và mang đến những giải pháp 
              tài chính tốt nhất cho khách hàng. Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, 
              năng động và nhiều cơ hội phát triển.
            </p>
            <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;