'use client'
import Link from 'next/link';
import { logo } from '../assets';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Sign out successful',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch((error) => {
        // Handle sign out error
        console.error(error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image className="mx-auto" width={50} height={50} src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={toggleMenu}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex items-center mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="my-1 text-sm text-gray-700 font-medium hover:text-yellow md:mx-4 md:my-0"
              href="/"
            >
              Home
            </Link>
            <Link
              className="my-1 text-sm text-gray-700 font-medium hover:text-yellow md:mx-4 md:my-0"
              href="/about"
            >
              About
            </Link>
            <Link
              className="my-1 text-sm text-gray-700 font-medium hover:text-yellow md:mx-4 md:my-0"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <>
            {!user && (
              // Mostrar el botón de Sign Out solo si el usuario está logeado y ha verificado su correo electrónico
              <>
              </>
            )}
            {user && user.emailVerified && (
              <button
                onClick={handleSignOut}
                className="my-1 text-sm text-gray-700 font-medium hover:text-red-500 md:mx-4 md:my-0"
              >
                Sign Out
              </button>
            )}
          </>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
