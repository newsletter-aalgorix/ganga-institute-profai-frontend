import { Button } from '@/components/ui/button';
import { Play, Video, ChevronDown, Sparkles, Zap } from 'lucide-react';
import { Link } from 'wouter';
import courseVideo from '@assets/video (2).mp4';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

export default function HeroSection() {
  const { displayText} = useTypingAnimation({
    text: "STUDY SMART",
    speed: 90,
    delay: 1500,
    repeat: true
  });

  const scrollToNext = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-zinc-900 py-8 sm:py-12 lg:py-16" data-testid="hero-section">
      <div className="relative flex flex-col lg:flex-row items-center justify-between">
        
        {/* LEFT HALF - Text Content */}
        <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10 flex items-center">
          <div className="w-full max-w-2xl">
            <h1 className="mb-6" data-testid="hero-title">
              {/* Gradient "STUDY SMART" */}
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-extrabold leading-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #ff4b5c,rgb(255, 92, 92))',
                }}
              >
                {displayText}
                <span
                  className="ml-1 w-[3px] h-[1em] bg-gradient-to-r from-[#ff4b5c] to-[rgb(255,92,92)] animate-blink"
                />
              </div>

              {/* Subheading */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-semibold mt-3 sm:mt-4 text-white">
                Syllabus-Aligned
              </div>

              <div className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-medium mt-2 text-white">
                AI Learning Companion
              </div>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-base xl:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Built for pure learning. No distractions, no off-track content. Just precise, curriculum-tight teaching across multiple country pedagogy and curriculum. A unique doubt-buster buddy Avatar that works tirelessly 24×7 to deliver personalised learning, improve exam results, accelerate progress, build confidence for all age groups.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/courses">
                <Button 
                  className="border relative px-6 sm:px-7 py-4 sm:py-[1.375rem] rounded-full font-semibold text-sm sm:text-base transition-all duration-500 transform hover:scale-110 hover:shadow-2xl bg-gradient-to-r from-zinc-900 via-stone-950 to-stone-900 text-white shadow-lg hover:shadow-purple-500/50 overflow-hidden group w-full sm:w-auto"
                  data-testid="button-sign-up"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Start Learning</span>
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-black bg-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-full font-semibold hover:scale-110 hover:bg-white transition-all text-sm sm:text-base w-full sm:w-auto"
                  data-testid="button-watch-demo"
                >
                  <Video className="w-5 h-5 mr-2" />
                  How It Works
                </Button>
              </Link>
              <Link href="/comparison">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-yellow-400 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-full font-semibold hover:scale-110 hover:text-white hover:bg-yellow-400/10 transition-all text-sm sm:text-base w-full sm:w-auto"
                  data-testid="button-comparison"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  GPT vs ProfAI
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT HALF - Video */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-auto object-contain"
              data-testid="hero-background-video"
            >
              <source src={courseVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30">
        <button 
          onClick={scrollToNext}
          className="animate-bounce-slow text-white text-opacity-60 hover:text-opacity-80 transition-all"
          data-testid="scroll-indicator"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
}