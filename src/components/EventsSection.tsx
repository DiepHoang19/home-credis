import { Button } from './ui/button';

const events = [
  {
    id: 1,
    title: 'Sự kiện nổi bật',
    image: 'https://picsum.photos/id/10/300/200',
    description: 'Khám phá các sự kiện và chương trình ưu đãi mới nhất từ Home Credit.',
    buttonText: 'Xem thêm'
  },
  {
    id: 2,
    title: 'Tin tức mới nhất',
    image: 'https://picsum.photos/id/11/300/200',
    description: 'Cập nhật tin tức và thông tin mới nhất về Home Credit và ngành tài chính.',
    buttonText: 'Xem thêm'
  }
];

const EventsSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Sự kiện nổi bật</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full">
                {event.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;