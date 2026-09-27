
import React, { useState } from "react";
import {
  BrainCircuit,
  Code2,
  MessageSquare,
  Map,
  Target,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  CalendarDays,
  Download,
  LogOut,
} from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";

const InterviewReport = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const { report, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams()

  const navigate = useNavigate()
  const { handleLogout } = useAuth();

  // ================= LOADING / EMPTY STATES =================
  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-violet-500"></div>
          <p className="text-sm text-gray-400">Loading interview report...</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">
        <p className="text-sm text-gray-400">No interview report found.</p>
      </main>
    );
  }

  // ================= DATA (matches backend schema) =================
  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const skillGaps = report.skillGaps || [];
  const preparationPlan = report.preparationPlan || [];

  const questions = activeTab === "technical" ? technicalQuestions : behavioralQuestions;
  const currentQuestion = questions[selectedQuestion];

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSelectedQuestion(0);
  };

  const nextQuestion = () => {
    if (questions.length === 0) return;
    setSelectedQuestion((selectedQuestion + 1) % questions.length);
  };

  return (
    <main className="min-h-screen bg-[#09090b] p-4 text-white md:p-6">
      {/* ================= HEADER ================= */}

      <header className="mx-auto mb-5 max-w-[1450px] px-4">
        <div className="flex items-center justify-between rounded-2xl px-2 py-3">

          {/* Left - Report Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-md">
              <BrainCircuit size={24} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-gray-500">
                AI Interview Report
              </p>

              <h1 className="text-lg font-bold text-gray-400 md:text-xl">
                {report.title || "Interview Preparation Report"}
              </h1>
            </div>
          </div>

          {/* Right - Logout */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-violet-600 hover:to-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={17} />
            {loading ? "Logging out..." : "Logout"}
          </button>

        </div>
      </header>






      {/* ================= DASHBOARD ================= */}
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-4 lg:grid-cols-[190px_minmax(0,1fr)_270px]">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="rounded-2xl border border-white/10 bg-[#111113] p-3">

          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-gray-600">
            Navigation
          </p>

          {/* Technical */}
          <button
            onClick={() => changeTab("technical")}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${activeTab === "technical"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
              }`}
          >
            <Code2 size={17} />
            <span className="flex-1">Technical</span>
            <span className="text-[10px]">
              {String(technicalQuestions.length).padStart(2, "0")}
            </span>
          </button>

          {/* Behavioral */}
          <button
            onClick={() => changeTab("behavioral")}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${activeTab === "behavioral"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
              }`}
          >
            <MessageSquare size={17} />
            <span className="flex-1">Behavioral</span>
            <span className="text-[10px]">
              {String(behavioralQuestions.length).padStart(2, "0")}
            </span>
          </button>

          {/* Road Map */}
          <button
            onClick={() => changeTab("roadmap")}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${activeTab === "roadmap"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
              }`}
          >
            <Map size={17} />
            <span className="flex-1">Road Map</span>
            <span className="text-[10px]">
              {String(preparationPlan.length).padStart(2, "0")}
            </span>
          </button>

          {/* Download Resume */}
          <button
            onClick={() => getResumePdf(interviewId)}
            className="mt-6 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition
      bg-gradient-to-r from-indigo-600 to-purple-600
      hover:from-indigo-700 hover:to-purple-700
      text-white shadow-lg shadow-indigo-600/20"
          >
            <Download size={17} />
            <span className="flex-1">Download AI Resume</span>
          </button>

        </aside>

        {/* ================= CENTER ================= */}
        <section className="min-h-[700px] overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
          {/* ================= TECHNICAL ================= */}
          {activeTab === "technical" && (
            <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-[245px_1fr]">
              <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
                <div className="mb-5">
                  <div className="flex items-center gap-2">
                    <Code2 size={17} className="text-violet-400" />
                    <h2 className="text-sm font-semibold">Technical Questions</h2>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-600">Select a question</p>
                </div>
                <div className="space-y-2">
                  {technicalQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestion(index)}
                      className={`flex w-full gap-2 rounded-xl p-3 text-left transition ${selectedQuestion === index ? "bg-white/[0.08]" : "hover:bg-white/[0.03]"
                        }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] ${selectedQuestion === index
                          ? "bg-violet-500 text-white"
                          : "bg-white/5 text-gray-600"
                          }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`line-clamp-3 text-[11px] leading-5 ${selectedQuestion === index ? "text-gray-200" : "text-gray-500"
                          }`}
                      >
                        {item.question}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {currentQuestion ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-medium text-violet-400">
                        Question {selectedQuestion + 1} / {technicalQuestions.length}
                      </span>
                      <span className="text-[10px] text-gray-600">Technical</span>
                    </div>
                    <h2 className="mt-7 max-w-3xl text-xl font-bold leading-8 md:text-2xl">
                      {currentQuestion.question}
                    </h2>

                    <div className="mt-8 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Target size={17} className="text-blue-400" />
                        <h3 className="text-sm font-semibold text-blue-300">
                          Interviewer's Intention
                        </h3>
                      </div>
                      <p className="text-xs leading-6 text-gray-500">{currentQuestion.intention}</p>
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Lightbulb size={17} className="text-emerald-400" />
                        <h3 className="text-sm font-semibold text-emerald-300">Answer</h3>
                      </div>
                      <p className="text-xs leading-6 text-gray-500">{currentQuestion.answer}</p>
                    </div>

                    <div className="mt-7 flex justify-end">
                      <button
                        onClick={nextQuestion}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
                      >
                        Next
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[600px] items-center justify-center">
                    <p className="text-sm text-gray-500">No technical questions available.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= BEHAVIORAL ================= */}
          {activeTab === "behavioral" && (
            <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-[245px_1fr]">
              <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
                <div className="mb-5">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={17} className="text-pink-400" />
                    <h2 className="text-sm font-semibold">Behavioral Questions</h2>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-600">Select a question</p>
                </div>
                <div className="space-y-2">
                  {behavioralQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestion(index)}
                      className={`flex w-full gap-2 rounded-xl p-3 text-left transition ${selectedQuestion === index ? "bg-white/[0.08]" : "hover:bg-white/[0.03]"
                        }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] ${selectedQuestion === index
                          ? "bg-pink-500 text-white"
                          : "bg-white/5 text-gray-500"
                          }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`line-clamp-3 text-[11px] leading-5 ${selectedQuestion === index ? "text-gray-200" : "text-gray-500"
                          }`}
                      >
                        {item.question}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {currentQuestion ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-pink-500/10 px-3 py-1 text-[10px] text-pink-400">
                        Behavioral Question {selectedQuestion + 1} / {behavioralQuestions.length}
                      </span>
                      <span className="text-[10px] text-gray-600">Behavioral</span>
                    </div>
                    <h2 className="mt-7 text-xl font-bold leading-8 md:text-2xl">
                      {currentQuestion.question}
                    </h2>

                    <div className="mt-8 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Target size={17} className="text-blue-400" />
                        <h3 className="text-sm font-semibold text-blue-300">
                          Interviewer's Intention
                        </h3>
                      </div>
                      <p className="text-xs leading-6 text-gray-500">{currentQuestion.intention}</p>
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Lightbulb size={17} className="text-emerald-400" />
                        <h3 className="text-sm font-semibold text-emerald-300">Answer</h3>
                      </div>
                      <p className="text-xs leading-6 text-gray-500">{currentQuestion.answer}</p>
                    </div>

                    <div className="mt-7 flex justify-end">
                      <button
                        onClick={nextQuestion}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
                      >
                        Next
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[600px] items-center justify-center">
                    <p className="text-sm text-gray-500">No behavioral questions available.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= ROADMAP (preparationPlan) ================= */}
          {activeTab === "roadmap" && (
            <div className="p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                  <CalendarDays size={20} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="font-semibold">Preparation Road Map</h2>
                  <p className="text-xs text-gray-600">
                    {preparationPlan.length} day personalized preparation plan
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {preparationPlan.length > 0 ? (
                  preparationPlan.map((item) => (
                    <div
                      key={item.day}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-violet-500/20"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-xs font-bold text-orange-400">
                          {item.day}
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-600">
                            Day {item.day}
                          </p>
                          <h3 className="mt-1 text-sm font-semibold">{item.focus}</h3>
                          {Array.isArray(item.tasks) && item.tasks.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {item.tasks.map((task, i) => (
                                <li key={i} className="text-xs leading-5 text-gray-500">
                                  • {task}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
                    <p className="text-sm text-gray-500">No preparation roadmap available.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="space-y-4">
          {/* ================= MATCH SCORE ================= */}
          <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">
            <div className="mb-5 flex items-center gap-2">
              <Target size={17} className="text-violet-400" />
              <h2 className="text-sm font-semibold">Match Score</h2>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#8b5cf6 ${Number(report.matchScore || 0) * 3.6}deg, #25252d 0deg)`,
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#111113]">
                  <span className="text-4xl font-bold">{report.matchScore ?? 0}</span>
                  <span className="text-[10px] text-gray-600">out of 100</span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-gray-600">Resume &amp; job compatibility</p>
            </div>
          </div>

          {/* ================= SKILL GAPS ================= */}
          <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">
            <div className="mb-5 flex items-center gap-2">
              <AlertTriangle size={17} className="text-yellow-400" />
              <h2 className="text-sm font-semibold">Skill Gaps</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGaps.length > 0 ? (
                skillGaps.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <p className="text-xs text-gray-300">{item.skill}</p>
                    <span
                      className={`text-[9px] uppercase ${item.severity === "high"
                        ? "text-red-400"
                        : item.severity === "medium"
                          ? "text-yellow-400"
                          : "text-emerald-400"
                        }`}
                    >
                      {item.severity}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No skill gaps found.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default InterviewReport;