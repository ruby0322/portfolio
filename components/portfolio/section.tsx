import { type ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-18 px-6 border-t border-border ${className}`}>
      <div className="max-w-3xl mx-auto">
        {title && (
          <h2 className="text-2xl font-light text-foreground mb-12">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
