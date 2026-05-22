WeFitNest Marketing Website Project Brief
Objective
Transition wefitnest.com from hosting the app bundle to hosting a standalone marketing site.
The mobile app remains mobile-first and locally testable in browser during development.

Why This Transition
Safer App Store review path
Cleaner separation of responsibilities
Better SEO and content flexibility for public website
Lower risk of accidental app redeploy to production domain
Required Outcomes
wefitnest.com serves only the marketing website
App is no longer published to wefitnest.com
App remains testable locally at localhost:8100
Website includes elegant homepage and complete tutorial
Optional dedicated screenshots page if it improves clarity
Website Information Architecture
Home
Hero
Value proposition
Key feature highlights
App Store CTA
FAQ and footer CTA
Tutorial
Onboarding
Workout planning and execution
Nutrition tracking and meal flows
Progress and insights
Settings/profile essentials
Screenshots (optional but recommended)
Organized by feature category
Lightbox or focused viewer
Visual and Brand Notes
Reuse app brand language and token logic.
Prioritize premium, modern, intentional UI.
Motion should support storytelling, not distract.
Keep mobile-first layout and interaction polish.
Screenshot Asset Plan
Use these names:

home-dashboard-01.png
onboarding-01.png
workout-builder-01.png
workout-session-01.png
rest-timer-01.png
nutrition-log-01.png
meal-planning-01.png
progress-charts-01.png
settings-profile-01.png
hero-preview-01.png
og-social-1200x630.png
Capture guidance:

Portrait, consistent framing
Clean UI state, no notifications
Keep same device and zoom where possible
Provide original and optimized versions
Transition Checklist
Disable old app Pages deployment in app repo
Remove app-domain coupling from old repo
Enable Pages in marketing repo
Point custom domain to marketing repo
Validate HTTPS and DNS propagation
Smoke test all marketing pages and links
Verify app still runs locally on port 8100