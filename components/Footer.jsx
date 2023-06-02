import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-pink py-2 flex justify-center items-center">
      <div className="flex space-x-4">
        <a
          href="https://github.com/speedbuild98"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800"
        >
          <FaGithub className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/lautagallardogg/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a
          href="mailto:dev.gallardolautaro@gmail.com"
          className="text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
