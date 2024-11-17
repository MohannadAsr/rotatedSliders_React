import Slider from '@components/Slider';
import { useEffect, useState } from 'react';

function App() {
  // const [scrollSpeed, setScrollSpeed] = useState<null | number>(null);
  const [reverseDirection, setReverseDirection] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      // Reverse direction based on scroll direction
      setReverseDirection(currentScrollTop < lastScrollTop);

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <main className=" py-20">
      <div className="w-full flex flex-row justify-center items-center relative z-30 pb-[5rem] pt-[5rem] lg:pt-[10rem] lg:pb-[10rem] overflow-clip">
        <div className="relative rotate-[-7.1deg] flex-shrink-0 origin-center flex flex-col items-start overflow-clip justify-start gap-[0.5rem] lg:gap-[0.8rem] w-[130vw] max-w-[unset]">
          <div className="absolute top-[-3rem] start-0 w-full h-[10rem] lg:h-[24rem] from-white to-transparent bg-gradient-to-b z-[10]"></div>
          <div className="absolute bottom-[-1rem] start-0 w-full h-[10rem] lg:h-[24rem] from-white to-transparent bg-gradient-to-t z-[10]"></div>
          <Slider reverse={reverseDirection} />
          <Slider reverse={!reverseDirection} />
          <Slider reverse={reverseDirection} />
        </div>
      </div>
    </main>
  );
}

export default App;
