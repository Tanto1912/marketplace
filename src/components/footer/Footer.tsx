const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 text-pink-900 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left text-sm">
          &copy; {new Date().getFullYear()} KCMGROUP@MazWeb All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="hover:text-pink-600 transition"
            aria-label="Facebook"
          >
            {/* Facebook SVG icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.314h3.59l-.467 3.622h-3.123V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:text-pink-600 transition"
            aria-label="Twitter"
          >
            {/* Twitter SVG icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.37 4.482A13.939 13.939 0 011.671 3.149 4.916 4.916 0 003.195 9.86a4.9 4.9 0 01-2.228-.616v.06a4.917 4.917 0 003.946 4.814 4.902 4.902 0 01-2.224.084 4.917 4.917 0 004.588 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 14.307-14.425 0-.22-.005-.439-.015-.656A10.243 10.243 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:text-pink-600 transition"
            aria-label="Instagram"
          >
            {/* Instagram SVG icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm8.75 1a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
