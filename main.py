# =========================
# main.py (FINAL STABLE - FIXED)
# =========================

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from google import genai   # ✅ NEW SDK
import requests
import os
from dotenv import load_dotenv

# ================= LOAD ENV =================
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID")
ADZUNA_APP_KEY = os.getenv("ADZUNA_APP_KEY")

# ================= FASTAPI INIT =================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= GEMINI CONFIG =================
client = genai.Client(api_key=GEMINI_API_KEY)  # ✅ NEW CLIENT


# ================= ANALYSE =================
@app.post("/analyse")
async def analyse_resume(
    file: UploadFile = File(...),
    jobRole: str = Form(...)
):
    try:
        contents = await file.read()

        if not contents:
            return JSONResponse(status_code=400, content={"error": "Empty file"})

        resume_text = contents.decode("utf-8", errors="ignore")

        # ---------- Extract Skills ----------
        skill_prompt = f"""
        From this resume extract only technical skills.
        Return only comma separated values.
        Resume:
        {resume_text}
        """

        skill_response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=skill_prompt
        )

        if not skill_response.text:
            return JSONResponse(status_code=500, content={"error": "Gemini skill extraction failed"})

        user_skills = [
            s.strip()
            for s in skill_response.text.split(",")
            if s.strip()
        ]

        # ---------- Required Skills ----------
        role_prompt = f"""
        List the important technical skills required for a {jobRole}.
        Return only comma separated values.
        """

        role_response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=role_prompt
        )

        if not role_response.text:
            return JSONResponse(status_code=500, content={"error": "Gemini role skill extraction failed"})

        required_skills = [
            s.strip()
            for s in role_response.text.split(",")
            if s.strip()
        ]

        # ---------- Matching ----------
        matched_skills = list(set(user_skills) & set(required_skills))
        missing_skills = list(set(required_skills) - set(user_skills))

        # ---------- Advice ----------
        advice_prompt = f"""
        User skills: {user_skills}
        Required skills: {required_skills}

        Write 6 professional lines advising how to improve job chances.
        """

        advice_response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=advice_prompt
        )

        improvement_advice = advice_response.text if advice_response.text else ""

        return {
            "userSkills": user_skills,
            "requiredSkills": required_skills,
            "matchedSkills": matched_skills,
            "missingSkills": missing_skills,
            "improvementAdvice": improvement_advice
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


# ================= JOBS =================
@app.get("/jobs")
def get_jobs(role: str):
    try:
        url = "https://api.adzuna.com/v1/api/jobs/in/search/1"

        params = {
            "app_id": ADZUNA_APP_ID,
            "app_key": ADZUNA_APP_KEY,
            "results_per_page": 18,
            "what": role
        }

        response = requests.get(url, params=params)
        data = response.json()

        jobs = []

        for job in data.get("results", []):
            jobs.append({
                "title": job.get("title"),
                "company": job.get("company", {}).get("display_name"),
                "location": job.get("location", {}).get("display_name"),
                "description": (job.get("description") or "")[:180] + "...",
                "redirect_url": job.get("redirect_url")
            })

        return jobs

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get("/")
def root():
    return {"message": "Backend Running"}