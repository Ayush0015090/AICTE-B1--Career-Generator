// ================================
// Career Compass AI - app.js
// Version 2 (With Delay & Typewriter Animation)
// ================================

const form = document.getElementById("roadmap-form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the submit button to disable it during animation
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const year = document.getElementById("year").value;
        const role = document.getElementById("role").value;
        const hours = parseInt(document.getElementById("hours").value) || 0;
        const timeline = document.getElementById("timeline").value;

        const skills = Array.from(
            document.querySelectorAll(".skills-box input:checked")
        ).map(skill => skill.value);

        const interests = Array.from(
            document.querySelectorAll(".interest-box input:checked")
        ).map(interest => interest.value);

        // Validation
        if (!year || !role || !hours || !timeline) {
            alert("⚠️ Please fill all required fields.");
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        if (skills.length === 0) {
            alert("⚠️ Please select at least one skill.");
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        // Hide download button if it was visible from a previous generation
        const downloadBtn = document.getElementById("download-pdf");
        if (downloadBtn) {
            downloadBtn.classList.add("hidden");
        }

        // Show a loading/thinking state instantly
        const resultBox = document.querySelector(".result-container");
        if (resultBox) {
            resultBox.innerHTML = `<pre style="font-family: inherit; color: #888;">⏳ Analyzing your profile and generating roadmap...</pre>`;
        }

        // ================================
        // Required Skills Setup
        // ================================
        const roleSkills = {
            "AI Engineer": ["Python", "Git"],
            "Data Scientist": ["Python", "SQL", "Power BI"],
            "Software Developer": ["HTML", "CSS", "JavaScript", "Git", "React"],
            "Cybersecurity Analyst": ["Python", "C"],
            "Cloud Engineer": ["Python", "Git"],
            "Data Analyst": ["SQL", "Power BI", "Python"],
            "DevOps Engineer": ["Git", "Python"],
            "Product Manager": ["SQL"],
            "UI/UX Designer": ["HTML", "CSS"]
        };

        const requiredSkills = roleSkills[role] || [];
        const missingSkills = requiredSkills.filter(skill => !skills.includes(skill));
        const matchedSkills = requiredSkills.filter(skill => skills.includes(skill)).length;

        const readinessScore = requiredSkills.length > 0 
            ? Math.round((matchedSkills / requiredSkills.length) * 100) 
            : 0;

        let bars = Math.round(readinessScore / 10);
        let progressBar = "▓".repeat(bars) + "░".repeat(10 - bars);

        let pace = hours <= 5 ? "Slow" : hours <= 15 ? "Moderate" : "Intensive";

        let yearAdvice = "";
        switch (year) {
            case "1st Year": yearAdvice = "Focus on fundamentals and exploring domains."; break;
            case "2nd Year": yearAdvice = "Start building projects and learning industry tools."; break;
            case "3rd Year": yearAdvice = "Focus on internships, resume building and networking."; break;
            case "4th Year": yearAdvice = "Prepare for placements and technical interviews."; break;
            default: yearAdvice = "Upskill and focus on job opportunities.";
        }

        let projects = "";
        if (role === "AI Engineer") projects = "• AI Chatbot\n• Resume Analyzer\n• Image Classifier";
        else if (role === "Data Scientist") projects = "• Sales Prediction Model\n• Customer Segmentation\n• Data Dashboard";
        else if (role === "Software Developer") projects = "• Portfolio Website\n• Weather App\n• Task Manager";
        else if (role === "Cybersecurity Analyst") projects = "• Password Strength Checker\n• Network Scanner\n• Vulnerability Report Tool";
        else projects = "• Domain Specific Mini Project\n• Portfolio Project\n• Internship Project";

        let timelinePlan = "";
        if (timeline === "3 Months") {
            timelinePlan = "Month 1\n• Learn missing skills\n• Complete fundamentals\n\nMonth 2\n• Build projects\n• Improve GitHub profile\n\nMonth 3\n• Resume building\n• Internship applications";
        } else if (timeline === "6 Months") {
            timelinePlan = "Month 1-2\n• Learn core concepts\n\nMonth 3-4\n• Build projects\n\nMonth 5\n• Certifications\n\nMonth 6\n• Internship preparation";
        } else if (timeline === "1 Year") {
            timelinePlan = "Quarter 1\n• Fundamentals\n\nQuarter 2\n• Advanced Skills\n\nQuarter 3\n• Portfolio Projects\n\nQuarter 4\n• Placement Preparation";
        } else {
            timelinePlan = "Year 1\n• Skills + Projects\n\nYear 2\n• Internship + Job Readiness";
        }

        let weeklyPlan = "";
        if (hours <= 5) weeklyPlan = "Monday → Learning\nWednesday → Practice\nFriday → Revision\nWeekend → Project Work";
        else if (hours <= 15) weeklyPlan = "Mon-Fri → 2 Hours Learning\nSaturday → Project Development\nSunday → Revision + Portfolio";
        else weeklyPlan = "Daily → 2-3 Hours Learning\nWeekend → Major Project Work\nSunday → Mock Interviews";

        // Construct Roadmap Text
        const roadmap = `🎯 PERSONALIZED CAREER ROADMAP

----------------------------------------
👨‍🎓 Academic Year: ${year}
🎯 Target Role: ${role}
📈 Readiness Score: ${readinessScore}% [${progressBar}]
⚡ Study Pace: ${pace} (${hours} hours/week)
⏳ Timeline: ${timeline}
💡 Interests: ${interests.join(", ") || "Not Selected"}
----------------------------------------

✅ Current Skills:
${skills.join(", ")}

----------------------------------------

❌ Missing Skills:
${missingSkills.length > 0 ? missingSkills.join(", ") : "None - Great Progress!"}

----------------------------------------

🚀 Recommended Projects:
${projects}

----------------------------------------

⏳ Timeline Breakdown:
${timelinePlan}

----------------------------------------

📅 Weekly Commitment Strategy:
${weeklyPlan}

----------------------------------------

📚 Recommended Action Plan:
1. Learn Missing Skills
2. Build 2-3 Real Projects
3. Create Strong GitHub Portfolio
4. Optimize LinkedIn Profile
5. Apply for Internships

----------------------------------------

🎓 Certifications:
• IBM SkillsBuild
• Google Career Certificates
• Coursera Certifications

----------------------------------------

📝 Academic Advice:
${yearAdvice}

----------------------------------------

🔥 Final Mentor Advice:
As a ${year} student targeting ${role}, focus on practical implementation rather than only theoretical learning. Build real projects, maintain an active GitHub profile, optimize LinkedIn, and document your learning journey. Following this roadmap for ${timeline} can significantly improve internship and placement opportunities. Stay consistent!
`;

        // ================================
        // 3-Second Delay & Typewriter Effect Implementation
        // ================================
        setTimeout(() => {
            if (resultBox) {
                // Set up the container layout
                resultBox.innerHTML = `
                    <pre id="typewriter-target" style="
                        white-space: pre-wrap;
                        line-height: 1.8;
                        font-family: inherit;
                        margin: 0;
                        padding: 15px;
                    "></pre>
                `;

                const targetElement = document.getElementById("typewriter-target");
                let index = 0;
                
                // Typing speed adjusting variable (Lower = Faster typing)
                const typingSpeed = 3; 

                function typeWriter() {
                    if (index < roadmap.length) {
                        targetElement.textContent += roadmap.charAt(index);
                        index++;
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        // Typing complete: Show PDF download option & re-enable submit
                        if (downloadBtn) downloadBtn.classList.remove("hidden");
                        if (submitBtn) submitBtn.disabled = false;
                    }
                }
                
                // Start typing out the roadmap
                typeWriter();
            }
        }, 3000); // 3000ms = 3-second delay
    });
}

