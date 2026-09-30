
const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/* =========================
   ZOD SCHEMA
========================= */

const interviewReportSchema = z.object({
    title: z.string(),
    matchScore: z.number().min(0).max(100),
    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string(),
        })
    ),
    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string(),
        })
    ),
    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"]),
        })
    ),
    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string()),
        })
    ),
});

/* =========================
   GEMINI JSON SCHEMA
   (note: the correct config key is `responseSchema`, not `responseJsonSchema`)
========================= */

const responseJsonSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        matchScore: { type: "number", minimum: 0, maximum: 100 },
        technicalQuestions: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        behavioralQuestions: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: { type: "string", enum: ["low", "medium", "high"] },
                },
                required: ["skill", "severity"],
            },
        },
        preparationPlan: {
            type: "array",
            minItems: 7,
            maxItems: 7,
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: { type: "array", items: { type: "string" } },
                },
                required: ["day", "focus", "tasks"],
            },
        },
    },
    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
};

/* =========================
   HELPER FUNCTIONS
========================= */

function stringValue(value, fallback = "") {
    return typeof value === "string" ? value.trim() : fallback;
}

function numberValue(value, fallback = 0) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(0, Math.min(100, number));
}

function normaliseSeverity(value) {
    const severity = String(value || "medium").toLowerCase();
    if (["low", "medium", "high"].includes(severity)) return severity;
    return "medium";
}

/* =========================
   QUESTION NORMALIZATION
   (handles both { question, intention, answer } objects AND
   plain strings — Gemini often returns strings despite the schema)
========================= */

function buildQuestionObject(item, type) {
    if (typeof item === "object" && item !== null) {
        return {
            question: stringValue(item.question, "Interview question"),
            intention: stringValue(
                item.intention,
                type === "technical"
                    ? "To evaluate the candidate's technical understanding and ability to apply the concept in practice."
                    : "To evaluate the candidate's communication, problem-solving, teamwork, ownership, and real-world experience."
            ),
            answer: stringValue(
                item.answer,
                type === "technical"
                    ? "Explain the concept clearly, give a practical example, and connect it to a relevant project or development experience."
                    : "Use a specific real-world example. Explain the situation, your responsibility, the action you took, and the result."
            ),
        };
    }

    const question = stringValue(item, "Interview question");

    return {
        question,
        intention:
            type === "technical"
                ? "To evaluate the candidate's understanding of the technical concept and their ability to apply it in a practical situation."
                : "To evaluate the candidate's communication, problem-solving, ownership, and real-world experience.",
        answer:
            type === "technical"
                ? "Start with a clear definition, explain how it works, give a practical example, and relate it to a relevant project when possible."
                : "Use a specific example from a project, college, internship, or teamwork experience. Explain the situation, your responsibility, the action you took, and the result.",
    };
}

/* =========================
   NORMALIZE AI RESPONSE
========================= */

function normalizeResult(raw) {
    const result = raw && typeof raw === "object" ? raw : {};

    const technical = Array.isArray(result.technicalQuestions) ? result.technicalQuestions : [];
    const behavioral = Array.isArray(result.behavioralQuestions) ? result.behavioralQuestions : [];
    const gaps = Array.isArray(result.skillGaps) ? result.skillGaps : [];
    const plan = Array.isArray(result.preparationPlan) ? result.preparationPlan : [];

    return {
        title: stringValue(result.title || result.targetRole, "AI Interview Report"),
        matchScore: numberValue(result.matchScore, 0),

        technicalQuestions: technical.map((item) => buildQuestionObject(item, "technical")),
        behavioralQuestions: behavioral.map((item) => buildQuestionObject(item, "behavioral")),

        skillGaps: gaps.map((item) => {
            if (typeof item === "object" && item !== null) {
                return {
                    skill: stringValue(item.skill, "Unknown skill"),
                    severity: normaliseSeverity(item.severity),
                };
            }
            return { skill: stringValue(item, "Unknown skill"), severity: "medium" };
        }),

        preparationPlan: plan.map((item, index) => {
            if (typeof item === "object" && item !== null) {
                const tasks = Array.isArray(item.tasks)
                    ? item.tasks.map(String)
                    : item.tasks
                        ? [String(item.tasks)]
                        : [];

                return {
                    day: Number(item.day) || index + 1,
                    focus: stringValue(item.focus, "Interview preparation"),
                    tasks: tasks.length ? tasks : ["Revise this topic and practice interview questions."],
                };
            }

            const task = stringValue(item, "Interview preparation");
            return { day: index + 1, focus: task, tasks: [task] };
        }),
    };
}

/* =========================
   MAKE SURE 7 DAYS EXIST
========================= */

function ensureMinimumPlan(plan) {
    const result = [...plan];
    while (result.length < 7) {
        const day = result.length + 1;
        result.push({
            day,
            focus: "Mock Interview Practice",
            tasks: [
                "Practice technical and behavioral questions.",
                "Review your projects and prepare concise explanations.",
            ],
        });
    }
    return result.slice(0, 7);
}

