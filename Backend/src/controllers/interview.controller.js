const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const inteviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        // 1. Ensure file exists
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "Resume PDF file is required." });
        }

        const { selfDescription, jobDescription } = req.body;

        // 2. Catch missing form data early
        if (!jobDescription) {
            return res.status(400).json({ message: "jobDescription is required in the form data." });
        }

        // 3. Parse PDF
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

        // 4. Generate AI Report
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription: selfDescription || "",
            jobDescription
        });

        // Log AI response to debug if it misses fields
        console.log("AI Output successfully generated.");
        console.log(interViewReportByAi);

        // 5. Save to Database (Added fallback for title if AI misses it)
        const interviewReport = await inteviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            title: interViewReportByAi.title || "Software Engineer", // Fallback to prevent validation error
            ...interViewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

module.exports = { generateInterviewReportController };