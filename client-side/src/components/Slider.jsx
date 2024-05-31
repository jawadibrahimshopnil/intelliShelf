import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-64 sm:min-w-96 sm:max-w-sm"
        >
            <SwiperSlide><img src="https://img.freepik.com/premium-photo/bookstore-library-with-books-other-merchandise-sale-created-with-generative-ai_124507-169849.jpg" /></SwiperSlide>
            <SwiperSlide><img src="https://img.freepik.com/free-photo/cafe-frankfurt-germany_1268-20912.jpg" /></SwiperSlide>
            <SwiperSlide><img src="https://img.freepik.com/premium-photo/interior-library_492154-26482.jpg" /></SwiperSlide>
            <SwiperSlide><img src="https://img.freepik.com/premium-photo/interior-library_492154-26570.jpg" /></SwiperSlide>
        </Swiper>
    );
};

export default Slider;