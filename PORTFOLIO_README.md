# Portfolio Website

A minimalist personal portfolio website built with Next.js 15, featuring i18n support for English (US), Traditional Chinese, and Simplified Chinese.

## Features

- Multilingual support (en-us, zh-tw, zh-cn)
- Centralized JSON data management with Zod validation
- Resume section with achievements, experience, education, projects, and skills
- Services section highlighting freelancing, tutoring, and full-time opportunities
- Dark/light theme support
- Fully responsive design
- Type-safe with TypeScript

## Getting Started

### Development

```bash
npm run dev
```

Visit:
- English: http://localhost:3000/en-us
- Traditional Chinese: http://localhost:3000/zh-tw
- Simplified Chinese: http://localhost:3000/zh-cn

### Build

```bash
npm run build
npm start
```

## Customizing Your Portfolio

### Update Personal Information

Edit the resume data files in `/data/`:
- `resume.en-us.json` - English version
- `resume.zh-tw.json` - Traditional Chinese version
- `resume.zh-cn.json` - Simplified Chinese version

### Data Structure

All resume data follows the schema defined in `/lib/schemas/resume.ts`:

**Personal Info:**
```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "email@example.com",
    "phone": "+1 234 567 8900",
    "location": "City, State",
    "links": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      "website": "https://yourwebsite.com"
    }
  }
}
```

**Experience:**
```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "2020 - Present",
      "description": "Brief description",
      "outcomes": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

**Education:**
```json
{
  "education": [
    {
      "degree": "Master of Science",
      "school": "University Name",
      "period": "2018 - 2020",
      "gpa": "3.9/4.0",
      "outcomes": [
        "Notable achievement 1",
        "Notable achievement 2"
      ]
    }
  ]
}
```

**Projects:**
```json
{
  "projects": [
    {
      "name": "Project Name",
      "period": "2023 - Present",
      "description": "Project description",
      "technologies": ["TypeScript", "React", "Node.js"],
      "outcomes": [
        "Result 1",
        "Result 2"
      ]
    }
  ]
}
```

**Skills:**
```json
{
  "skills": [
    {
      "category": "Languages",
      "items": ["TypeScript", "Python", "Go"]
    }
  ]
}
```

**Achievements:**
```json
{
  "achievements": [
    {
      "title": "Award Name",
      "organization": "Organization",
      "period": "2023",
      "description": "Description",
      "outcomes": [
        "Impact 1",
        "Impact 2"
      ]
    }
  ]
}
```

### Update Translations

Edit message files in `/messages/`:
- `en-us.json`
- `zh-tw.json`
- `zh-cn.json`

Update section titles, service descriptions, and navigation labels.

## Project Structure

```
portfolio/
├── app/
│   └── [locale]/          # Internationalized routes
│       ├── layout.tsx     # Locale-specific layout
│       └── page.tsx       # Main portfolio page
├── components/
│   └── portfolio/         # Portfolio-specific components
│       ├── header.tsx
│       ├── footer.tsx
│       ├── section.tsx
│       ├── services.tsx
│       ├── language-switcher.tsx
│       └── resume/        # Resume section components
├── data/                  # Resume data in JSON format
│   ├── resume.en-us.json
│   ├── resume.zh-tw.json
│   └── resume.zh-cn.json
├── lib/
│   ├── data.ts           # Data loading utilities
│   └── schemas/
│       └── resume.ts     # Zod schemas for validation
├── messages/             # i18n translations
│   ├── en-us.json
│   ├── zh-tw.json
│   └── zh-cn.json
└── i18n.ts              # i18n configuration
```

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Any platform supporting Next.js

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (i18n)
- Zod (schema validation)
- next-themes (dark mode)
- Lucide React (icons)
