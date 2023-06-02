"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dashboard, Login } from "../components";
import Image from "next/image";
import { logo } from "../assets";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const emailVerified = user.emailVerified;
        if (emailVerified) {
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);


  return (
    <main>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <FaSpinner className="animate-spin text-5xl text-blue" />
        </div>
      ) : isLoggedIn ? (
        <>
          <Dashboard />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="my-10">
            <Image width={100} height={100} src={logo} alt="Logo" />
          </div>
          <Login />
        </div>
      )}
    </main>
  );
}
