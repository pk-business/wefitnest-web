applyTo: "**"
description: "Always-on project rules for the WeFitNest marketing website."
WeFitNest Marketing Site Rules
Mission
Build and maintain a standalone marketing website for WeFitNest.
This repository is only for the public website and tutorial content.
Do not build or deploy the mobile app from this repository.

Product Boundaries
Include:
Homepage with premium visual quality and modern animation
Full tutorial for major app features
Optional screenshots gallery page
App Store call-to-action
Exclude:
Mobile app runtime code
App deployment pipeline
Any workflow that publishes the app bundle
Visual Direction
Match WeFitNest brand tokens and semantics from app theme docs.
Preserve the app look:
Blue + teal gradient accents
Capsule controls
Glass card surfaces where appropriate
Clean, athletic, modern tone
Avoid generic template styling.
Ensure strong mobile presentation first, then desktop refinement.
Styling and Motion Requirements
Use centralized design tokens in CSS variables.
Avoid hardcoded one-off colors when a token exists.
Use purposeful animation only:
hero reveal
section stagger
subtle CTA emphasis
Keep interaction smooth on mobile devices.
Content Requirements
Tutorial must cover major app flows end-to-end.
Keep copy clear, practical, and feature-accurate.
Every major feature section should include:
What it does
Why it matters
How to use it
Visual support (screenshot or illustration)
Quality Gates
Responsive on mobile and desktop.
Accessibility basics:
semantic headings
alt text for images
keyboard reachable controls
Performance-conscious image handling and lazy loading where useful.
SEO basics:
unique page titles
meta description
social preview metadata
Deployment Rules
This repo is the only source for publishing wefitnest.com.
Keep deploy workflow scoped to static marketing output only.
Do not introduce app deployment scripts here.
Working Style
Prefer reusable components over one-off page markup.
Keep sections modular for future content updates.
Keep instructions and prompts in .github folders updated as requirements evolve.