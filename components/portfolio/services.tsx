import { useTranslations } from 'next-intl';
import { Code, GraduationCap, Briefcase } from 'lucide-react';

export function Services() {
  const t = useTranslations('services');

  const services = [
    {
      icon: Code,
      title: t('freelancing.title'),
      description: t('freelancing.description'),
    },
    {
      icon: GraduationCap,
      title: t('tutoring.title'),
      description: t('tutoring.description'),
    },
    {
      icon: Briefcase,
      title: t('fulltime.title'),
      description: t('fulltime.description'),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <div
            key={idx}
            className="p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors"
          >
            <Icon className="w-8 h-8 mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        );
      })}
    </div>
  );
}
