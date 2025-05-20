import { DotBackgroundDemo } from "../components/ui/DotBackgroundDemo";
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

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' }
  })
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15 + 1.6, duration: 0.4 }, // Cards after everything else
  }),
};

const HeroPage2 = () => {
  const navigate = useNavigate();

  return (
    <DotBackgroundDemo>
      <div className="p-12 flex flex-col items-center justify-center mt-10 md:mt-0 w-full max-w-7xl p-5">

        {/* MicroTeams heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.2}
        >
          <BlurText
            text="MicroTeams"
            delay={250}
            animateBy="words"
            direction="bottom"
            className="text-5xl font-extrabold text-white mb-6 select-none relative z-10 md:text-8xl"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.6}
          className="max-w-xl text-center text-gray-300 mb-10 text-lg relative z-10"
        >
          A collaborative platform designed to empower small teams to organize, communicate, and deliver projects efficiently.
        </motion.p>

        {/* Buttons */}
        <div className="flex justify-center items-center w-full">
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    custom={1.0}
    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-16 relative z-10 w-full sm:w-auto"
  >
    <Button
      onClick={() => navigate('/login')}
      className="
        w-full sm:w-48
        backdrop-blur-md bg-black/30 border border-indigo-500
        text-indigo-300 font-semibold px-6 py-3 sm:px-10 rounded-xl
        shadow-[0_0_8px_rgba(99,102,241,0.6)]
        hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]
        hover:border-indigo-400
        transition duration-300 ease-in-out transform hover:scale-105
      "
    >
      Login
    </Button>

    <Button
      onClick={() => navigate('/signup')}
      className="
        w-full sm:w-48
        backdrop-blur-md bg-black/30 border border-pink-500
        text-pink-300 font-semibold px-6 py-3 sm:px-10 rounded-xl
        shadow-[0_0_8px_rgba(219,39,119,0.6)]
        hover:shadow-[0_0_20px_rgba(219,39,119,0.8)]
        hover:border-pink-400
        transition duration-300 ease-in-out transform hover:scale-105
      "
    >
      Signup
    </Button>
  </motion.div>
</div>


        {/* Features heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1.3}
        >
          <BlurText
            text="Features"
            delay={250}
            animateBy="words"
            direction="bottom"
            className="text-4xl mt-2 font-extrabold text-white mb-6 select-none relative z-10"
          />
        </motion.div>

        {/* Feature cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full relative z-10">
  {features.map((feature, i) => (
    <motion.div
      key={feature.id}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="
        rounded-2xl p-6 shadow-lg
        bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-700/60
        border border-white/10 backdrop-blur-md
        hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]
        transition duration-300 ease-in-out transform hover:scale-[1.03]
      "
    >
      <h3 className="text-lg font-bold text-indigo-400 mb-2 tracking-wide">
  {feature.title}
</h3>
<p className="text-sm text-slate-200 leading-relaxed">
  {feature.description}
</p>

    </motion.div>
  ))}
</div>

      </div>
    </DotBackgroundDemo>
  );
};

export default HeroPage2;
