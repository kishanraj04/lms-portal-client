import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { Box, CardMedia, Typography } from "@mui/material";

const images = [];

for (let i = 1; i <= 5; i++) {
  images.push({
    url: `/caurausal/img${i}.jpg`, // ✅ correct path from public folder
  });
}

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", display:"flex" , justifyContent:"center", alignItems:"center" , mt:"15px"}}>
     <Box sx={{ width: "95%", overflow: "hidden" }}>
         <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ position: "relative", outline: "none" }}>
            <CardMedia
              component="img"
              image={item?.url}
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px", md: "400px" },
                objectFit: "fill",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "#fff",
                textShadow: "0 0 5px rgba(0,0,0,0.5)",
              }}
            >
              {/* Optional Caption */}
            </Typography>
          </Box>
        ))}
      </Slider>
     </Box>
    </Box>
  );
};

export default Carousel;
