# AI Account Intelligence & Outreach Copilot

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)

An AI-powered GTM and Sales Intelligence platform that automates company research, account planning, outreach generation, and meeting preparation using Gemini 2.5 Flash.

## Features

* Live AI company intelligence generation
* Company overview and business analysis
* Pain point identification
* AI solution mapping
* Personalized outreach email generation
* LinkedIn message drafting
* Meeting preparation brief generation
* ICP fit scoring and reasoning
* Recommended next‑step generation
* PDF report export
* Demo fallback mode
* Responsive React‑based interface

## Architecture

```text
User Input
    ↓
React Frontend (Vite + Tailwind)
    ↓
Express Backend
    ↓
Gemini 2.5 Flash
    ↓
Structured JSON Response
    ↓
UI Rendering + PDF Export
```

## Demo

* OpenAI
* Google
* Canva
* Stripe

All demos run against live Gemini 2.5 Flash and return:

* fallback: false
* source: "live"

## Tech Stack
## Tech Stack

### Demo

Below are example outputs generated for several well‑known companies:

- **OpenAI** – Comprehensive AI‑focused intelligence.
- **Google** – Global tech giant analysis.
- **Canva** – Design platform insights.
- **Stripe** – Payment infrastructure overview.

All demos run against live Gemini 2.5 Flash and return structured JSON with `fallback: false` and `source: "live"`.

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express

### AI Layer

* Gemini 2.5 Flash

### Utilities

* jsPDF
* dotenv

## Installation

```bash
npm install
```

Create a `.env.local` file in the project root with your Gemini API key:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Start the development environment:

```bash
npm run dev
```

- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:5003
## Example Workflow

1. Enter a company name
2. Generate company intelligence
3. Review pain points and solution mapping
4. Analyze ICP fit score
5. Generate personalized outreach content
6. Review meeting preparation brief
7. Export report as PDF

## Generated Outputs

### Company Overview

Business summary and strategic context.

### Pain Points

Likely operational and business challenges.

### Solution Mapping

Alignment between customer pain points and proposed solutions.

### Outreach Email

Personalized sales email draft.

### LinkedIn Message

Short‑form prospecting message.

### Meeting Preparation Brief

Talking points, questions, objections, and discussion areas.

### ICP Fit Score

Ideal Customer Profile score with reasoning.

### Recommended Next Action

Suggested sales follow‑up strategy.

## Screenshots

### Dashboard

*Placeholder for dashboard screenshot*

### Generated Intelligence Report

*Placeholder for report screenshot*

### PDF Export

*Placeholder for PDF export screenshot*
## Future Enhancements

- CRM integrations (Salesforce, HubSpot)
- LinkedIn enrichment
- Automated follow‑up sequences
- Multi‑company comparison
- RAG‑powered company research
- Competitive intelligence module
- Sales pipeline tracking
- Team collaboration features

## Assignment Context

**Businos GTM Automation Use‑Case**

This prototype was built for *Businos*, a B2B go‑to‑market consultancy, to dramatically accelerate account‑based sales motions. By automating company research, pain‑point identification, solution mapping, and personalized outreach creation, sales teams can:

- Reduce manual research time from hours to seconds.
- Generate data‑driven ICP fit scores to prioritize high‑value accounts.
- Produce ready‑to‑send outreach emails and LinkedIn messages.
- Export a polished PDF briefing for internal alignment or client presentations.

The application showcases how Gemini 2.5 Flash can be leveraged for real‑time, high‑quality sales intelligence in a production‑ready web stack.

## Author

Harshit Anand
