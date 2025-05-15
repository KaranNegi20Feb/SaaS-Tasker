import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/ui/BlurText';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Feature {
  id: number;
  title: string;
  description: string;
}

const features: Feature[] = [
  { id: 1, title: "Create tasks with ease", description: "Quickly create and manage tasks to streamline your workflow." },
  { id: 2, title: "Create organizations, join organizations", description: "Form or join organizations to collaborate with your team seamlessly." },
  { id: 3, title: "Interact with team members", description: "Communicate and coordinate with your team efficiently." },
  { id: 4, title: "Dashboard with feature to accept and reject", description: "Manage tasks and requests with an intuitive dashboard for approvals." },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
};

const HeroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-20 px-6 relative overflow-hidden">
      {/* Decorative Background Squares */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-purple-700 rounded-3xl opacity-30 blur-3xl animate-blob animation-delay-2000 mix-blend-multiply" />
      <div className="absolute top-40 right-20 w-56 h-56 bg-indigo-600 rounded-3xl opacity-25 blur-3xl animate-blob animation-delay-4000 mix-blend-multiply" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-700 rounded-3xl opacity-20 blur-3xl animate-blob animation-delay-6000 mix-blend-multiply" />

      {/* Main Header */}
      <BlurText
        text="MicroTeams"
        delay={250}
        animateBy="words"
        direction="bottom"
        className="text-6xl font-extrabold text-white mb-6 select-none relative z-10"
      />

      {/* Short description */}
      <p className="max-w-xl text-center text-gray-300 mb-10 text-lg relative z-10">
        MicroTeams is a collaborative platform designed to empower small teams to organize, communicate, and deliver projects efficiently.
      </p>

      {/* Buttons */}
      <div className="flex space-x-6 mb-16 relative z-10">
        <Button
          variant="default"
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Login
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/signup')}
          className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
        >
          Signup
        </Button>
      </div>

      {/* Features Heading */}
<BlurText
        text="Features"
        delay={250}
        animateBy="words"
        direction="bottom"
        className="text-4xl font-extrabold text-white mb-6 select-none relative z-10"
      />
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full relative z-10">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-gray-800 rounded-xl shadow-lg p-6 cursor-default hover:shadow-indigo-500/50 transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroPage;
