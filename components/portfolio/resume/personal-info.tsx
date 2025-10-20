import { type UnifiedPersonalInfo } from '@/lib/schemas/resume';
import { Github, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

interface PersonalInfoProps {
  info: UnifiedPersonalInfo;
}

export function PersonalInfo({ info }: PersonalInfoProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{info.name}</h1>
          {info.title && (
            <p className="text-xl text-muted-foreground">{info.title}</p>
          )}
        </div>
        {info.personalPhoto && (
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted">
              <Image
                src={info.personalPhoto}
                alt={`${info.name} personal photo`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          </div>
        )}
      </div>
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
