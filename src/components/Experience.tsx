import { motion } from "framer-motion";
import { Building2, ExternalLink, CheckCircle } from "lucide-react";

const experiences = [
  {
    date: "April 2024 - Current",
    company: "ABC Fitness",
    website: "https://www.abcfitness.com",
    location: "Sherwood, Arkansas, United States (Remote)",
    role: "Senior Manager of Website, CRO and SEO",
    description: [
      "Increased MQLs by 35% and reduced CAC by 20% through experimentation and paid media optimizations.",
      "Launched conversion-focused campaigns generating 18% higher ROI using AI-driven content tools.",
      "Collaborated with product and sales teams to align growth strategies with revenue targets."
    ]
  },
  {
    date: "November 2020 – April 2024",
    company: "Vendasta Technologies Inc.",
    website: "https://www.vendasta.com",
    location: "Saskatoon, SK (Remote)",
    role: "Director of Web, CRO and SEO",
    description: [
      "Contributed to Vendasta's growth from $30M to $100M ARR by optimizing on-page SEO and targeting high-value keywords.",
      "Implemented a programmatic SEO initiative, generating 10K organic monthly visitors by leveraging AI to create over 300 dynamic content pages.",
      "Led a 250+ article project increasing organic traffic by 50% month-over-month.",
      "Reduced SEM CAC by 75% through the creation of a video ad program, outperforming previous ad creatives.",
      "Re-optimized decayed content, improving regaining traffic to those pages anywhere between by 40-100%."
    ]
  },
  {
    date: "April 2018 – June 2020",
    company: "Format",
    website: "https://www.format.com",
    location: "Toronto, ON",
    role: "SEO Manager",
    description: [
      "Grew organic traffic by 300% and increased leads by 31% through the \"SEO Taskforce\" initiative.",
      "Created SEO-optimized landing pages that ranked in the top 1–5 positions for competitive keywords.",
      "Delivered 34% growth in new paying customers by optimizing niche landing pages."
    ]
  },
  {
    date: "May 2016 - April 2018",
    company: "Metroland Media Group",
    website: "https://metroland.com",
    location: "Toronto, ON",
    role: "Senior Search Marketing Strategist",
    description: [
      "Manage all SEO and SEM initiatives for a portfolio of 50 web properties owned by Metroland Media Group, which grew by 40% YOY through extensive technical SEO improvements"
    ]
  },
  {
    date: "October 2014 - May 2016",
    company: "80 Proof Digital",
    website: "https://80proofdigital.com",
    location: "Toronto, ON",
    role: "SEO Specialist",
    description: [
      "Developed and executed tailored SEO campaigns across diverse industries, including photography, financial services, real estate, transportation, and legal, achieving page-one rankings for all clients' target keywords through strategic link-building, content development, and SEO optimization."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cybercyan/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cybercyan to-cyberamber">
            Work Experience
          </span>
        </motion.h2>

        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyberpink via-cybercyan to-cyberamber hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Date on the opposite side - hidden on mobile */}
                <div 
                  className={`hidden md:block text-cyberpink font-medium absolute top-2 ${
                    index % 2 === 0 
                      ? 'left-[52%] pl-8' 
                      : 'right-[52%] pr-8 text-right'
                  }`}
                >
                  {exp.date}
                </div>

                {/* Card */}
                <div className={`glass-card p-6 hover-glow w-full ${
                  index % 2 === 0 
                    ? 'md:col-start-1 md:mr-auto' 
                    : 'md:col-start-2 md:ml-auto'
                }`}>
                  {/* Mobile date display */}
                  <div className="md:hidden text-cyberpink font-medium mb-4">
                    {exp.date}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.role}</h3>
                  
                  <div className="flex items-center gap-2 mb-1 text-cybercyan">
                    <Building2 className="w-4 h-4" />
                    <a 
                      href={exp.website}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="hover:text-cyberpink transition-colors flex items-center gap-1"
                    >
                      {exp.company}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  
                  <div className="text-gray-400 text-sm mb-4">{exp.location}</div>
                  
                  {exp.description.length > 0 && (
                    <div className="space-y-3 mt-4 border-t border-white/10 pt-4">
                      {exp.description.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 group"
                        >
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-cyberpink group-hover:text-cyberamber transition-colors" />
                          </div>
                          <p className="text-gray-300 group-hover:text-white transition-colors">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timeline dot - hidden on mobile */}
                <div className="absolute left-1/2 top-2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyberpink hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
