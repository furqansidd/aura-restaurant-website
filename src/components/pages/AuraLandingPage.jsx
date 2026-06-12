import { useState, useEffect } from 'react';
import MenuTimelineSection from '../MenuTimelineSection';

const AuraLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-800 selection:text-neutral-50 overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-[0.3em] text-white z-50 relative">AURA</div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12">
            {['MENU', 'THE EXPERIENCE', 'RESERVATIONS'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white relative group transition-colors duration-300"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white focus:outline-none z-50 relative w-6 h-[14px] flex flex-col justify-between"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block h-[1px] w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-[1px] w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1px] w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-neutral-950/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out z-40 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center space-y-12">
          {['MENU', 'THE EXPERIENCE', 'RESERVATIONS'].map((item, idx) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm uppercase tracking-[0.4em] text-white hover:text-neutral-400 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${isMobileMenuOpen ? idx * 100 + 200 : 0}ms` }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Section A: Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-neutral-900">
        <video
          src="/Wagyu_ribeye_with_wine_reduction_202606112039.mp4"
          muted
          playsInline
          autoPlay
          loop
          className="object-cover object-top w-full h-full absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-neutral-950/50 mix-blend-multiply z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent z-10 pointer-events-none"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <h2 className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-6 drop-shadow-md">An Immersive Culinary Journey</h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-white mb-10 drop-shadow-lg">
              THE ART OF<br />THE SEAR.
            </h1>
            <button className="border border-white/50 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-neutral-950 transition-all duration-300 ease-in-out backdrop-blur-sm">
              Secure A Table
            </button>
          </div>
        </div>
      </section>

      {/* Section B: Editorial Narrative */}
      <section id="the-experience" className="py-32 px-8 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 w-full items-start">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="flex items-center space-x-4 md:space-x-0 md:flex-col md:items-start md:space-y-4">
              <span className="text-neutral-500 text-xs tracking-[0.2em]">01</span>
              <div className="w-12 h-[1px] bg-neutral-700 md:w-[1px] md:h-12 hidden md:block"></div>
              <h3 className="text-neutral-400 text-xs tracking-[0.2em] uppercase transform md:-rotate-90 md:origin-top-left md:translate-y-24 md:translate-x-3 mt-0 whitespace-nowrap">Philosophy</h3>
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <p className="text-xl md:text-3xl lg:text-4xl font-serif text-neutral-200 leading-relaxed max-w-3xl">
              We believe in fire, smoke, and time. Every cut of our dry-aged Wagyu is charred over native hardwood embers, bridging raw elemental cooking with meticulous modern gastronomy.
            </p>
          </div>
        </div>
      </section>

      {/* Section C: Curated Menu Showcase */}
      <div id="menu">
        <MenuTimelineSection />
      </div>

      {/* Section D: Reservation Footer */}
      <footer id="reservations" className="py-32 px-8 flex flex-col items-center justify-center min-h-[80vh] bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="font-serif text-[20vw] leading-none whitespace-nowrap">AURA</span>
        </div>

        <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-16">Join Us At The Counter.</h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 w-full">
            <div className="relative w-full sm:w-auto">
              <select className="w-full sm:w-56 appearance-none bg-transparent border-b border-neutral-700 text-neutral-200 text-xs tracking-[0.2em] uppercase py-4 px-0 focus:outline-none focus:border-white transition-colors duration-300 cursor-pointer rounded-none">
                <option value="2" className="bg-neutral-900 text-white">2 Guests</option>
                <option value="3" className="bg-neutral-900 text-white">3 Guests</option>
                <option value="4" className="bg-neutral-900 text-white">4 Guests</option>
                <option value="5+" className="bg-neutral-900 text-white">5+ Guests</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <input
                type="date"
                className="w-full sm:w-56 appearance-none bg-transparent border-b border-neutral-700 text-neutral-200 text-xs tracking-[0.2em] uppercase py-4 px-0 focus:outline-none focus:border-white transition-colors duration-300 cursor-pointer rounded-none [color-scheme:dark]"
              />
            </div>
          </div>

          <button className="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-neutral-950 transition-colors duration-300 overflow-hidden">
            <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors duration-300 delay-100">Check Availability</span>
            <div className="absolute inset-0 bg-neutral-900 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-32 text-[10px] text-neutral-600 tracking-[0.2em] uppercase z-10">
          <p>&copy; {new Date().getFullYear()} AURA Restaurant.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-neutral-300 transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-neutral-300 transition-colors duration-300">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuraLandingPage;
