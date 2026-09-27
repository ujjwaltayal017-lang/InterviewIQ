
import React from "react";
import {
  Sparkles,
  FileText,
  UserRound,
  BriefcaseBusiness,
  Upload,
  BrainCircuit,
  ArrowRight,
  LogOut,
} from "lucide-react";

import { useState, useRef } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {

  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")

  const [resumeFileName, setResumeFileName] = useState("")
  const resumeInputRef = useRef()

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    setResumeFileName(file ? file.name : "")
  }


  const navigate = useNavigate()
  const { handleLogout } = useAuth();


  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]

    if (!resumeFile) {
      alert("Please upload your resume before generating a report.")
      return
    }

    const data = await generateReport({ jobDescription, selfDescription, resumeFile })

    if (!data) {
      alert("Failed to generate interview report. Please check your details and try again.")
      return
    }

    navigate(`/interview/${data._id}`)
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="text-sm font-medium text-gray-600">
            Loading your interview plan...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">

      <div className="flex items-center justify-between px-6 py-4">

        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
            <BrainCircuit size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              InterviewIQ
            </h1>
            <p className="text-xs text-gray-500">
              AI Interview Assistant
            </p>
          </div>
        </div>


        {/* Right - Logout */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={17} />
          {loading ? "Logging out..." : "Logout"}
        </button>

      </div>



      {/* Header */}
      <div className="mx-auto mb-10 max-w-4xl text-center">

        {/* Logo */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-200">
          <BrainCircuit size={34} className="text-white" />
        </div>


        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Create Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Custom Interview Plan
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Upload your resume, add the job description, and tell us about
          yourself. Our AI will create a personalized interview preparation
          plan for you.
        </p>

        {/* Small badges */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            <Sparkles size={16} className="text-blue-600" />
            AI Powered
          </span>

          <span className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            <BriefcaseBusiness size={16} className="text-indigo-600" />
            Job Specific
          </span>

          <span className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            <BrainCircuit size={16} className="text-purple-600" />
            Personalized
          </span>
        </div>
      </div>

      {/* Main Form */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">

        {/* Job Description Card */}
        <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-xl shadow-gray-200/60 backdrop-blur">

          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <FileText size={25} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Job Description
              </h2>
              <p className="text-sm text-gray-500">
                Paste the job requirements here
              </p>
            </div>
          </div>

          <textarea
            onChange={(e) => { setJobDescription(e.target.value) }}
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter job description here..."
            className="h-[430px] w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          ></textarea>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Sparkles size={15} className="text-blue-500" />
            AI will analyze the role requirements
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-xl shadow-gray-200/60 backdrop-blur">

          {/* Resume Upload */}
          <div className="mb-7">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                <Upload size={25} className="text-indigo-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Upload Resume
                </h2>
                <p className="text-sm text-gray-500">
                  Upload your latest resume
                </p>
              </div>
            </div>

            <label
              htmlFor="resume"
              className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-9 text-center transition hover:border-blue-400 hover:bg-blue-50"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 transition group-hover:scale-110">
                <Upload size={26} className="text-blue-600" />
              </div>

              {resumeFileName ? (
                <>
                  <p className="font-semibold text-green-600">
                    ✅ {resumeFileName}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Click to change file
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-gray-700">
                    Click to upload your resume
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    PDF files only
                  </p>
                </>
              )}

              <input
                ref={resumeInputRef}
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Self Description */}
          <div className="mb-7">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <UserRound size={25} className="text-purple-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Self Description
                </h2>
                <p className="text-sm text-gray-500">
                  Tell us a little about yourself
                </p>
              </div>
            </div>

            <textarea
              onChange={(e) => { setSelfDescription(e.target.value) }}
              name="selfDescription"
              id="selfDescription"
              placeholder="Example: I am a final-year CSE student with experience in MERN Stack, Java and GenAI..."
              className="h-44 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
            ></textarea>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReport}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:translate-y-0"
          >
            <Sparkles size={20} />

            Generate Interview Report

            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">
            ✨ Your interview plan will be generated using AI
          </p>

        </div>

      </div>

      {/* Recent Interview Reports */}
      {reports.length > 0 && (
        <section className="mx-auto mt-12 max-w-6xl">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <FileText size={20} className="text-indigo-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                My Recent Interview Plans
              </h2>

              <p className="text-sm text-gray-500">
                Pick up where you left off
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap justify-center gap-4">
            {reports.map((report) => (
              <li
                key={report._id}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
              >
                <button
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group flex w-full flex-col rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {report.title || "Untitled Position"}
                    </h3>

                    <ArrowRight
                      size={16}
                      className="mt-1 shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>

                  {report.createdAt && (
                    <p className="mt-3 text-xs text-gray-400">
                      Generated on{" "}
                      {new Date(report.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}

                  {report.matchScore != null && (
                    <p className="mt-3 text-xs text-blue-600">
                      Match Score: {report.matchScore}/100
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Home;