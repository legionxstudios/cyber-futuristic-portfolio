import { motion } from "framer-motion";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsOverviewProps {
  caseStudy: {
    traffic_initial: number;
    traffic_final: number;
    unique_visitors: string;
    lead_generation: string;
    budget_efficiency: string;
    traffic_heading?: string;
    visitors_heading?: string;
    leads_heading?: string;
    budget_heading?: string;
  };
}

const ResultsOverview = ({ caseStudy }: ResultsOverviewProps) => {
  const trafficInitialPercentage = (caseStudy.traffic_initial / caseStudy.traffic_final) * 100;
  
  return (
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
                  {caseStudy.traffic_heading || 'Traffic Growth'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Initial</span>
                    <span>{caseStudy.traffic_initial.toLocaleString()}</span>
                  </div>
                  <Progress value={trafficInitialPercentage} className="h-2 bg-white/10" />
                  <div className="flex justify-between text-sm">
                    <span>Final</span>
                    <span>{caseStudy.traffic_final.toLocaleString()}</span>
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
                  {caseStudy.visitors_heading || 'Visitors'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">{caseStudy.unique_visitors}</p>
                <p className="text-gray-400">Unique organic visitors</p>
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
                  {caseStudy.leads_heading || 'Lead Generation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">{caseStudy.lead_generation}</p>
                <p className="text-gray-400">Monthly organic visitors</p>
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
                  {caseStudy.budget_heading || 'Development Time'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">{caseStudy.budget_efficiency}</p>
                <p className="text-gray-400">Total time invested</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsOverview;