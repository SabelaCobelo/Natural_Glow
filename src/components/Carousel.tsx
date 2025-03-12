import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <div className="w-full max-w-xs mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg" /* Cambié a w-20 h-20 */
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
