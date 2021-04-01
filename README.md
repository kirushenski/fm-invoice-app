# Frontend Mentor - Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://fm-invoice-app.netlify.app/](https://fm-invoice-app.netlify.app/)

## My process

### Built with

- Gatsby
- React
- Typescript
- Tailwind
- Storybook
- Netlify Functions
- Netlify Identity
- Hasura

### What I learned

This is was my first fullstack app + there is a lot of work with forms:

- Tested the new version of gatsby-starter-vadyan starter
- Setup the serverless app based on Netlify Functions
- Used Netlify Identity as auth provider
- Played with tables inside Hasura database
- Practiced with GraphQL queries/mutations
- Used Fetch API instead of axios
- Integrated postcss-import to split tailwind styles into separate files
- Integrated downshift's useMultipleSelection hook with useSelect to create filters dropdown
- Used formik's FieldArray for dynamic fields
- Got a headache while integrating custom datepicker form field
- Tried out hooks prerelease version of react-media
- Setup dark mode as the context option inside Storybook

### Continued development

For the future projects:

- More fullstack practice with serverless architecture in particular
- Try out another solutions for the data management to compare

### Useful resources

- [Introduction to Serverless Functions](https://frontendmasters.com/courses/serverless-functions/) - Great Frontend Masters course. Used project's code as the reference

## Author

- Website - [p1t1ch.com](https://www.p1t1ch.com)
- Frontend Mentor - [@p1t1ch](https://www.frontendmentor.io/profile/p1t1ch)
- Twitter - [@p1t1ch](https://www.twitter.com/p1t1ch)
