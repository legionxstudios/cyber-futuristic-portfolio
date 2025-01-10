import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const generateSitemap = async () => {
  console.log('Generating sitemap...');
  
  // Fetch all case studies
  const { data: caseStudies, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching case studies for sitemap:', error);
    throw error;
  }

  // Base URL for the site
  const baseUrl = 'https://hiremehuman.com';

  // Create XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Home page -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Privacy Policy -->
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Terms -->
  <url>
    <loc>${baseUrl}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Case Studies -->
  ${caseStudies?.map(study => `
  <url>
    <loc>${baseUrl}/${study.slug}</loc>
    <lastmod>${new Date(study.updated_at || study.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${study.cover_image ? `
    <image:image>
      <image:loc>${study.cover_image}</image:loc>
      <image:title>${study.title}</image:title>
    </image:image>` : ''}
    ${study.graph_image ? `
    <image:image>
      <image:loc>${study.graph_image}</image:loc>
      <image:title>Results graph for ${study.title}</image:title>
    </image:image>` : ''}
  </url>
  `).join('\n')}
</urlset>`;

  return xml;
};

// Component to serve the sitemap
const Sitemap = () => {
  const { data: sitemap } = useQuery({
    queryKey: ['sitemap'],
    queryFn: generateSitemap,
  });

  return sitemap || '';
};

export default Sitemap;