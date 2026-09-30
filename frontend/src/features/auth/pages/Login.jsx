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

   const features = [
      "AI-powered interview reports from your resume",
      "Technical & behavioral questions with model answers",
      "Skill-gap analysis and a 7-day preparation plan",
   ];

   return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8 md:px-8 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
         <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none">

            <div className="grid md:grid-cols-2">

               {/* ===== Brand panel (replaces the old image) ===== */}
               <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-10 text-white md:flex">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"></div>
                  <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10"></div>

                  <div className="relative">
                     <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl font-bold backdrop-blur">
                           IQ
                        </span>
                        <span className="text-2xl font-bold tracking-tight">InterviewIQ</span>
                     </div>

                     <h2 className="mt-12 text-3xl font-bold leading-tight">
                        Walk into every interview prepared.
                     </h2>
                     <p className="mt-3 text-sm text-blue-100">
                        Upload your resume, paste the job description, and get a personalised plan in seconds.
                     </p>
                  </div>

                  <ul className="relative mt-10 space-y-4">
                     {features.map((text) => (
                        <li key={text} className="flex items-start gap-3 text-sm text-blue-50">
                           <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                              <svg className="h-3 w-3" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M1 5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </span>
                           {text}
                        </li>
                     ))}
                  </ul>
               </div>

               {/* ===== Form panel ===== */}
               <div className="flex items-center p-6 sm:p-10">
                  <div className="mx-auto w-full max-w-md">

                     {/* Mobile-only logo (brand panel is hidden on small screens) */}
                     <div className="mb-6 flex items-center gap-2 md:hidden">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">IQ</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-slate-50">InterviewIQ</span>
                     </div>

                     <div className="mb-8">
                        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-500">Sign in</h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                           Welcome back! Enter your details to continue.
                        </p>
                     </div>

                     <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                        <div>
                           <label htmlFor="email"
                              className="mb-2 inline-block text-sm font-medium text-slate-900 dark:text-slate-50">Email</label>
                           <input onChange={(e) => {
                              setEmail(e.target.value)
                           }} value={email} autoComplete="off" type="email" id="email" name="email" placeholder="you@example.com" required
                              className="w-full rounded-lg bg-white px-3.5 py-3 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 transition placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:text-slate-50 dark:outline-neutral-600" />
                        </div>

                        <div className="relative">
                           <label htmlFor="password"
                              className="mb-2 inline-block text-sm font-medium text-slate-900 dark:text-slate-50">Password</label>

                           <button
                              type="button"
                              id="togglePassword"
                              onClick={toggleVisibility}
                              aria-label={isVisible ? "Hide password" : "Show password"}
                              aria-pressed={isVisible}
                              className="absolute right-2 top-1 flex cursor-pointer rounded p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] overflow-visible fill-slate-400 text-slate-400"
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
                              className="w-full rounded-lg bg-white px-3.5 py-3 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 transition placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:text-slate-50 dark:outline-neutral-600"
                              required
                           />
                        </div>

                        <div className="flex flex-wrap items-start gap-2">
                           <label className="group flex cursor-pointer items-center has-[input:checked]:text-slate-900">
                              <input id="remember" name="remember" type="checkbox" required className="sr-only" />
                              {/* Custom box */}
                              <span
                                 className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-white outline-1 outline-slate-300 group-focus-within:outline-2 group-focus-within:outline-blue-600 group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 dark:bg-neutral-700 dark:outline-neutral-600"
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
                           <p className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600">
                              {error}
                           </p>
                        )}

                        <button type="submit"
                           className="w-full cursor-pointer rounded-lg border border-blue-600 bg-blue-600 px-3.5 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.99]">
                           Sign in</button>
                     </form>

                     <div className="mt-6 text-center text-sm text-slate-900 dark:text-slate-50">Don't have an account? <a href="/register"
                        className="ml-1 rounded font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500">Sign
                        up</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}
