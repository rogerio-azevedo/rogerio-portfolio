// Import das imagens
import leadershipIcon from '@assets/images/soft-skills/leadership.svg'
import stakeholderIcon from '@assets/images/soft-skills/stakeholder.svg'
import innovationIcon from '@assets/images/soft-skills/innovation.svg'
import mentorshipIcon from '@assets/images/soft-skills/mentorship.svg'

export interface SoftSkillItem {
  key: string
  thumbnail: string
}

export const softSkillItems: SoftSkillItem[] = [
  {
    key: 'strategic_leadership',
    thumbnail: leadershipIcon,
  },
  {
    key: 'stakeholder_communication',
    thumbnail: stakeholderIcon,
  },
  {
    key: 'innovation_management',
    thumbnail: innovationIcon,
  },
  {
    key: 'technical_mentorship',
    thumbnail: mentorshipIcon,
  },
]
