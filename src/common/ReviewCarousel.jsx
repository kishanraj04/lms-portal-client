import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const ReviewCarousel = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      style={{ width: "100%", padding: 20 }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {reviews.map((rev, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              background: "white",
              color: "black",
              padding: "1.5rem",
              borderRadius: "10px",
              textAlign: "center",
              maxWidth: "500px",
              margin: "auto",
              width: "100%",
              boxShadow: "1px 1px 5px black",
              //  border:"1px solid black"
            }}
          >
            <img
              src={rev.reviewer?.avatar}
              alt={rev.reviewer?.name}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h3>{rev.reviewer?.name}</h3>
            <p style={{ fontStyle: "italic", marginTop: "10px" }}>
              "{rev.review}"
            </p>
            <p style={{ marginTop: "10px" }}>
              {Array.from({ length: rev?.rating || 0 }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCarousel;
