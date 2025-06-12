import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src="/icon-app-tasker.png" className="h-8 me-3" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">MicroTeams</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Navigation</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/login" className="hover:underline">Login</a>
                </li>
                <li className="mb-4">
                  <a href="/signup" className="hover:underline">Signup</a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">About</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow Me</h2>
              <ul className="text-gray-400 font-medium space-y-2">
                <li>
                  <a href="https://github.com/KaranNegi20Feb" className="hover:underline">GitHub</a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/karannegi" className="hover:underline">LinkedIn</a>
                </li>
                <li>
                  <a href="https://x.com/karannegi" className="hover:underline">X (Twitter)</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2025 <a href="/" className="hover:underline">MicroTeams™</a>. All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-6">
            <a href="https://github.com/KaranNegi20Feb" target="_blank" className="text-gray-400 hover:text-white">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/karan-negi-20feb/" target="_blank" className="text-gray-400 hover:text-white">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://x.com/Kevin_Dev_1" target="_blank" className="text-gray-400 hover:text-white">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">X (Twitter)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
