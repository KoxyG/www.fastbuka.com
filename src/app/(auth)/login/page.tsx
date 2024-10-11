'use client';

import { FormEvent, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Notify from '@/components/Notify';
import { useAuth } from '@/hooks/auth';
import Image from 'next/image';
import toast, {Toaster} from 'react-hot-toast';

interface Errors {
  email?: string[];
  password?: string[];
}

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [shouldRemember, setShouldRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState({});

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <div>
      <div className="bg-[]"></div>
      <Image alt="" src={'/Section.png'} width={100} height={100} className="img-fluid hidden md:block" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5">
        <div className="md:ms-32 mx-5 order-last md:order-1">
          <h1 className="text-4xl font-bold tracking-wider">Welcome Back!</h1>
          <p className="text-lg tracking-wide">Enter Login Details Below</p>
          <div className="login-form mt-5">
            <form onSubmit={submitForm} className="">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
                >
                  Password
                </label>
                <div className="flex bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-2 placeholder-gray-500">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Password"
                    required
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <Link
                href="/auth/reset_password"
                className="flex justify-end w-full items-start mb-1 text-blue-600 font-bold"
              >
                <p>Forgot password?</p>
              </Link>
              <button
                type="submit"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <p className="mt-3 tracking-wider">
                Don&apos;t Have an Account
                <span className="font-bold">
                  <Link href="/register">Create Account?</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="order-2 ">
          <Image
            src={'/login.png'}
            alt=""
            width={100}
            height={100}
            className="img-fluid hidden md:block p-5 transition ease-in-out delay-150 hover:-translate-y-5"
          />
        </div>
      </div>
      <footer>
        <p className="text-center text-xl font-mono font-bold my-10">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
      <Toaster />
    </div>
  )
};

export default Login;
