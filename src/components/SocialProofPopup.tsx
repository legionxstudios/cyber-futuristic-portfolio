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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    action: "contacted you"
  },
  {
    name: "Michael Rodriguez",
    title: "Head of HR",
    company: "Adobe",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    action: "contacted you"
  },
  {
    name: "Emily Thompson",
    title: "Senior Technical Recruiter",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    action: "contacted you"
  },
  {
    name: "David Kim",
    title: "Director of People Operations",
    company: "Salesforce",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    action: "contacted you"
  },
  {
    name: "Rachel Foster",
    title: "VP of Human Resources",
    company: "Meta",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    action: "contacted you"
  },
  {
    name: "James Wilson",
    title: "Global Talent Director",
    company: "Apple",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    action: "contacted you"
  },
  {
    name: "Lisa Patel",
    title: "Chief People Officer",
    company: "LinkedIn",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909",
    action: "contacted you"
  },
  {
    name: "Robert Chang",
    title: "VP of Talent",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    action: "contacted you"
  },
  {
    name: "Amanda Martinez",
    title: "Head of Recruitment",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    action: "contacted you"
  },
  {
    name: "John Baker",
    title: "Director of HR",
    company: "Twitter",
    image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb",
    action: "contacted you"
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