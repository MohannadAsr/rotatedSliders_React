import { useAnimation, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
const images = [
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_4f1ac0b4.webp',
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8816d2de.webp',
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8fcc9727.webp',
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_5798518a.webp',
];

function Slider({ reverse = false, startPosition = 0, baseSpeed = 0.05 }) {
  const controls = useAnimation();
  const [scrollAmount, setScrollAmount] = useState(startPosition);
  const [isReseting, setisReseting] = React.useState<boolean>(false);

  // Update slider movement based on baseSpeed and direction
  useEffect(() => {
    let frameId;
    const speed = baseSpeed * (reverse ? -1 : 1);

    const animate = () => {
      setScrollAmount((prev) => {
        const newScroll = prev + speed;

        if (newScroll >= 25 && !reverse) {
          return 0;
        } else if (newScroll <= 0 && reverse) {
          return 25;
        }
        return newScroll;
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frameId);
  }, [baseSpeed, reverse]);

  return (
    <motion.div
      animate={{ x: `-${scrollAmount}%` }}
      transition={{
        type: 'linear', // Enables spring-based animation
        ease: 'linear', // Enables spring-based animation
        duration: 0, // Adjust duration for smoothness
      }}
      className="slider-container animation-right flex items-start flex-row justify-center gap-[0.5rem] lg:gap-[0.8rem] flex-nowrap max-w-[unset] relative"
    >
      {Array.from({ length: 4 })
        .map((item) => [...images])
        .flatMap((item) => item)
        .map((item, index) => {
          return (
            <div
              key={index}
              className={`w-[20rem] inline-block lg:w-[28rem] object-cover aspect-[592/333]`}
            >
              <img src={item} alt="" className="w-full h-full object-cover" />
            </div>
          );
        })}
    </motion.div>
  );
}

export default Slider;
