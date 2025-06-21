import ButtonCommon from "@/common/button-common";
import { Button } from "./ui/button";

const Partners = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Đối tác của Home Credit
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center"
          >
            <img
              src={`https://picsum.photos/id/${id + 30}/200/100`}
              alt={`Partner ${id}`}
              className="max-h-16 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <ButtonCommon color="error" sx={{ borderRadius: 10 }}>
          Xem tất cả đối tác
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Partners;
