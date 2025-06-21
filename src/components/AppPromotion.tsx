import ButtonCommon from "@/common/button-common";

const AppPromotion = () => {
  return (
    <div className="app-promotion-bg py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Home App - Chuẩn tài chính số
          </h2>
          <p className="mb-6">
            Tải ngay ứng dụng Home Credit để quản lý khoản vay, thanh toán dễ
            dàng và nhận nhiều ưu đãi hấp dẫn. Với giao diện thân thiện và tính
            năng đa dạng, Home App sẽ giúp bạn quản lý tài chính hiệu quả.
          </p>

          <ButtonCommon color="error" sx={{ borderRadius: 10 }}>
            Tải ứng dụng ngay
          </ButtonCommon>
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;
