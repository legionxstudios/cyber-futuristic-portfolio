import { Helmet } from 'react-helmet-async';
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const title = "Tudor Stanescu Portfolio | #HireMeHuman";
  const description = "Experienced SEO & Growth Marketing leader driving traffic, conversions, and innovation. Proven results in scaling brands and digital strategies.";
  const ogImage = "/lovable-uploads/cc5b7e22-9f01-450b-9dbe-b069e1429ae0.png";
  const url = "https://hiremehuman.com";

  const personSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Tudor Stanescu",
    "url": "https://hiremehuman.com/",
    "image": "",
    "sameAs": [
      "https://www.linkedin.com/in/tudorstanescu/",
      "https://www.instagram.com/legionxstudios/",
      "https://www.legionxstudios.com/",
      "https://x.com/legionx_studios"
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional Meta Tags */}
        <meta name="author" content="Tudor Stanescu" />
        <link rel="canonical" href={url} />
        
        {/* Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>
      <main className="bg-cyberdark min-h-screen relative">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default Index;