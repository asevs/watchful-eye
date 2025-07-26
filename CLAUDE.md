# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Watchful Eye Audits" - a Polish company providing mystery shopping and customer service quality auditing services. The site is built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks.

## Architecture

### File Structure
- **HTML Pages**: Multiple Polish-language pages (`index.html`, `oferta.html`, `kontakt.html`, etc.) representing different sections of the business website
- **Styling**: Single `styles.css` file with CSS custom properties for theming
- **JavaScript**: Single `js/app.js` file handling mobile navigation and scroll functionality
- **Assets**: `images/` directory containing WebP images and SVG icons
- **SEO**: `sitemap.xml` and `robots.txt` for search engine optimization

### Technical Details
- **Language**: Polish (pl-PL)
- **Responsive Design**: Mobile-first approach with breakpoint at 767px
- **Color Scheme**: Red primary (`#a71103`) and orange secondary (`#ff6411`) branding
- **Typography**: Montserrat and Rubik font families
- **Image Format**: Optimized WebP images for performance

### Core Functionality
- Mobile hamburger menu navigation in `js/app.js:4-12`
- Submenu toggle for mobile devices in `js/app.js:14-26`
- Scroll-to-top button functionality in `js/app.js:28+`

## Development Commands

Since this is a static website with no build process:
- **Development**: Open HTML files directly in browser or use a local server
- **Deployment**: Upload files directly to web server
- **Testing**: Manual testing in different browsers and screen sizes

## Content Guidelines

- All content is in Polish language
- Focus on mystery shopping, customer service audits, and quality assessment services
- Maintain professional tone appropriate for B2B services
- SEO-optimized with proper meta tags and structured markup