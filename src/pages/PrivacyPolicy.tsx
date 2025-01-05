import { Helmet } from 'react-helmet-async';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Tudor Stanescu</title>
        <meta name="description" content="Privacy policy and data protection information for Tudor Stanescu's portfolio website." />
        <meta property="og:title" content="Privacy Policy | Tudor Stanescu" />
        <meta property="og:description" content="Privacy policy and data protection information for Tudor Stanescu's portfolio website." />
      </Helmet>
      <div className="min-h-screen bg-cyberdark">
        <Navigation showBack />
        <main className="container mx-auto px-4 py-20">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Effective Date: January 3, 2025</p>
            
            <p>Welcome to #hiremehuman ("Website"), located at hiremehuman.com. This Privacy Policy explains how we collect, use, and protect your information when you visit our Website.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p>When you visit our Website, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Automatically Collected Data: Information like your IP address, browser type, operating system, and pages visited, collected via Google Analytics and Google Tag Manager for site performance and user behavior tracking.</li>
              <li>Cookies: Small files stored on your device to enhance your browsing experience and analyze site usage.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the collected data to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Monitor and improve website performance.</li>
              <li>Understand user interactions and behaviors via Google Analytics and Google Tag Manager.</li>
              <li>Ensure compliance with applicable laws and regulations.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Third-Party Sharing</h2>
            <p>We do not sell, rent, or share your personal information with third parties, except:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics: For tracking and analyzing user interactions.</li>
              <li>Google Tag Manager: For managing event tracking and improving user experience.</li>
            </ul>
            <p>These third-party tools may collect additional data governed by their privacy policies.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Data Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Request access to the information we hold about you.</li>
              <li>Request the deletion or correction of your data.</li>
              <li>Opt out of data collection by adjusting your browser settings or using opt-out tools provided by Google.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Security Measures</h2>
            <p>We implement reasonable security measures to protect your data from unauthorized access. However, no online platform is entirely secure, and we cannot guarantee absolute data security.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <p>Email: privacy@hiremehuman.com</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
