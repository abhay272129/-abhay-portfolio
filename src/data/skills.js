// level: 'core' = daily professional use, 'working' = used in projects, 'learning' = ongoing development.
// These labels are honest descriptors, not proficiency scores. Do not add percentage bars.
// footnote (optional): one factual line pinned to the bottom of the card.

export const skillGroups = [
  {
    id: 'backend',
    index: '01',
    title: 'Backend Engineering',
    note: 'Primary professional foundation.',
    footnote: 'Used daily on enterprise insurance applications at Programmers.io.',
    featured: true,
    skills: [
      { name: 'Java', level: 'core' },
      { name: 'Spring Boot', level: 'core' },
      { name: 'Spring MVC', level: 'core' },
      { name: 'Spring Security', level: 'working' },
      { name: 'REST APIs', level: 'core' },
      { name: 'JPA / Hibernate', level: 'working' },
      { name: 'Maven', level: 'core' },
    ],
  },
  {
    id: 'frontend',
    index: '02',
    title: 'Frontend Development',
    note: 'Server-rendered UI at work; React in personal projects.',
    skills: [
      { name: 'JavaScript', level: 'working' },
      { name: 'HTML', level: 'working' },
      { name: 'CSS', level: 'working' },
      { name: 'Bootstrap', level: 'working' },
      { name: 'JSP', level: 'core' },
      { name: 'React', level: 'learning' },
      { name: 'Responsive UI', level: 'working' },
    ],
  },
  {
    id: 'data',
    index: '03',
    title: 'Databases',
    note: 'Relational databases.',
    skills: [
      { name: 'MySQL', level: 'working' },
      { name: 'SQL Server', level: 'working' },
      { name: 'DB2', level: 'working' },
    ],
  },
  {
    id: 'cloud',
    index: '04',
    title: 'Cloud & Engineering Tools',
    note: 'Cloud skills under active development.',
    footnote: 'AWS and cloud infrastructure are a current learning focus.',
    wide: true,
    skills: [
      { name: 'AWS', level: 'learning' },
      { name: 'Docker', level: 'working' },
      { name: 'Testcontainers', level: 'working' },
      { name: 'Git', level: 'core' },
      { name: 'GitHub', level: 'core' },
      { name: 'VS Code', level: 'core' },
    ],
  },
];

export const levelLabels = {
  core: 'Daily use',
  working: 'Working knowledge',
  learning: 'Currently learning',
};
