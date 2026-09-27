import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {

   const { loading, handleLogin } = useAuth()
   const navigate = useNavigate()

   const [isVisible, setIsVisible] = useState(false);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const toggleVisibility = () => {
      setIsVisible((prevState) => !prevState);
   };
   
   const handleSubmit = async (e) => {
      e.preventDefault();

      setError("");

      try {
         await handleLogin({ email, password });
         navigate("/");
      } catch (err) {
         setError(
            err.response?.data?.message || "Invalid email or password"
         );
      }
   };

   if (loading) {
      return (
         <main className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-center">
               <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

               <p className="text-sm font-medium text-gray-600">
                  Logging you in...
               </p>
            </div>
         </main>
      );
   }

   return (
      <main className="flex items-center justify-center md:h-screen py-4 px-4 md:px-8">
         <div
            className="bg-white border border-slate-200 [box-shadow:rgba(149,157,165,0.3)_0px_4px_12px] rounded-md p-6 max-w-lg md:max-w-2xl lg:max-w-6xl dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:shadow-none">

            <div className="grid items-center gap-8 py-4 md:grid-cols-2">
               <div className="order-1 md:-order-1">
                  <div className="aspect-[12/11] w-full">
                     <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
                  </div>
               </div>

               <div className="max-w-md mx-auto w-full">
                  <div className="mb-10">
                     <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-500">Sign in</h1>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                     <div>
                        <label htmlFor="email"
                           className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
                        <input onChange={(e) => {
                           setEmail(e.target.value)
                        }} value={email} autoComplete="off" type="email" id="email" name="email" placeholder="you@example.com" required
                           className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
                     </div>
                     <div className="relative">
                        <label htmlFor="password"
                           className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>

                        <button
                           type="button"
                           id="togglePassword"
                           onClick={toggleVisibility}
                           aria-label={isVisible ? "Hide password" : "Show password"}
                           aria-pressed={isVisible}
                           className="absolute top-1 right-2 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
                           <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-slate-400 text-slate-400 overflow-visible"
                              viewBox="0 0 128 128">
                              <path
                                 d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z">
                              </path>
                              {!isVisible && (
                                 <path
                                    d="M15 15l98 98"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    className="stroke-slate-400"
                                 />
                              )}
                           </svg>
                        </button>

                        <input onChange={(e) => {
                           setPassword(e.target.value)
                        }}
                           value={password} autoComplete="off" type={isVisible ? "text" : "password"}
                           id="password" name="password"
                           placeholder="••••••••"
                           className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                           required
                        />
                     </div>

                     <div className="flex items-start flex-wrap gap-2">
                        <label className="flex items-center group has-[input:checked]:text-slate-900">
                           <input id="remember" name="remember" type="checkbox" required className="sr-only" />
                           {/* Custom box */}
                           <span
                              className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-600 bg-white dark:bg-neutral-700 group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600"
                              aria-hidden="true">
                              {/* Checkmark */}
                              <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                                 fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M1 5l3 3 7-7" />
                              </svg>
                           </span>
                           <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                              Remember me
                           </span>
                        </label>

                     </div>

                     {error && (
                        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                           {error}
                        </p>
                     )}

                     <button type="submit"
                        className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        Sign in</button>
                  </form>

                  <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">Don't have an account? <a href="/register"
                     className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Sign
                     up</a>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}
