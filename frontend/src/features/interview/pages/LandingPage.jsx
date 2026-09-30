import { Link } from "react-router-dom";
import {
  BrainCircuit,
  FileText,
  Target,
  Code2,
  Users,
  TrendingUp,
  CalendarDays,
  Upload,
  ClipboardList,
  Sparkles,
  Github,
  Linkedin,
} from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-slate-800/70 bg-[#020817]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <BrainCircuit size={24} />
            </div>

            <h1 className="text-2xl font-bold">
              Interview<span className="text-indigo-400">IQ</span>
            </h1>
          </Link>

          {/* ONLY LOGIN + REGISTER */}
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="rounded-lg border border-indigo-500 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold transition hover:from-indigo-700 hover:to-purple-700"
            >
              Register
            </Link>

          </div>
        </div>
      </nav>


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

          {/* Left */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
              <Sparkles size={16} />
              AI-Powered Interview Preparation
            </div>

            <h2 className="text-5xl font-extrabold leading-tight md:text-6xl">

              Prepare Smarter.
              <br />

              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Interview Better.
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              InterviewIQ analyzes your resume, self-description and target
              job description to create a personalized interview preparation
              experience using AI.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/login"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 font-semibold shadow-lg shadow-indigo-600/20 transition hover:scale-[1.02]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-slate-600 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-indigo-500/10"
              >
                Register
              </Link>

            </div>

          </div>


          {/* Right - Dashboard Preview */}

          <div className="relative">

            <div className="absolute -inset-5 rounded-3xl bg-indigo-600/20 blur-3xl" />

            <div className="relative rounded-2xl border border-indigo-500/30 bg-[#071329] p-4 shadow-2xl">

              {/* Fake dashboard header */}
              <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                  <BrainCircuit size={20} />
                </div>

                <div>
                  <p className="font-semibold">InterviewIQ</p>
                  <p className="text-xs text-slate-500">
                    AI Interview Dashboard
                  </p>
                </div>

              </div>


              {/* Match score */}

              <div className="rounded-xl border border-slate-800 bg-[#0b1930] p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-400">
                      Interview Readiness
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                      85%
                    </p>

                    <p className="text-sm text-indigo-400">
                      Match Score
                    </p>
                  </div>

                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-indigo-500/30 border-t-indigo-400">
                    <span className="font-bold">85%</span>
                  </div>

                </div>

              </div>


              {/* Report items */}

              <div className="mt-4 grid gap-3">

                <DashboardItem
                  title="Technical Questions"
                  value="5/5"
                />

                <DashboardItem
                  title="Behavioral Questions"
                  value="5/5"
                />

                <DashboardItem
                  title="Skill Gaps"
                  value="5"
                />

                <DashboardItem
                  title="Preparation Roadmap"
                  value="7 Days"
                />

              </div>


              <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 p-4">

                <div className="flex items-center gap-3">

                  <Sparkles size={25} />

                  <div>
                    <p className="font-semibold">
                      Powered by Google Gemini
                    </p>

                    <p className="text-xs text-indigo-100">
                      Personalized AI interview preparation.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}

      <section className="border-y border-slate-800/70 bg-[#031024] px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            label="OUR FEATURES"
            title="What InterviewIQ Does"
            description="Everything you need to prepare for your next interview."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon={<FileText />}
              title="Resume Analysis"
              description="Upload your resume and let InterviewIQ analyze your skills, experience and strengths."
            />

            <FeatureCard
              icon={<Target />}
              title="Job Matching"
              description="Compare your profile with the target job description and generate a personalized match score."
            />

            <FeatureCard
              icon={<Code2 />}
              title="Technical Questions"
              description="Get personalized technical interview questions based on your skills and target role."
            />

            <FeatureCard
              icon={<Users />}
              title="Behavioral Questions"
              description="Prepare for real-world interview scenarios with personalized behavioral questions."
            />

            <FeatureCard
              icon={<TrendingUp />}
              title="Skill Gaps"
              description="Identify the skills you need to improve before appearing for your interview."
            />

            <FeatureCard
              icon={<CalendarDays />}
              title="7-Day Preparation Plan"
              description="Follow a structured preparation roadmap designed around your interview requirements."
            />

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            label="SIMPLE PROCESS"
            title="How InterviewIQ Works"
            description="Turn your resume and job description into a personalized interview plan."
          />

          <div className="mt-14 grid gap-10 md:grid-cols-4">

            <Step
              number="01"
              icon={<Upload />}
              title="Upload Resume"
              description="Upload your resume in PDF format."
            />

            <Step
              number="02"
              icon={<ClipboardList />}
              title="Add Job Description"
              description="Provide the job description you are targeting."
            />

            <Step
              number="03"
              icon={<BrainCircuit />}
              title="AI Analysis"
              description="Gemini analyzes your profile and job requirements."
            />

            <Step
              number="04"
              icon={<TrendingUp />}
              title="Get Interview Plan"
              description="Receive questions, skill gaps and a 7-day roadmap."
            />

          </div>

        </div>

      </section>


      {/* ================= TECH STACK ================= */}

      <section className="border-y border-slate-800 bg-[#031024] px-6 py-20">

        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">

          <div>

            <p className="text-sm font-semibold text-indigo-400">
              BUILT WITH
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Modern Tech Stack
            </h2>

            <p className="mt-4 max-w-lg text-slate-400">
              InterviewIQ is built using modern full-stack technologies
              with AI integration.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              {[
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Tailwind CSS",
                "JWT",
                "Google Gemini API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                >
                  {tech}
                </span>
              ))}

            </div>

          </div>


          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8">

            <p className="text-sm font-semibold text-indigo-400">
              AI POWERED
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Powered by Google Gemini
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              InterviewIQ uses the Gemini API to generate structured,
              personalized interview preparation content based on the
              candidate profile and target job.
            </p>

            <div className="mt-7 flex items-center gap-3 text-2xl font-bold">

              <Sparkles className="text-indigo-400" />

              Gemini AI

            </div>

          </div>

        </div>

      </section>


      {/* ================= PROJECT FLOW ================= */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-5xl">

          <SectionHeading
            label="AI WORKFLOW"
            title="From Resume to Interview Plan"
            description="InterviewIQ processes multiple inputs to create a personalized preparation experience."
          />

          <div className="mt-12 rounded-2xl border border-slate-800 bg-[#071329] p-8">

            <div className="grid gap-6 text-center md:grid-cols-5">

              <FlowBox text="Resume" />

              <div className="hidden items-center justify-center md:flex">
                →
              </div>

              <FlowBox text="Job Description" />

              <div className="hidden items-center justify-center md:flex">
                →
              </div>

              <FlowBox text="Gemini AI" />

            </div>

            <div className="my-6 text-center text-2xl text-indigo-400">
              ↓
            </div>

            <div className="grid gap-4 md:grid-cols-4">

              <OutputBox text="Match Score" />
              <OutputBox text="Technical Questions" />
              <OutputBox text="Skill Gaps" />
              <OutputBox text="7-Day Roadmap" />

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-6 pb-20">

        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 md:p-12">

          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

            <div>

              <h2 className="text-3xl font-bold">
                Ready to prepare for your next interview?
              </h2>

              <p className="mt-2 text-indigo-100">
                Create your personalized interview preparation plan.
              </p>

            </div>

            <div className="flex gap-3">

              <Link
                to="/login"
                className="rounded-xl bg-white px-7 py-3 font-semibold text-indigo-700 transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-white/50 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Register
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-800 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">

          <Link to="/" className="flex items-center gap-2">

            <BrainCircuit className="text-indigo-400" />

            <span className="font-bold">
              Interview<span className="text-indigo-400">IQ</span>
            </span>

          </Link>

          <p className="text-sm text-slate-500">
            © 2026 InterviewIQ. All rights reserved.
          </p>

          <div className="flex gap-4 text-slate-400">

            <Github
              size={20}
              className="cursor-pointer hover:text-white"
            />

            <Linkedin
              size={20}
              className="cursor-pointer hover:text-white"
            />

          </div>

        </div>

      </footer>

    </div>
  );
}


/* ================= COMPONENTS ================= */

function SectionHeading({ label, title, description }) {
  return (
    <div className="text-center">

      <p className="text-sm font-semibold text-indigo-400">
        {label}
      </p>

      <h2 className="mt-2 text-3xl font-bold md:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-slate-400">
        {description}
      </p>

    </div>
  );
}


function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#071329] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
        {icon}
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-6 text-slate-400">
        {description}
      </p>

    </div>
  );
}


function Step({ number, icon, title, description }) {
  return (
    <div className="text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-400">

        {icon}

      </div>

      <p className="mt-4 text-sm font-bold text-indigo-400">
        {number}
      </p>

      <h3 className="mt-2 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  );
}


function DashboardItem({ title, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#0b1930] px-4 py-3">

      <span className="text-sm text-slate-400">
        {title}
      </span>

      <span className="text-sm font-bold text-indigo-400">
        {value}
      </span>

    </div>
  );
}


function FlowBox({ text }) {
  return (
    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 font-semibold text-indigo-300">
      {text}
    </div>
  );
}


function OutputBox({ text }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center text-sm text-slate-300">
      {text}
    </div>
  );
}


export default LandingPage;
