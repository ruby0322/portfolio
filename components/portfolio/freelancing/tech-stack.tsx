'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Technology stack data with logos from CDN
const techStackData = {
  frontend: [
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  ],
  backend: [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  ],
  database: [
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  ],
  cloud: [
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    { name: 'Cloudflare', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ],
  ai: [
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'OpenAI', icon: 'https://img.icons8.com/color/96/chatgpt.png' },
    { name: 'LangChain', icon: 'https://api.iconify.design/simple-icons:langchain.svg?color=%231C3C3C' },
  ],
};

export function TechStackSection() {
  const t = useTranslations('freelancing.techStack');

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Tech Categories */}
        <div className="space-y-12">
          {Object.entries(techStackData).map(([category, technologies]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-6 text-center md:text-left">
                {t(`categories.${category}`)}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-background hover:border-foreground/20 hover:shadow-lg transition-all group"
                  >
                    <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="object-contain group-hover:scale-110 transition-transform"
                        unoptimized
                      />
                    </div>
                    <span className="text-xs font-medium text-center">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
