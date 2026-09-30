import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function Register() {

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleRegister({ username, email, password: pass })
      navigate("/")
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="text-sm font-medium text-gray-600">
              Creating your account...
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div
          className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-6 dark:bg-neutral-800 dark:border-neutral-700">

          {/* Logo */}
          <div className="flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              IQ
            </span>
            <span className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-50">InterviewIQ</span>
          </div>

          <h1 className="text-slate-900 text-center text-2xl font-bold mt-6 dark:text-slate-50">Create an account</h1>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Join InterviewIQ and ace your next interview.
          </p>

          <form className="space-y-6 mt-10" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="username"
                className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Username</label>
              <input onChange={(e) => { setUsername(e.target.value) }} type="text" id="username" name="username" placeholder="john_123" required
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>

            <div>
              <label htmlFor="email"
                className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
              <input onChange={(e) => { setEmail(e.target.value) }} type="email" id="email" name="email" placeholder="you@example.com" required
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>
            <div>
              <label htmlFor="password"
                className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>
              <input onChange={(e) => { setPass(e.target.value) }} type="password" id="password" name="password" placeholder="••••••••" required
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>
            

            <div className="flex items-start flex-wrap gap-2">
              <label className="flex items-center group has-[input:checked]:text-slate-900">
                <input id="tmc" name="tmc" type="checkbox" required className="sr-only" />
                {/* Custom box */}
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-600
                            bg-white dark:bg-neutral-700
                            group-has-[input:checked]:bg-blue-600
                            group-has-[input:checked]:outline-blue-600
                            group-focus-within:outline-2
                            group-focus-within:outline-blue-600" aria-hidden="true">
                  {/* Checkmark */}
                  <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                    fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 5l3 3 7-7" />
                  </svg>
                </span>
                <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                  I accept the
                </span>
              </label>

              <a href="#"
                className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Terms and Conditions
              </a>
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button type="submit"
              className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Create an account</button>
          </form>

          <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">Already have an account? <a href="/login"
            className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
            Login here</a>
          </div>
        </div>
      </div>
    </main>

  );
}
