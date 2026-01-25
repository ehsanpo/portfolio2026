src/blocks/AwardsBlock.astro:11:20 - warning ts(80007): 'await' has no effect on the type of this expression.

11 const { awards } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~

src/blocks/CertificatesBlock.astro:23:28 - warning ts(80007): 'await' has no effect on the type of this expression.

23 const { certifications } = await getPortfolioData();
                              ~~~~~~~~~~~~~~~~~~~~~~~~

src/blocks/ExperienceBlock.astro:7:31 - warning ts(6133): 'basics' is declared but its value is never read.

7 const { companies, education, basics } = getPortfolioData();
                                ~~~~~~
src/blocks/ExperienceBlock.astro:3:1 - warning ts(6133): 'calculatePreciseDuration' is declared but its value is never read.

3 import { calculatePreciseDuration } from "@/utils/client-data";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/blocks/HeroBlock.astro:7:21 - warning ts(80007): 'await' has no effect on the type of this expression.

7 const { contact } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~

src/blocks/SelectedWorkBlock.astro:36:8 - error ts(2322): Type '{ height: number; src: string; width: number; format: "avif" | "png" | "webp" | "jpeg" | "jpg" | "svg" | "tiff" | "gif"; } | undefined' is not assignable to type '{ src: string; alt: string; width: number; height: number; } | undefined'.
  Property 'alt' is missing in type '{ height: number; src: string; width: number; format: "avif" | "png" | "webp" | "jpeg" | "jpg" | "svg" | "tiff" | "gif"; }' but required in type '{ src: string; alt: string; width: number; height: number; }'.

36        image={item.cover}
          ~~~~~

src/components/Beams.tsx:97:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

97     {CircleWithTooltip(bugFixesRef, Wrench, "Bug Fixes")}
                          ~~~~~~~~~~~
src/components/Beams.tsx:96:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

96     {CircleWithTooltip(interfacesRef, Share2, "Functional Interfaces")}
                          ~~~~~~~~~~~~~
src/components/Beams.tsx:95:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

95     {CircleWithTooltip(docsRef, FileEdit, "Documentation")}
                          ~~~~~~~
src/components/Beams.tsx:94:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

94     {CircleWithTooltip(codeImplRef, Terminal, "Code")}
                          ~~~~~~~~~~~
src/components/Beams.tsx:90:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

90     {CircleWithTooltip(testRef, CheckCircle, "Test")}
                          ~~~~~~~
src/components/Beams.tsx:89:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

89     {CircleWithTooltip(codeDebugRef, Code2, "Code & Debug")}
                          ~~~~~~~~~~~~
src/components/Beams.tsx:88:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

88     {CircleWithTooltip(planRef, ClipboardList, "Plan")}
                          ~~~~~~~
src/components/Beams.tsx:84:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

84     {CircleWithTooltip(complianceRef, ShieldCheck, "Compliance")}
                          ~~~~~~~~~~~~~
src/components/Beams.tsx:83:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

83     {CircleWithTooltip(bugReportsRef, Bug, "Bug Reports")}
                          ~~~~~~~~~~~~~
src/components/Beams.tsx:82:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

82     {CircleWithTooltip(apiRef, BookOpen, "API Docs")}
                          ~~~~~~
src/components/Beams.tsx:81:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

81     {CircleWithTooltip(figmaRef, FigmaIcon, "Designs")}
                          ~~~~~~~~
src/components/Beams.tsx:80:24 - error ts(2345): Argument of type 'RefObject<HTMLDivElement | null>' is not assignable to parameter of type 'RefObject<HTMLDivElement>'.
  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
    Type 'null' is not assignable to type 'HTMLDivElement'.

80     {CircleWithTooltip(jiraRef, FileText, "Jira Tasks")}
                          ~~~~~~~
src/components/Beams.tsx:81:34 - warning ts(6385): 'FigmaIcon' is deprecated.

81     {CircleWithTooltip(figmaRef, FigmaIcon, "Designs")}
                                    ~~~~~~~~~
