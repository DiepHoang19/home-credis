const points = [
  {
    id: 1,
    title: 'Duyệt hồ sơ nhanh chóng',
    icon: '⚡'
  },
  {
    id: 2,
    title: 'Lãi suất cạnh tranh',
    icon: '💰'
  },
  {
    id: 3,
    title: 'Dịch vụ chuyên nghiệp',
    icon: '👨‍💼'
  },
  {
    id: 4,
    title: 'Hỗ trợ 24/7',
    icon: '🕒'
  },
  {
    id: 5,
    title: 'Bảo mật thông tin',
    icon: '🔒'
  }
];

const ThreePoints = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">3 phút <span className="text-[#E11E31]">duyệt vay nhanh chóng</span></h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {points.map((point) => (
          <div key={point.id} className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl mb-2">{point.icon}</div>
            <h3 className="font-medium text-gray-800">{point.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreePoints;