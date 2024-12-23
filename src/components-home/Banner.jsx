import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Banner = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='md:flex'>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div
            className="hero"
            style={{
              backgroundImage: "url(https://i.ibb.co/VTGYmPw/artifact-1.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md p-4">
                <h1 className="mb-5 text-5xl font-bold">Pieces of the Puzzle: Tracing Human History</h1>
                <p className="mb-5">
                  Explore artifacts that reveal the triumphs, struggles, and dreams of humanity.
                </p>
                <button className="btn btn-primary" onClick={handleNavigateToLogin}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero"
            style={{
              backgroundImage: "url(https://i.ibb.co/8mDrQdC/artifact-2.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Timeless Treasures: A Journey Through Artifacts</h1>
                <p className="mb-5">
                  Discover the objects that connect us to the lives and legacies of our ancestors.
                </p>
                <button className="btn btn-primary" onClick={handleNavigateToLogin}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero"
            style={{
              backgroundImage: "url(https://i.ibb.co/HXgjPv6/artifacts-3.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Echoes of the Past: Unearthing Ancient Wonders</h1>
                <p className="mb-5">
                  Step into the stories of civilizations through artifacts that shaped our history.
                </p>
                <button className="btn btn-primary" onClick={handleNavigateToLogin}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
