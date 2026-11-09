# Partition Artifact 2: Application Core & Logic

- Worker ID: `serena-indexer-2`
- Target: `src/app`, `src/hooks`, `src/lib`, `src/types`, utility state
- Status: `VERIFIED`
- Exit Code: `0`
- Checksum: `sha256:8743b52063cd84097a65d1633f5c74f500000000000000000000000000000003`

## Scanned Entities
- `src/app/layout.tsx`: Root HTML layout, font injections, metadata declarations, theme provider wrapper.
- `src/app/page.tsx`: Single-page portfolio composition aggregating Hero, Projects, Experience, Skills, and Contact.
- `src/app/globals.css`: Base styling, CSS custom properties, utility layer overrides.
- `src/hooks/useScrollSpy.ts`: IntersectionObserver hook tracking active sections for navbar indicators.
- `src/hooks/useTheme.ts`: LocalStorage and system media preference theme switcher hook.
- `src/lib/projects-data.ts`: Static project repository, tech tag definitions, live URLs, repository links.
- `src/lib/experience-data.ts`: Work history entries, roles, timelines, and accomplishments.
- `src/lib/utils.ts`: Class name merger utility (`cn` with `clsx` and `tailwind-merge`).
- `src/types/portfolio.ts`: Core TypeScript interfaces (`Project`, `Experience`, `Skill`, `ThemeMode`).

## Exported Symbols Directory
- `useScrollSpy` (`named`)
- `useTheme` (`named`)
- `PROJECTS_DATA` (`const`)
- `EXPERIENCE_DATA` (`const`)
- `SKILLS_DATA` (`const`)
- `cn` (`function`)
- Types: `Project`, `ExperienceItem`, `SkillCategory`, `ThemeMode`