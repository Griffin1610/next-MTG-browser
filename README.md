Welcome to the MTG Browser, a next.js web development project powered by Next.JS, React, TypeScript and Tailwind CSS.

## Getting Started

First, install Node on your system if you do not have it already

```bash
https://nodejs.org/en
```
confirm installation with:
```bash
node -v
```

Next, clone the repository
```bash
git clone https://github.com/Griffin1610/next-MTG-browser.git
```

navigate to the project directory, and install the dependecies using node
```bash
npm install
```
This will install all dependecies needed for the project that you do not have. (react, tailwind, etc)

Finally, Start the server and naviate to the localhost
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learning about React and Next

To catch up to speed on how the frameworks and libraries work, check out the following documentation
and videos.

- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity) - learn about JavaScript
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Documentation](https://react.dev/learn) - learn about the React library
- [Youtube: Next.js](https://www.youtube.com/watch?v=vwSlYG7hFk0) - basics of Next.js
- [Youtube: React](https://www.youtube.com/watch?v=SqcY0GlETPk&t=163s) - basics of React


## Project Structure

We have set in place a strict ruleset in GitHub in order to keep the project clean and stable


**BRANCHES**

- **main** → stable, production-ready code. Will be updated when we like the current dev build

- **dev** → integration branch for ongoing work. All feature branches will be merged into dev.

There are GitHub rules in place to block pushes directly to both development and main.
All pushes must be made to a feature branch, with the corresponding branch tags for clarity:

- **feature/<-branch-name** → use a feature branch naming scheme when developing or reworking a new feature
- **bug/branch-name** → use a bug branch naming scheme when fixing an known bug
- **hotfix/branch-name** → use a hotfix branch naming scheme when there is an issue with the build that needs immediate attention

All pull requests must be approved by two people before they will be able to be marked as complete and merged into the development in GitHub

Please communicate with groupmates often to avoid merge conflicts and work on the same issues, communicate with the entire group when a pull request is ready for review.
