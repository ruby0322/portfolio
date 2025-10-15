import { type UnifiedPersonalInfo } from '@/lib/schemas/resume';
import { Github, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';

interface PersonalInfoProps {
  info: UnifiedPersonalInfo;
}

export function PersonalInfo({ info }: PersonalInfoProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-2">{info.name}</h1>
      {info.title && (
        <p className="text-xl text-muted-foreground mb-4">{info.title}</p>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {info.email && (
          <a
            href={`mailto:${info.email}`}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            {info.email}
          </a>
        )}
        {info.phone && (
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {info.phone}
          </span>
        )}
        {info.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {info.location}
          </span>
        )}
      </div>
      {info.links && (
        <div className="flex gap-3 mt-4">
          {info.links.github && (
            <a
              href={info.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {info.links.linkedin && (
            <a
              href={info.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {info.links.website && (
            <a
              href={info.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
