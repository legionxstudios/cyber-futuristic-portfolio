import { Helmet } from 'react-helmet-async';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use | Tudor Stanescu</title>
        <meta name="description" content="Terms of use and conditions for Tudor Stanescu's portfolio website." />
        <meta property="og:title" content="Terms of Use | Tudor Stanescu" />
        <meta property="og:description" content="Terms of use and conditions for Tudor Stanescu's portfolio website." />
      </Helmet>
      <div className="min-h-screen bg-cyberdark">
        <Navigation showBack />
        <main className="container mx-auto px-4 py-20">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
            <p className="text-gray-400 mb-8">Effective Date: January 3, 2025</p>
            
            <p>Welcome to #hiremehuman ("Website"), located at hiremehuman.com. By accessing or using this Website, you agree to comply with these Terms of Use. If you do not agree, please refrain from using our Website.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Use of Website</h2>
            <p>You may use this Website for personal and non-commercial purposes only. You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Disrupt or interfere with the Website's functionality.</li>
              <li>Use the Website for unlawful activities.</li>
              <li>Attempt to gain unauthorized access to any part of the Website.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property</h2>
            <p>All content on this Website, including text, graphics, logos, and design elements, is owned by #hiremehuman and protected under copyright and intellectual property laws. Unauthorized use of this content is prohibited.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer of Warranties</h2>
            <p>The Website is provided "as is" without any warranties, express or implied. We do not guarantee that the Website will be error-free, secure, or available at all times.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, #hiremehuman shall not be liable for any indirect, incidental, or consequential damages resulting from your use of this Website.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Use at any time. Continued use of the Website after changes signifies your acceptance of the updated terms.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p>If you have questions about these Terms of Use, please contact us at:</p>
            <p>Email: support@hiremehuman.com</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Terms;
