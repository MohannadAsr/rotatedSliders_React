import { useMotionValue, animate, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { smoothTransition } from './Smooth';
import { useCustomHooks } from '@src/hooks/useCustomHooks';

const images = [
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_4f1ac0b4.webp',
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8816d2de.webp',
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8fcc9727.webp',
  'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_5798518a.webp',
];

const durationType = { fast: 10, normal: 15 };

const Slider = React.memo<{ reverse: boolean }>(({ reverse }) => {
  const { useTimerFn } = useCustomHooks();
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(reverse ? width : 0);
  const [duration, setDuration] = useState<number>(durationType.normal);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRender] = useState(false);

  useEffect(() => {
    let controls;
    const finalPosition = reverse ? 0 : -width / 2 - 8;
    if (mustFinish) {
      //  Calc The Remaining Duration
      const fullDisctance = reverse ? width / 2 : width / 2 - 8;
      // const modifiedFinalPosition =
      // Remaining Duration
      const remainingDuration = !reverse
        ? duration *
          ((fullDisctance - Math.abs(xTranslation.get())) / fullDisctance)
        : duration -
          duration *
            ((fullDisctance - Math.abs(xTranslation.get())) / fullDisctance);

      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: remainingDuration,
        repeatDelay: 0,
        onComplete: () => {
          setMustFinish(false);
          setRender(!rerender);
        },
      });
    } else {
      controls = animate(
        xTranslation,
        [reverse ? -width / 2 - 8 : 0, finalPosition],
        {
          ease: 'linear',
          duration: duration,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        }
      );
    }

    return controls?.stop;
  }, [xTranslation, width, rerender, mustFinish, duration, reverse]);

  // Scroll Speed & Change onScroll
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // Scroll Speed & Change onScroll
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState(Date.now());

  React.useEffect(() => {
    const setScroll = () => {
      // if (isScrolling) return;
      // setIsScrolling(true);
      const currentScrollTop = window.scrollY; // Current scroll position
      const currentTimestamp = Date.now(); // Current time

      const pixelsScrolled = Math.abs(currentScrollTop - lastScrollTop); // Distance scrolled

      // // Set limits for duration and sensitivity factor
      const minDuration = 1; // Fastest possible speed
      const maxDuration = 11; // Slowest possible speed
      const speedFactor = 80; // Sensitivity control for speed adjustment

      // // Calculate dynamic duration: lower duration for more pixels scrolled
      const dynamicFastDuration = Math.max(
        minDuration,
        maxDuration - pixelsScrolled / speedFactor
      );

      // Calculate time elapsed
      const timeElapsed = currentTimestamp - lastTimestamp;

      // Calculate speed (pixels per millisecond)
      const speed = timeElapsed > 0 ? pixelsScrolled / timeElapsed : 0;

      setDuration((prev) => {
        setMustFinish(true);
        const newVal = prev - speed / 2 <= 2 ? 2 : prev - speed / 2;
        return newVal;
      });

      setLastScrollTop(currentScrollTop);
      setLastTimestamp(currentTimestamp);

      useTimerFn(() => {
        setIsScrolling(false); // Reset scrolling state after the transition

        smoothTransition(
          duration, // Current value
          durationType.normal, // Target value
          200, // Duration of the transition (300ms)
          (value) => {
            if (isScrolling) return;
            setDuration(value); // Update duration state
            setMustFinish(true);
          },
          () => {
            setMustFinish(true);
          }
        );
      }, 50);
    };

    // const clearScroll = () => {};

    window.addEventListener('scroll', setScroll);
    // window.addEventListener('scrollend', clearScroll);

    return () => {
      window.removeEventListener('scroll', setScroll);
      // window.removeEventListener('scrollend', clearScroll);
    };
  }, [lastScrollTop, isScrolling]);

  return (
    <motion.div
      style={{ x: xTranslation }}
      ref={ref}
      className="slider-container animation-right flex items-start flex-row justify-center gap-[0.5rem] lg:gap-[0.8rem]  flex-nowrap max-w-[unset] relative"
    >
      {[...images, ...images].map((item, index) => (
        <div
          key={index}
          className="w-[18rem] inline-block lg:w-[30rem] object-cover aspect-[592/333] "
        >
          <img src={item} alt="" className="w-full h-full object-cover " />
        </div>
      ))}
    </motion.div>
  );
});

export default Slider;