src/components/Beams.tsx:5:2 - warning ts(6385): 'Figma' is deprecated.

5  Figma as FigmaIcon,
   ~~~~~~~~~~~~~~~~~~

src/components/GitHubContributions.tsx:235:28 - error ts(7006): Parameter 'value' implicitly has an 'any' type.

235         tooltipDataAttrs={(value) =>
                               ~~~~~
src/components/GitHubContributions.tsx:225:25 - error ts(7006): Parameter 'value' implicitly has an 'any' type.

225         classForValue={(value) => {
                            ~~~~~
src/components/GitHubContributions.tsx:2:29 - error ts(7016): Could not find a declaration file for module 'react-calendar-heatmap'. 'C:/Users/Ehsan/dev/portfolio2026/node_modules/react-calendar-heatmap/dist/react-calendar-heatmap.cjs.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-calendar-heatmap` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-calendar-heatmap';`

2 import CalendarHeatmap from "react-calendar-heatmap";
                              ~~~~~~~~~~~~~~~~~~~~~~~~

src/components/KonamiCode.tsx:20:9 - warning ts(6133): 'keys' is declared but its value is never read.

20  const [keys, setKeys] = useState<string[]>([]);
           ~~~~

src/components/PortfolioFilter.tsx:1:27 - warning ts(6133): 'useEffect' is declared but its value is never read.

1 import React, { useState, useEffect } from "react";
                            ~~~~~~~~~
src/components/PortfolioFilter.tsx:1:8 - warning ts(6133): 'React' is declared but its value is never read.

1 import React, { useState, useEffect } from "react";
         ~~~~~

src/components/RankTimeline.jsx:1:1 - warning ts(6133): 'React' is declared but its value is never read.

1 import React from "react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/Resume.tsx:1:8 - warning ts(6133): 'React' is declared but its value is never read.

1 import React, { useState, useEffect } from "react";
         ~~~~~

src/components/ScrollBottomEasterEgg.tsx:7:9 - warning ts(6133): 'extraScrollAttempts' is declared but its value is never read.

7  const [extraScrollAttempts, setExtraScrollAttempts] = useState(0);
          ~~~~~~~~~~~~~~~~~~~

src/components/SkillChart.tsx:12:1 - warning ts(6133): 'SkillsInfo' is declared but its value is never read.

12 import SkillsInfo from "./Skillsinfo";
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/Skillsinfo.tsx:3:21 - warning ts(6133): 'show' is declared but its value is never read.

3 const SkillsInfo = ({ show }: { show?: boolean }) => {
                      ~~~~~~~~
src/components/Skillsinfo.tsx:1:1 - warning ts(6133): 'React' is declared but its value is never read.

1 import React from "react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/SpotifyEmbed.tsx:1:1 - warning ts(6133): 'React' is declared but its value is never read.

1 import React from "react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/StackCard.tsx:66:14 - error ts(2345): Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

66              timelineMatch?.stillActive
                ~~~~~~~~~~~~~~~~~~~~~~~~~~
src/components/StackCard.tsx:22:8 - warning ts(6133): 'colors' is declared but its value is never read.

22  const colors = [
          ~~~~~~
src/components/StackCard.tsx:21:63 - warning ts(6133): 'parentIndex' is declared but its value is never read.

21 export default function StackCard({ slug, labels, icon, data, parentIndex }: StackCardProps) {
                                                                 ~~~~~~~~~~~
src/components/StackCard.tsx:1:1 - warning ts(6133): 'React' is declared but its value is never read.

1 import React from "react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/TimelineCard.tsx:2:46 - warning ts(6133): 'MapPin' is declared but its value is never read.

2 import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
                                               ~~~~~~

src/components/drawer.tsx:84:7 - warning ts(6385): 'scrolling' is deprecated.

84       scrolling="no"
         ~~~~~~~~~
src/components/drawer.tsx:59:11 - warning ts(6133): 'onClick' is declared but its value is never read.

59  function onClick(adjustment: number) {
             ~~~~~~~
src/components/drawer.tsx:14:7 - warning ts(6133): 'data' is declared but its value is never read.

14 const data = [
         ~~~~
src/components/drawer.tsx:10:2 - warning ts(6133): 'DrawerTitle' is declared but its value is never read.

10  DrawerTitle,
    ~~~~~~~~~~~
src/components/drawer.tsx:9:2 - warning ts(6133): 'DrawerHeader' is declared but its value is never read.

9  DrawerHeader,
   ~~~~~~~~~~~~
src/components/drawer.tsx:8:2 - warning ts(6133): 'DrawerFooter' is declared but its value is never read.

8  DrawerFooter,
   ~~~~~~~~~~~~
src/components/drawer.tsx:7:2 - warning ts(6133): 'DrawerDescription' is declared but its value is never read.

7  DrawerDescription,
   ~~~~~~~~~~~~~~~~~
src/components/drawer.tsx:5:2 - warning ts(6133): 'DrawerClose' is declared but its value is never read.

5  DrawerClose,
   ~~~~~~~~~~~
src/components/drawer.tsx:2:1 - warning ts(6192): All imports in import declaration are unused.

2 import { Minus, Plus } from "lucide-react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/contact/ContactInfo.astro:3:21 - warning ts(80007): 'await' has no effect on the type of this expression.

3 const { contact } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~

src/components/footer/Footer.tsx:73:64 - warning ts(6385): 'Github' is deprecated.

73    { name: "GitHub", href: "https://github.com/ehsanpo", icon: Github },
                                                                  ~~~~~~
src/components/footer/Footer.tsx:71:11 - warning ts(6385): 'Linkedin' is deprecated.

71     icon: Linkedin,
             ~~~~~~~~
src/components/footer/Footer.tsx:20:2 - warning ts(6133): 'X' is declared but its value is never read.

20  X,
    ~
src/components/footer/Footer.tsx:16:2 - warning ts(6133): 'Calendar' is declared but its value is never read.

16  Calendar,
    ~~~~~~~~
src/components/footer/Footer.tsx:15:2 - warning ts(6133): 'MapPin' is declared but its value is never read.

15  MapPin,
    ~~~~~~
src/components/footer/Footer.tsx:5:2 - warning ts(6385): 'Linkedin' is deprecated.

5  Linkedin,
   ~~~~~~~~
src/components/footer/Footer.tsx:4:2 - warning ts(6385): 'Github' is deprecated.

4  Github,
   ~~~~~~

src/components/game/NavLockGuard.tsx:10:5 - warning ts(6133): 'lockStateApplied' is declared but its value is never read.

10 let lockStateApplied = false;
       ~~~~~~~~~~~~~~~~

src/components/pixelworld/PixelWorld.tsx:1:8 - warning ts(6133): 'React' is declared but its value is never read.

1 import React, { useState, useEffect } from "react";
         ~~~~~

src/components/pixelworld/WeatherSystem.tsx:1:8 - warning ts(6133): 'React' is declared but its value is never read.

1 import React, { useState, useEffect } from "react";
         ~~~~~

src/components/portfolio/Gallery.astro:15:23 - error ts(7006): Parameter 'index' implicitly has an 'any' type.

15   images?.map((image, index) => (
                         ~~~~~
src/components/portfolio/Gallery.astro:15:16 - error ts(7006): Parameter 'image' implicitly has an 'any' type.

15   images?.map((image, index) => (
                  ~~~~~
src/components/portfolio/Gallery.astro:56:19 - error ts(2345): Argument of type 'string | null' is not assignable to parameter of type 'string'.
  Type 'null' is not assignable to type 'string'.

56       h: parseInt(item.getAttribute("data-pswp-height")),
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/components/portfolio/Gallery.astro:55:19 - error ts(2345): Argument of type 'string | null' is not assignable to parameter of type 'string'.
  Type 'null' is not assignable to type 'string'.

55       w: parseInt(item.getAttribute("data-pswp-width")),
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/components/portfolio/Gallery.astro:53:6 - error ts(2322): Type '{ src: string | null; w: number; h: number; }[]' is not assignable to type 'DataSource | undefined'.
  Type '{ src: string | null; w: number; h: number; }[]' is not assignable to type 'SlideData[]'.
    Type '{ src: string | null; w: number; h: number; }' is not assignable to type 'SlideData'.
      Type '{ src: string | null; w: number; h: number; }' is not assignable to type '_SlideData'.
        Types of property 'src' are incompatible.
          Type 'string | null' is not assignable to type 'string | undefined'.
            Type 'null' is not assignable to type 'string | undefined'.

53      dataSource: Array.from(updatedItems).map((item) => ({
        ~~~~~~~~~~
src/components/portfolio/Gallery.astro:43:4 - error ts(18047): 'item.parentNode' is possibly 'null'.

43    item.parentNode.replaceChild(newItem, item);
      ~~~~~~~~~~~~~~~

src/components/portfolio/PortfolioHeader.tsx:54:3 - warning ts(6133): 'permalink' is declared but its value is never read.

54   permalink,
     ~~~~~~~~~

src/components/portfolio/ProjectCard.tsx:5:52 - warning ts(6133): 'Heart' is declared but its value is never read.

5 import { ExternalLink, Calendar, Users, Star, Eye, Heart, MoreHorizontal } from "lucide-react";
                                                     ~~~~~
src/components/portfolio/ProjectCard.tsx:3:8 - warning ts(6133): 'React' is declared but its value is never read.

3 import React, { useState } from "react";
         ~~~~~

src/components/prompts/PromptsViewer.tsx:15:21 - warning ts(6133): 'setActiveSlug' is declared but its value is never read.

15  const [activeSlug, setActiveSlug] = useState(prompts[0]?.slug);
                       ~~~~~~~~~~~~~

src/components/resume/Aside.tsx:54:8 - warning ts(6385): 'Linkedin' is deprecated.

54       <Linkedin size={16} style={{ color: mainColor }} />
          ~~~~~~~~
src/components/resume/Aside.tsx:4:31 - warning ts(6385): 'Linkedin' is deprecated.

4 import { MapPin, Mail, Globe, Linkedin } from "lucide-react";
                                ~~~~~~~~

src/components/resume/Main.tsx:52:54 - error ts(2339): Property 'date' does not exist on type '{ name: string; year: string; }'.

52        <span className="text-sm text-gray-600">{cert.date}</span>
                                                        ~~~~
src/components/resume/Main.tsx:5:1 - warning ts(6133): 'Tag' is declared but its value is never read.

5 import { Tag } from "./Tag";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/skills/SkillCard.tsx:1:22 - error ts(2307): Cannot find module '../ui/Card' or its corresponding type declarations.

1 import { Card } from "../ui/Card";
                       ~~~~~~~~~~~~

src/components/skills/SkillsExplanation.astro:21:26 - error ts(2339): Property 'description' does not exist on type 'String'.

21     skills.map(({ range, description }) => (
                            ~~~~~~~~~~~
src/components/skills/SkillsExplanation.astro:21:19 - error ts(2339): Property 'range' does not exist on type 'String'.

21     skills.map(({ range, description }) => (
                     ~~~~~
src/components/skills/SkillsExplanation.astro:3:20 - warning ts(80007): 'await' has no effect on the type of this expression.

3 const { skills } = await getPortfolioData();
                     ~~~~~~~~~~~~~~~~~~~~~~~~

src/components/skills/SkillsGrid.astro:11:32 - error ts(7006): Parameter 'index' implicitly has an 'any' type.

11      {stack.labels.map((label, index) => (
                                  ~~~~~
src/components/skills/SkillsGrid.astro:11:25 - error ts(7006): Parameter 'label' implicitly has an 'any' type.

11      {stack.labels.map((label, index) => (
                           ~~~~~
src/components/skills/SkillsGrid.astro:7:15 - error ts(7006): Parameter 'stack' implicitly has an 'any' type.

7   stacks.map((stack) => (
                ~~~~~

src/components/testimonials/TestimonialCard.tsx:21:2 - warning ts(6133): 'date' is declared but its value is never read.

21  date = "Jan 2026",
    ~~~~

src/components/timeline/HeroSection.tsx:9:10 - error ts(2322): Type 'ImageMetadata' is not assignable to type 'string'.

9     <img src={one} alt="Hero background" className="h-full w-full object-cover opacity-50" />
           ~~~
src/components/timeline/HeroSection.tsx:1:1 - warning ts(6133): 'React' is declared but its value is never read.

1 import React from "react";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/timeline/Project.tsx:22:2 - warning ts(6133): 'github' is declared but its value is never read.

22  github,
    ~~~~~~

src/components/timeline/TimelineAbout.tsx:13:33 - error ts(7006): Parameter 'index' implicitly has an 'any' type.

13    {sortetExperience.map((item, index) => (
                                   ~~~~~
src/components/timeline/TimelineAbout.tsx:13:27 - error ts(7006): Parameter 'item' implicitly has an 'any' type.

13    {sortetExperience.map((item, index) => (
                             ~~~~
src/components/timeline/TimelineAbout.tsx:8:55 - error ts(7006): Parameter 'b' implicitly has an 'any' type.

8 const sortetExperience = experienceHighlight.sort((a, b) => parseInt(a.year) - parseInt(b.year));
                                                        ~
src/components/timeline/TimelineAbout.tsx:8:52 - error ts(7006): Parameter 'a' implicitly has an 'any' type.

8 const sortetExperience = experienceHighlight.sort((a, b) => parseInt(a.year) - parseInt(b.year));
                                                     ~
src/components/timeline/TimelineAbout.tsx:7:48 - error ts(7006): Parameter 'item' implicitly has an 'any' type.

7 const experienceHighlight = experience.filter((item) => item.highlighted === true);
                                                 ~~~~
src/components/timeline/TimelineAbout.tsx:6:9 - error ts(2339): Property 'experience' does not exist on type '{ meta: { title: string; description: string; author: string; lastUpdated: string; }; basics: { name: string; title: string; currentPosition: string; image: string; about: string; location: string; email: string; website: string; linkedin: string; }; ... 15 more ...; certifications: { ...; }[]; }'.

6 const { experience } = await getPortfolioData();
          ~~~~~~~~~~
src/components/timeline/TimelineAbout.tsx:6:24 - warning ts(80007): 'await' has no effect on the type of this expression.

6 const { experience } = await getPortfolioData();
                         ~~~~~~~~~~~~~~~~~~~~~~~~

src/components/timeline/TimelineSection.tsx:6:25 - error ts(2307): Cannot find module '../team/TeamSection' or its corresponding type declarations.

6 import TeamSection from "../team/TeamSection";
                          ~~~~~~~~~~~~~~~~~~~~~

src/components/ui/animated-beam.tsx:88:13 - warning ts(6133): 'entry' is declared but its value is never read.

88    for (let entry of entries) {
               ~~~~~

src/components/ui/box-reveal.tsx:7:12 - error ts(2503): Cannot find namespace 'JSX'.

7  children: JSX.Element | string;
             ~~~

src/components/ui/drawer.tsx:76:8 - warning ts(6385): 'ElementRef' is deprecated.

76  React.ElementRef<typeof DrawerPrimitive.Description>,
          ~~~~~~~~~~
src/components/ui/drawer.tsx:64:8 - warning ts(6385): 'ElementRef' is deprecated.

64  React.ElementRef<typeof DrawerPrimitive.Title>,
          ~~~~~~~~~~
src/components/ui/drawer.tsx:33:8 - warning ts(6385): 'ElementRef' is deprecated.

33  React.ElementRef<typeof DrawerPrimitive.Content>,
          ~~~~~~~~~~
src/components/ui/drawer.tsx:21:8 - warning ts(6385): 'ElementRef' is deprecated.

21  React.ElementRef<typeof DrawerPrimitive.Overlay>,
          ~~~~~~~~~~

src/components/ui/heading/Heading.tsx:39:5 - error ts(2786): 'Tag' cannot be used as a JSX component.
  Its type 'string | number | symbol' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.

39    <Tag
       ~~~
src/components/ui/heading/Heading.tsx:39:5 - error ts(2604): JSX element type 'Tag' does not have any construct or call signatures.

39    <Tag
       ~~~
src/components/ui/heading/Heading.tsx:30:29 - error ts(2503): Cannot find namespace 'JSX'.

30  const Tag = level as keyof JSX.IntrinsicElements;
                               ~~~

src/components/ui/heading/utils.ts:3:45 - warning ts(6133): 'shadow' is declared but its value is never read.

3 export function getHeadingClass({ gradient, shadow, floating }: HeadingStyles): string {
                                              ~~~~~~

src/game/engine.ts:3:10 - warning ts(6133): 'getAutoAmount' is declared but its value is never read.

3 import { getAutoAmount, getAutoInterval } from "./autoclicker";
           ~~~~~~~~~~~~~

src/game/state.ts:48:15 - warning ts(6133): 'source' is declared but its value is never read.

48    addClick: (source = "manual") => {
                 ~~~~~~
src/game/state.ts:21:9 - warning ts(6133): 'get' is declared but its value is never read.

21   (set, get) => ({
           ~~~

src/layouts/Layout.astro:78:11 - warning astro(4000): This script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

78   <script async defer src="https://scripts.withcabin.com/hello.js"></script>
             ~~~~~

src/pages/credits.astro:8:18 - warning ts(80007): 'await' has no effect on the type of this expression.

8 const { meta } = await getPortfolioData();
                   ~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/blog/index.astro:11:7 - warning ts(6133): 'allCategories' is declared but its value is never read.

11 const allCategories = [...new Set(blogPosts.flatMap((post) => post.category || []))];
         ~~~~~~~~~~~~~

src/pages/portfolio/index.astro:27:21 - error ts(2322): Type '(string | undefined)[]' is not assignable to type 'string[]'.
  Type 'string | undefined' is not assignable to type 'string'.
    Type 'undefined' is not assignable to type 'string'.

27    <PortfolioFilter categories={allCategories} category="all" client:load />
                       ~~~~~~~~~~

src/pages/roles/devops-cloud-engineer.astro:13:20 - warning ts(80007): 'await' has no effect on the type of this expression.

13 const { stacks } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/roles/devops-cloud-engineer.astro:11:1 - warning ts(6133): 'PageHero' is declared but its value is never read.

11 import PageHero from "@/components/hero/PageHero.astro";
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/roles/engineering-manager.astro:12:28 - warning ts(80007): 'await' has no effect on the type of this expression.

12 const { stacks, charts } = await getPortfolioData();
                              ~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/roles/engineering-manager.astro:12:17 - warning ts(6133): 'charts' is declared but its value is never read.

12 const { stacks, charts } = await getPortfolioData();
                   ~~~~~~

src/pages/roles/music-production-technologist.astro:10:20 - warning ts(80007): 'await' has no effect on the type of this expression.

10 const { stacks } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/roles/product-engineer.astro:12:20 - warning ts(80007): 'await' has no effect on the type of this expression.

12 const { stacks } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/roles/senior-software-engineer.astro:12:20 - warning ts(80007): 'await' has no effect on the type of this expression.

12 const { stacks } = await getPortfolioData();
                      ~~~~~~~~~~~~~~~~~~~~~~~~

src/utils/client-data.ts:103:9 - warning ts(6133): 'startYear' is declared but its value is never read.

103  const [startYear, endYear] = duration.split("-").map((year) => parseInt(year));
            ~~~~~~~~~

Result (133 files): 
- 43 errors
- 0 warnings
- 73 hints