/* =========================
   GEMINI CALL
========================= */

async function callGemini(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseJsonSchema, // fixed: was `responseJsonSchema` key, SDK expects `responseSchema`
        },
    });

    if (!response.text) {
        throw new Error("Gemini returned an empty response.");
    }

    try {
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Gemini raw response:", response.text);
        throw new Error("Gemini returned invalid JSON.");
    }
}

/* =========================
   MAIN FUNCTION
========================= */

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
You are an expert technical interviewer and career coach.

Create a personalized interview preparation report using the candidate information below.

========================
RESUME
========================
${resume || "Not provided"}

========================
SELF DESCRIPTION
========================
${selfDescription || "Not provided"}

========================
JOB DESCRIPTION
========================
${jobDescription || "Not provided"}

========================
STRICT RULES
========================
1. Return ONLY valid JSON.
2. Generate exactly 5 technical questions.
3. Generate exactly 5 behavioral questions.
4. Generate relevant skill gaps based on the candidate versus the job.
5. Generate exactly 7 preparation-plan days.
6. Every technical question MUST have its own question-specific intention.
7. Every technical question MUST have its own interview-ready answer.
8. Every behavioral question MUST have its own question-specific intention.
9. Every behavioral question MUST have its own interview-ready answer.
10. Do NOT repeat the same intention or answer for different questions.
11. Match score must be based on the candidate information versus the job description.
12. Questions should focus on the actual technologies, responsibilities, projects and requirements present in the input.
13. Behavioral questions should be realistic interview situations.
14. Answers should be practical and suitable for an interview.
15. Technical questions should be relevant to the candidate's actual stack and the job requirements.
16. Do not return technicalQuestions or behavioralQuestions as strings.
17. They MUST be objects containing: question, intention, answer
18. Do not return preparationPlan as strings.
19. Each preparationPlan item MUST be: day, focus, tasks
20. tasks MUST be an array of strings.
`;

    let rawResult = await callGemini(prompt);
    let normalized = normalizeResult(rawResult);
    let validation = interviewReportSchema.safeParse(normalized);

    if (!validation.success) {
        console.error("AI schema mismatch. Retrying...");
        console.error(validation.error.format());

        const retryPrompt = `
Return ONLY JSON. You MUST return this exact structure:

{
  "title": "string",
  "matchScore": 0,
  "technicalQuestions": [{ "question": "string", "intention": "string", "answer": "string" }],
  "behavioralQuestions": [{ "question": "string", "intention": "string", "answer": "string" }],
  "skillGaps": [{ "skill": "string", "severity": "low" }],
  "preparationPlan": [{ "day": 1, "focus": "string", "tasks": ["string"] }]
}

IMPORTANT:
- technicalQuestions = exactly 5 objects
- behavioralQuestions = exactly 5 objects
- preparationPlan = exactly 7 objects
- Technical and behavioral questions MUST be objects, NOT strings.
- Each question must have a DIFFERENT and question-specific intention and answer.

Candidate Resume:
${resume || "Not provided"}

Self Description:
${selfDescription || "Not provided"}

