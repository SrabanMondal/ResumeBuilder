import React, { useEffect, useRef } from "react";
import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/all";

// Ensure GSAP is registering the plugin
gsap.registerPlugin(MotionPathPlugin);

const images = [
  "/path/to/image1.jpg",
  "/path/to/image2.jpg",
  "/path/to/image3.jpg",
  "/path/to/image4.jpg",
];

const GsapContinuousCarousel = () => {
  const carouselRef = useRef(null);

  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
     

        //const totalWidth = carouselRef.current.scrollWidth; // Get the total width of the carousel
        
        gsap.to(".carousel", {
          xPercent: -100 * images.length, // Scroll through all images
          ease: "none", // Disable easing for smooth linear motion
          duration: images.length * 3, // Adjust duration based on number of images
          repeat: -1, // Infinite loop
          modifiers: {
            xPercent: gsap.utils.wrap(-100 * images.length, 0), // Wraps the xPercent to create a smooth loop
          },
        });
      
    }, carouselRef);

    return () => ctx.revert(); // Clean up on unmount
  }, [slidesToShow]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      width="100%"
      ref={carouselRef}
    >
      <Flex className="carousel" width={`calc(${images.length * 2} * 100vw / ${slidesToShow})`}>
        {images.concat(images).map((src, index) => (
          <Box
            key={index}
            flex={`0 0 calc(100vw / ${slidesToShow})`}
            boxSize="full"
            p={2}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default GsapContinuousCarousel;
