export default function IntroBannerSection() {
  return (
    <section 
      id="intro-banner" 
      className="relative w-full bg-zinc-800 pt-20 sm:pt-24"
      data-testid="intro-banner-section"
    >
      <img 
        src="gitam-hero.jpg" 
        alt="Ganga Institute of Technology and Management" 
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
