import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Contact {
  name: string;
  title: string;
  company: string;
  image: string;
  action: string;
}

const contacts: Contact[] = [
  {
    name: "Sarah Chen",
    title: "VP of Talent Acquisition",
    company: "Microsoft",
    image: "/placeholder.svg",
    action: "viewed your profile"
  },
  {
    name: "Michael Rodriguez",
    title: "Head of HR",
    company: "Adobe",
    image: "/placeholder.svg",
    action: "downloaded your resume"
  },
  {
    name: "Emily Thompson",
    title: "Senior Technical Recruiter",
    company: "Amazon",
    image: "/placeholder.svg",
    action: "scheduled a call"
  },
  {
    name: "David Kim",
    title: "Director of People Operations",
    company: "Salesforce",
    image: "/placeholder.svg",
    action: "viewed your case studies"
  },
  {
    name: "Rachel Foster",
    title: "VP of Human Resources",
    company: "Meta",
    image: "/placeholder.svg",
    action: "sent you a message"
  },
  {
    name: "James Wilson",
    title: "Global Talent Director",
    company: "Apple",
    image: "/placeholder.svg",
    action: "viewed your profile"
  },
  {
    name: "Lisa Patel",
    title: "Chief People Officer",
    company: "LinkedIn",
    image: "/placeholder.svg",
    action: "downloaded your resume"
  },
  {
    name: "Robert Chang",
    title: "VP of Talent",
    company: "Google",
    image: "/placeholder.svg",
    action: "scheduled a call"
  },
  {
    name: "Amanda Martinez",
    title: "Head of Recruitment",
    company: "Netflix",
    image: "/placeholder.svg",
    action: "viewed your case studies"
  },
  {
    name: "John Baker",
    title: "Director of HR",
    company: "Twitter",
    image: "/placeholder.svg",
    action: "sent you a message"
  }
];

export const SocialProofPopup = () => {
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const showNextNotification = () => {
      const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
      setCurrentContact(randomContact);
      setIsVisible(true);

      // Hide after 5 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Schedule next notification after a random interval between 15-45 seconds
      const nextInterval = Math.random() * (45000 - 15000) + 15000;
      setTimeout(showNextNotification, nextInterval);
    };

    // Start the cycle
    showNextNotification();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentContact && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: -50 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="glass-card p-4 max-w-sm flex items-center gap-4 shadow-lg hover-glow cursor-pointer">
            <Avatar>
              <AvatarImage src={currentContact.image} />
              <AvatarFallback>{currentContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-white">
                {currentContact.name}
              </p>
              <p className="text-xs text-gray-300">
                {currentContact.title} at {currentContact.company}
              </p>
              <p className="text-xs text-cyberpink mt-1">
                {currentContact.action}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};