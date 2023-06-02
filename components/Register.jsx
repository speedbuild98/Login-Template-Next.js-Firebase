"use client";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { sendEmailVerification } from "firebase/auth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { Login } from ".";

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

const auth = getAuth();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
        confirmButtonColor: "#8cbbf1",
      });
      return;
    }
  
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must be at least 8 characters long",
        confirmButtonColor: "#8cbbf1",
      });
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        Swal.fire({
          icon: "info",
          title: "Success",
          text: "Registration successful. Please verify your email.",
          confirmButtonColor: "#8cbbf1",
        });
        setIsRegistering(false); // Cambiar a la página de inicio de sesión
      }
      // Redirect user to main page after successful registration
    } catch (error) {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "The email address is already in use. Please use a different email address.",
          confirmButtonColor: "#8cbbf1",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          confirmButtonColor: "#8cbbf1",
        });
      }
    }
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full lg:max-w-xl justify-center">
        {isRegistering ? (
          <>
            <form className="mt-6" onSubmit={handleRegister}>
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
              <div className="mb-2 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <div className="mt-2">
                <button
                  type="submit"
                  className="font-bold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue rounded-md hover:bg-blueHover focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-center text-gray-700">
              Already have an account?{" "}
              <button
                className="font-medium text-blue-600 hover:underline"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
