"use client";
import Link from "next/link";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { Register } from ".";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7BMPeOhM3WoV1ngO2lGac15BvnDVHURc",
  authDomain: "tasks-e3f1f.firebaseapp.com",
  projectId: "tasks-e3f1f",
  storageBucket: "tasks-e3f1f.appspot.com",
  messagingSenderId: "516343716922",
  appId: "1:516343716922:web:13fc4a61494bc6e4356903",
  measurementId: "G-XKNCCSKYYC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your email and password",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8cbbf1",
      });
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        if (user.emailVerified) {
          Swal.fire({
            title: "Success!",
            text: "Login successful",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#8cbbf1",
          }).then(() => {
            window.location.reload(); // Agregar esta línea para actualizar la página
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Please verify your email before logging in",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#8cbbf1",
          });
          return;
        }
      }
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "There is no user corresponding to this email";
          break;
        case "auth/wrong-password":
          errorMessage = "The password is incorrect";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8cbbf1",
      });
    }
  };
  
  const handleSignUpClick = () => {
    setIsRegistering(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full lg:max-w-xl justify-center">
        {isRegistering ? (
          <Register />
        ) : (
          <>
            <form className="mt-6" onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <button
                  onClick={handlePasswordVisibility}
                  type="button"
                  className="absolute text-2xl text-blue mt-3 right-2 top-1/2 transform -translate-y-1/2 text- focus:outline-none"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              <Link
                className="text-xs text-blue-600 hover:underline"
                href="/forget"
              >
                Forget Password?
              </Link>
              <div className="mt-2">
                <button
                  type="submit"
                  className="font-bold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue rounded-md hover:bg-blueHover focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-700">
              Don&#39;t have an account?{" "}
              <button
                className="font-medium text-blue-600 hover:underline"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}