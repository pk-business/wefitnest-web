applyTo: "src/**/*.{css,scss,tsx,ts,jsx,js,astro,mdx,html}"
description: "Use WeFitNest theme tokens and consistent visual language across all website UI."
Theme Token Instruction
Goal
Ensure all UI styling aligns with WeFitNest brand and stays maintainable via tokens.

Rules
Define and use a single token source for:
brand colors
semantic text/background
spacing scale
radius scale
shadow scale
motion durations/easing
Prefer semantic tokens in component styles.
Avoid hardcoded random colors and inconsistent spacing values.
Reuse shared component patterns for:
CTA buttons
cards
pills/chips
section containers
Motion
Keep motion meaningful and lightweight.
Allowed common patterns:
fade/slide reveal
staggered section entrance
subtle press/hover feedback
Keep timings consistent project-wide.
Accessibility
Maintain sufficient contrast.
Do not rely only on color to convey state.
Preserve readable typography and spacing on small screens.
Review Checklist
Before finalizing styling changes:

Token used instead of one-off value
Mobile layout still clean
Contrast remains acceptable
Component variants are consistent