// ================================
// PDF Export System (FIXED: Emoji & Encoding Corruption)
// ================================
const downloadBtn = document.getElementById("download-pdf");
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const resultContainer = document.querySelector(".result-container");
        if (!resultContainer) return;

        let roadmapText = resultContainer.innerText;

        // Clean up text specifically for the PDF to prevent encoding corruption
        let cleanText = roadmapText
            .replace(/🎯/g, "")
            .replace(/👨‍🎓/g, "")
            .replace(/📈/g, "")
            .replace(/⚡/g, "")
            .replace(/⏳/g, "")
            .replace(/💡/g, "")
            .replace(/🚀/g, "")
            .replace(/📚/g, "")
            .replace(/🎓/g, "")
            .replace(/📝/g, "")
            .replace(/🔥/g, "")
            .replace(/✅/g, "[Active]")
            .replace(/❌/g, "[Missing]")
            .replace(/▓/g, "=") // Replaces progress bar block with standard '='
            .replace(/░/g, "-") // Replaces empty progress bar block with '-'
            .replace(/→/g, "->"); // Replaces arrow symbol

        // Safety fallback: Strip any remaining non-standard character that might corrupt fonts
        cleanText = cleanText.replace(/[^\x00-\x7F]/g, "");

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(20);
        doc.text("Career Compass AI", 20, 20);
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(11);

        // Format and split the sanitized text
        const lines = doc.splitTextToSize(cleanText, 170);
        let y = 35; 
        const pageHeight = doc.internal.pageSize.height;

        for (let i = 0; i < lines.length; i++) {
            if (y > pageHeight - 20) { 
                doc.addPage();
                y = 20;
            }
            doc.text(lines[i], 20, y);
            y += 7;
        }

        doc.save("Career_Compass_Roadmap.pdf");
    });
}