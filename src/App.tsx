import Slider from '@components/Slider';
import { useEffect, useState } from 'react';

const mainSpeed = 0.03;

function App() {
  const [baseSpeed, setBaseSpeed] = useState(mainSpeed);
  const [reverseDirection, setReverseDirection] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  let animationId;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const scrollSpeed = Math.abs((currentScrollTop - lastScrollTop) / 900);

      setBaseSpeed(scrollSpeed + 0.02);

      // Reverse direction based on scroll direction
      setReverseDirection(currentScrollTop < lastScrollTop);

      setLastScrollTop(currentScrollTop);

      // Cancel any ongoing deceleration animation when actively scrolling
      cancelAnimationFrame(animationId);
    };

    const smoothDecelerateToMainSpeed = () => {
      animationId = requestAnimationFrame(() => {
        setBaseSpeed((prevSpeed) => {
          const newSpeed = prevSpeed - 0.001; // Adjust this for slower/faster deceleration
          if (newSpeed <= mainSpeed) {
            cancelAnimationFrame(animationId);
            return mainSpeed; // Stop at mainSpeed
          }
          smoothDecelerateToMainSpeed(); // Continue decelerating
          return newSpeed;
        });
      });
    };

    const resetSpeed = () => {
      smoothDecelerateToMainSpeed();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', resetSpeed);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', resetSpeed);
      cancelAnimationFrame(animationId); // Clean up animation
    };
  }, [lastScrollTop]);

  return (
    <main>
      {/* <Routes>
        <Route path=":id" element={<MainPage />} />
        <Route
          path="*"
          element={
            <div className=" h-[100dvh] flex items-center justify-center text-xl text-gray-500">
              Screen Not Found
            </div>
          }
        />
      </Routes> */}
      <div className="w-full flex flex-row justify-center items-center relative z-30 pb-[5rem] pt-[5rem] lg:pt-[10rem] lg:pb-[10rem] overflow-clip">
        <div className="relative rotate-[-7.1deg] flex-shrink-0 origin-center flex flex-col items-start overflow-clip justify-start gap-[0.5rem] lg:gap-[0.8rem] w-[130vw] max-w-[unset]">
          <div className="absolute top-[-3rem] start-0 w-full h-[10rem] lg:h-[20rem] from-white to-transparent bg-gradient-to-b z-[10]"></div>
          <div className="absolute bottom-[-1rem] start-0 w-full h-[10rem] lg:h-[22rem] from-white to-transparent bg-gradient-to-t z-[10]"></div>
          <Slider baseSpeed={baseSpeed} reverse={reverseDirection} />
          <Slider
            startPosition={25}
            baseSpeed={baseSpeed}
            reverse={!reverseDirection}
          />
          <Slider baseSpeed={baseSpeed} reverse={reverseDirection} />
        </div>
      </div>
    </main>
  );
}

export default App;
