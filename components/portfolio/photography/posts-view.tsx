'use client';

import { type PhotographyData } from '@/lib/schemas/photography';
import { InstagramEmbed } from './instagram-embed';

interface PostsViewProps {
  experience: PhotographyData['experience'];
  projects: PhotographyData['projects'];
}

export function PostsView({ experience }: PostsViewProps) {
  // Flatten all embeds from all experience items (projects don't have embeds currently)
  const allEmbeds = experience?.flatMap((exp) =>
    exp.embeds?.map((embed) => ({
      ...embed,
      experienceTitle: exp.title,
      experienceOrg: exp.organization,
    })) || []
  ) || [];

  if (allEmbeds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allEmbeds.map((embed, idx) => (
          <div key={idx} className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{embed.experienceTitle}</p>
              {embed.experienceOrg && <p>{embed.experienceOrg}</p>}
            </div>
            {embed.type === 'instagram' && (
              <InstagramEmbed url={embed.url} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}