import { type Service } from '@/lib/schemas/services';
import { Briefcase, Code, Facebook, GraduationCap, Linkedin, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  service: Service;
}

const iconMap = {
  'code': Code,
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
};

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services');
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Code;

  return (
    <div className="border border-border rounded-lg overflow-hidden hover:border-foreground/20 transition-all hover:shadow-lg">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left Side - Icon and Title */}
        <div className="md:w-1/3 flex-shrink-0">
          <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
            <div className="p-4 bg-muted rounded-lg">
              <Icon className="w-8 h-8 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.shortDescription}
              </p>
              
              {/* Availability */}
              <div className="flex flex-col gap-2 text-sm mb-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded inline-block">
                  {service.availability}
                </span>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-2 text-sm">
                <span className="font-medium">{t('priceRange')}:</span>
                <span className="text-muted-foreground">{service.priceRange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex-1 space-y-4">
          {/* Long Description */}
          <p className="text-sm leading-relaxed">{service.longDescription}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div>
                {/* <h4 className="text-sm font-semibold mb-2">{t('features')}:</h4> */}
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div>
                {/* <h4 className="text-sm font-semibold mb-2">{t('technologies')}:</h4> */}
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-muted text-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="pt-4 border-t border-border">
            {/* <h4 className="text-sm font-semibold mb-2">{t('contact')}:</h4> */}
            <div className="flex flex-wrap gap-4">
              {service.contactInfo.email && (
                <a
                  href={`mailto:${service.contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {service.contactInfo.email}
                </a>
              )}
              {service.contactInfo.phone && (
                <a
                  href={`tel:${service.contactInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {service.contactInfo.phone}
                </a>
              )}
              {service.contactInfo.linkedin && (
                <a
                  href={service.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {service.contactInfo.facebook && (
                <a
                  href={service.contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
