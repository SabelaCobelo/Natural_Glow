import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css"; // Archivo CSS personalizado

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <div className="w-full max-w-lg mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </SwiperSlide>
                ))}

                {/* Flechas de navegación personalizadas */}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </Swiper>
        </div>
    );
};

export default Carousel;