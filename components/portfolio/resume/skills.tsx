import { type Skill } from '@/lib/schemas/resume';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <div className="space-y-6">
      {skills.map((skill, idx) => (
        <div key={idx}>
          <h3 className="text-base font-normal text-foreground mb-3">{skill.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, itemIdx) => (
              <span
                key={itemIdx}
                className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
