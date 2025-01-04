import { motion } from "framer-motion";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResultsOverview = () => {
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
  );
};

export default ResultsOverview;
