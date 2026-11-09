# Partition Artifact 1: UI & Presentation Components

- Worker ID: `serena-indexer-1`
- Target: `src/components`, presentation layouts, interactive elements
- Status: `VERIFIED`
- Exit Code: `0`
- Checksum: `sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

## Scanned Entities
- `src/components/layout/Navbar.tsx`: Sticky navigation bar with responsive drawer and theme toggler.
- `src/components/layout/Footer.tsx`: Semantic footer with social links, copyright, and sitemap anchor points.
- `src/components/sections/Hero.tsx`: Headline display, status badge, call-to-action buttons.
- `src/components/sections/Projects.tsx`: Dynamic project grid with tag filters and modal preview triggers.
- `src/components/sections/Experience.tsx`: Chronological career timeline with milestone nodes.
- `src/components/sections/Skills.tsx`: Categorized skill chips with proficiency indicators.
- `src/components/sections/Contact.tsx`: Accessible contact form with validation state and direct links.
- `src/components/ui/Button.tsx`: Primitive reusable button component with variant and size polymorphism.
- `src/components/ui/Card.tsx`: Reusable surface container supporting hover states and accent borders.
- `src/components/ui/Badge.tsx`: Tag element for technology stacks and status indicators.

## Exported Symbols Directory
- `Navbar` (`default`, named `Navbar`)
- `Footer` (`default`, named `Footer`)
- `Hero` (`default`, named `Hero`)
- `Projects` (`default`, named `Projects`)
- `ProjectCard` (`named`)
- `ExperienceTimeline` (`named`)
- `SkillsGrid` (`named`)
- `ContactSection` (`named`)
- `Button` (`named`, types: `ButtonProps`, `ButtonVariant`)
- `Card`, `CardHeader`, `CardContent`, `CardFooter` (`named`)
- `Badge` (`named`)