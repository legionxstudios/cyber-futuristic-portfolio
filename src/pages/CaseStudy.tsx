import { motion } from "framer-motion";
import { ArrowUpRight, Users, Target, Lightbulb, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolsSection from "@/components/case-study/ToolsSection";

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-cyberdark text-white pb-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[50vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyberpink/10 to-transparent" />
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
                Format SEO Growth Study
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Growing Organic Traffic from 100K to 450K Monthly Visits
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Results Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-cyberpink" />
                    Traffic Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Initial</span>
                      <span>100K</span>
                    </div>
                    <Progress value={22} className="h-2 bg-white/10" />
                    <div className="flex justify-between text-sm">
                      <span>Final</span>
                      <span>450K</span>
                    </div>
                    <Progress value={100} className="h-2 bg-white/10" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-cybercyan" />
                    Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">1M+</p>
                  <p className="text-gray-400">Unique organic visitors in first year</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-cyberamber" />
                    Lead Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">25%</p>
                  <p className="text-gray-400">Of total business leads</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="text-cyberpink" />
                    Budget Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">60%</p>
                  <p className="text-gray-400">Of allocated budget used</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Problem & Solution */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="text-cyberpink" />
                  The Challenge
                </h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                    <span>Stagnant organic traffic at 100K monthly visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                    <span>Heavy reliance on branded search terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-cyberpink" />
                    <span>Blog not contributing to lead generation</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="text-cybercyan" />
                  The Solution
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Team Expansion</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Hired full-time SEO editor</li>
                      <li>Built 20+ freelance writer network</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Content Strategy</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>200+ articles in 6 months</li>
                      <li>Pillar content structure</li>
                      <li>Strategic internal linking</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Key Takeaways */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb className="text-cyberamber" />
                Key Takeaways
              </h2>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Top-Performing Content</h3>
                  <p className="text-gray-300">Inspirational and monetization-focused content drove highest engagement</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Pillar Strategy Success</h3>
                  <p className="text-gray-300">Strategic internal linking improved both blog and product page performance</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Effective CTAs</h3>
                  <p className="text-gray-300">Product-focused CTAs significantly improved conversion rates</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <ToolsSection />

      {/* Results Graph */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Traffic Growth Over Time</h2>
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img 
                src="/lovable-uploads/6afca98e-94f3-4d18-a044-2b884c4f57a4.png"
                alt="Traffic growth graph showing increase from 100K to 450K monthly visits"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