Job Description:
${jobDescription || "Not provided"}
`;

        rawResult = await callGemini(retryPrompt);
        normalized = normalizeResult(rawResult);
        validation = interviewReportSchema.safeParse(normalized);

        if (!validation.success) {
            console.error("AI response after retry:");
            console.error(validation.error.format());
            throw new Error("AI response could not be converted into a valid interview report.");
        }
    }

    const result = validation.data;

    return {
        title: result.title,
        matchScore: result.matchScore,
        technicalQuestions: result.technicalQuestions,
        behavioralQuestions: result.behavioralQuestions,
        skillGaps: result.skillGaps,
        preparationPlan: ensureMinimumPlan(result.preparationPlan),
    };
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" })

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        })

        return pdfBuffer

    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate a resume for a candidate with the following detals: 
    Resume: ${resume}
    Self Description: ${selfDescription}
    job Description: ${jobDescription}

    //  the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
    //                     The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
    //                     The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
    //                     you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
    //                     The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
    //                     The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.

    You are an expert professional resume writer and ATS optimization specialist.

Generate a highly tailored, professional, ATS-friendly resume for the candidate using:

1. Candidate Resume / Profile:
{{resume}}

2. Candidate Self Description:
{{selfDescription}}

3. Target Job Description:
{{jobDescription}}

IMPORTANT OUTPUT REQUIREMENT:
Return ONLY a valid JSON object with exactly one field:

{
  "html": "<complete HTML content here>"
}

Do NOT return Markdown.
Do NOT use ${`html or json`} code fences.
Do NOT add explanations, comments, or any text outside the JSON object.

========================
RESUME CONTENT RULES
========================

1. The resume MUST be designed to fit on EXACTLY ONE A4 PAGE when converted to PDF using Puppeteer.

2. Keep the resume concise. Prioritize the most relevant information for the target job.

3. Do NOT unnecessarily repeat information.

4. Do NOT invent:
   - companies
   - job titles
   - internships
   - projects
   - technologies
   - certifications
   - achievements
   - education
   - dates
   - metrics
   - responsibilities
   - links
   - work experience

Only use information supported by the candidate's provided data.

5. Tailor the resume strongly to the given Job Description:
   - Identify the most relevant skills and technologies.
   - Prioritize matching projects and experience.
   - Use relevant keywords from the JD naturally.
   - Highlight genuine strengths related to the role.
   - Never keyword-stuff the resume.

6. The writing must sound like a real human-written professional resume.
   Avoid generic AI phrases such as:
   - "passionate professional"
   - "results-driven individual"
   - "highly motivated"
   - "dynamic professional"
   - "leveraged cutting-edge technologies"
   
   unless they are genuinely supported by the candidate information.

7. Use strong, concise bullet points.
   Each bullet should preferably be 1-2 lines.

8. Do NOT write long paragraphs.

========================
ONE-PAGE STRUCTURE
========================

Use this order whenever the candidate has enough information:

1. HEADER
   - Candidate name
   - Phone
   - Email
   - LinkedIn
   - GitHub
   - Portfolio, if available
   - Location, if relevant

2. PROFESSIONAL SUMMARY
   - Maximum 2-3 lines.
   - Tailored specifically to the target role.
   - Mention the candidate's strongest relevant technologies/experience.

3. TECHNICAL SKILLS
   Keep this compact.
   Group skills into categories such as:
   - Languages
   - Frontend
   - Backend
   - Databases
   - Tools
   - AI/Cloud

4. PROJECTS
   Include only the 2-3 most relevant projects.
   For each project:
   - Project name
   - Technologies
   - 2-3 concise bullets
   - Mention meaningful functionality or technical implementation.

5. EXPERIENCE
   Include only if supported by the candidate data.
   Keep bullets concise and relevant to the target job.

6. EDUCATION
   Keep it compact:
   - Degree
   - College/University
   - Graduation year/status
   - CGPA/percentage only if provided

7. CERTIFICATIONS / ACHIEVEMENTS
   Include only relevant certifications or achievements.
   Keep this section short.

Do NOT force every section if there is insufficient information.

========================
ATS REQUIREMENTS
========================

The HTML must be highly ATS-friendly.

Use:
- Standard section headings
- Normal text
- Simple bullet lists
- Semantic HTML
- Clear text hierarchy
- Standard readable fonts
- High text contrast

Avoid:
- Tables for the main resume layout
- Multiple columns that may confuse ATS parsers
- Text inside images
- Icons replacing important text
- Excessive graphics
- Skill bars
- Progress bars
- Complex shapes
- Background images
- Decorative elements that interfere with text extraction

Contact information must remain actual text.

========================
HTML REQUIREMENTS
========================

Return a COMPLETE HTML document:

<!DOCTYPE html>
<html>
<head>
    ...
</head>
<body>
    ...
</body>
</html>

Use embedded CSS only.

Do not use:
- external CSS
- external JavaScript
- external images
- external fonts
- CDN resources

The HTML must work directly with Puppeteer.

Use:

@page {
    size: A4;
    margin: 10mm 12mm;
}

body {
    margin: 0;
    background: white;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
}

========================
VISUAL DESIGN
========================

Design should be:

- Clean
- Modern
- Professional
- Minimal
- ATS-friendly
- Suitable for software developer / technical roles

Use one subtle accent color for headings or lines.

Do not use excessive colors.

The candidate name should be visually prominent.

Section headings should be clearly distinguishable.

Keep spacing compact enough to guarantee ONE PAGE.

========================
ONE-PAGE ENFORCEMENT
========================

This is extremely important.

The final HTML MUST fit on ONE A4 PAGE.

Use:
- compact margins
- compact section spacing
- 10-11px body font
- 14-16px section headings
- 20-24px candidate name
- compact line-height
- minimal whitespace

Never sacrifice readability just to fit content.

If the candidate has too much information:
1. Remove irrelevant content.
2. Remove repetitive bullets.
3. Keep only the strongest/relevant projects.
4. Shorten bullets.
5. Prioritize information matching the Job Description.

Do NOT simply shrink the font to an unreadable size.

========================
CONTENT PRIORITY
========================

When deciding what to keep, prioritize in this order:

1. Job-relevant experience
2. Relevant technical skills
3. Strong relevant projects
4. Relevant achievements
5. Education
6. Less relevant information

The final resume should communicate the candidate's suitability for the specific job within a few seconds of reading.

========================
FINAL VALIDATION
========================

Before returning the JSON:

- Ensure the HTML is valid.
- Ensure all tags are properly closed.
- Ensure the output contains exactly one JSON field named "html".
- Ensure the resume is designed for ONE A4 PAGE.
- Ensure the resume is ATS-friendly.
- Ensure no unsupported information has been invented.
- Ensure the resume is tailored to the provided Job Description.
- Ensure the writing sounds natural and human-written.
    `


    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
