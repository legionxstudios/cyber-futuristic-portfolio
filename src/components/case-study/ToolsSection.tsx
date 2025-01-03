import { motion } from "framer-motion";
import { Database, Search, Globe, BarChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    name: "Google Keyword Planner",
    icon: Search,
    description: "Keyword research and volume analysis"
  },
  {
    name: "Ahrefs",
    icon: Globe,
    description: "Backlink analysis and keyword tracking"
  },
  {
    name: "SEMRush",
    icon: LineChart,
    description: "Competitor analysis and rank tracking"
  },
  {
    name: "Amplitude",
    icon: BarChart,
    description: "User behavior analytics"
  },
  {
    name: "Google Analytics",
    icon: Database,
    description: "Traffic and conversion tracking"
  },
  {
    name: "Google Search Console",
    icon: Search,
    description: "Search performance monitoring"
  }
];

const ToolsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Database className="text-cyberpink" />
            Tools Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card hover-glow h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <tool.icon className="text-cybercyan" />
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{tool.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;