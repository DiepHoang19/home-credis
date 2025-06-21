import { Button } from './ui/button';

const products = [
  {
    id: 1,
    icon: "https://www.homecredit.vn/static/5fa6d575d4ce2a33c57b2a3be5295032/628fd/Vay_tien_mat_d62dd3ca82.webp",
    title: "Vay tiền mặt",
    description: "Giải pháp tài chính linh hoạt"
  },
  {
    id: 2,
    icon: "https://www.homecredit.vn/static/8e41b7c9d2009136580032a676b5cdc3/628fd/The_tin_dung_81f7005779.webp",
    title: "Thẻ tín dụng",
    description: "Thanh toán tiện lợi, ưu đãi hấp dẫn"
  },
  {
    id: 3,
    icon: "https://www.homecredit.vn/static/fb52743f9217f2361c8675856a5ad18d/628fd/Mua_truoc_tra_sau_aad06bf55c.webp",
    title: "Tài khoản trả sau",
    description: "Mua trước, trả sau linh hoạt"
  },
  {
    id: 4,
    icon: "https://www.homecredit.vn/static/03cf3084799bb8f06aab0e4a920a87d8/628fd/Vay_dien_may_ad9dcf7435.webp",
    title: "Trả góp Điện máy",
    description: "Mua sắm dễ dàng, trả góp 0%"
  },
  {
    id: 5,
    icon: "https://www.homecredit.vn/static/04cd92e3d482f675713c01c81aadcc8a/628fd/Vay_xe_may_7591041bf3.webp",
    title: "Trả góp Xe máy",
    description: "Sở hữu xe máy dễ dàng"
  },
  {
    id: 6,
    icon: "https://www.homecredit.vn/static/99ccea765d0dfc6d41e10e05e3869b40/628fd/Bao_hiem_9f0c92f1d0.webp",
    title: "Bảo hiểm",
    description: "An tâm tài chính, bảo vệ tương lai"
  }
];

const ProductServices = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col items-center text-center p-4 hover:shadow-md rounded-lg transition-shadow duration-300"
          >
            <img 
              src={product.icon} 
              alt={product.title} 
              className="w-16 h-16 mb-3"
            />
            <h3 className="font-medium text-[#383838] mb-1">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductServices;