import { useRef, useState, useEffect } from 'react';

const menuItems = [
  {
    id: 1,
    title: "Miyazaki A5 Strip",
    price: "$145",
    description: "Charred leek ash, black garlic jus, fermented plum",
    imageSrc: "/Miyazaki A5 Strip.png",
    videoSrc: "/Miyazaki A5 Strip.mp4",
  },
  {
    id: 2,
    title: "Hokkaido Scallop",
    price: "$48",
    description: "Yuzu kosho brown butter, smoked trout roE, sea grapes",
    imageSrc: "/Hokkaido Scallop.png",
    videoSrc: "/Hokkaido Scallop.mp4",
  },
  {
    id: 3,
    title: "Ember-Roasted Duck",
    price: "$85",
    description: "Spiced honey glaze, foraged mushrooms, celery root puree",
    imageSrc: "/Ember-Roasted Duck.png",
    videoSrc: "/Ember-Roasted Duck.mp4",
  },
  {
    id: 4,
    title: "Smoked Vanilla Bean",
    price: "$24",
    description: "Burnt sugar, dark chocolate cremeux, gold leaf",
    imageSrc: "/Smoked Vanilla Bean.png",
    videoSrc: "/Smoked Vanilla Bean.mp4",
  }
];

const MenuItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.6 } // Triggers when 60% of the circle is visible
    );
    const node = containerRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const shouldPlay = isHovered || isInView;

  useEffect(() => {
    if (shouldPlay && videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play error:", err));
    } else if (!shouldPlay && videoRef.current) {
      videoRef.current.pause();
    }
  }, [shouldPlay]);

  return (
    <div className={`relative flex items-center w-full max-w-5xl mx-auto mb-16 sm:mb-32 last:mb-0 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

      {/* Video Circle */}
      <div className={`w-1/2 flex ${isEven ? 'justify-end pr-4 sm:pr-16' : 'justify-start pl-4 sm:pl-16'} z-10`}>
        <div
          ref={containerRef}
          className="relative w-32 h-32 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-2xl flex-shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* LAYER 1: The Video Background */}
          <video
            ref={videoRef}
            src={item.videoSrc}
            className={`absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-500 ease-in-out ${shouldPlay ? 'opacity-100' : 'opacity-0'}`}
            muted
            playsInline
            loop
          />

          {/* LAYER 2: The Static High-Res Image */}
          <img
            src={item.imageSrc}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover rounded-full z-10 pointer-events-none transition-opacity duration-500 ease-in-out ${shouldPlay ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>
      </div>

      {/* Content Card */}
      <div className={`w-1/2 flex flex-col justify-center ${isEven ? 'pl-4 sm:pl-16 items-start text-left' : 'pr-4 sm:pr-16 items-end text-right'} z-10`}>
        <div className={`flex flex-col sm:flex-row items-start sm:items-baseline gap-1 sm:gap-4 mb-1 sm:mb-2 ${isEven ? '' : 'sm:flex-row-reverse'}`}>
          <h3 className="text-neutral-100 text-base sm:text-xl font-medium font-serif leading-tight">{item.title}</h3>
          <span className="text-neutral-400 font-sans text-xs sm:text-sm tracking-wide">{item.price}</span>
        </div>
        <p className="uppercase text-neutral-400 text-[10px] sm:text-xs tracking-wider sm:tracking-widest leading-relaxed mt-1 sm:mt-2 max-w-sm">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default function MenuTimelineSection() {
  return (
    <section className="relative w-full min-h-screen bg-neutral-950 py-32 overflow-hidden flex flex-col items-center font-sans">

      {/* Central Spine */}
      {/* A tracking line running down the exact center, 24px-32px wide with beautifully rounded capsule ends */}
      <div className="absolute left-1/2 top-8 sm:top-16 bottom-8 sm:bottom-16 -translate-x-1/2 w-3 sm:w-8 bg-amber-900/20 rounded-full z-0 pointer-events-none"></div>

      <div className="relative w-full px-4 sm:px-8 z-10">
        {menuItems.map((item, index) => (
          <MenuItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
