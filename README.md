# Front-end

## Proposal

### What problem does your app solve

Helps user visual differences within multiple datasets on a matrix.

### Be as specific as possible; how does your app solve the problem

Provides an easy to use user interface for managing spider charts and datasets making it easy to read and understand the data.

### What is the mission statement

Data is dynamic. Render it better next time.

## Features

### What features are required for your minimum viable product

1. Login to account
2. Store multiple charts on account
3. Allow multiple datasets per chart
4. Allow editing of labels on chart

### What features do you wish to put in a future release

1. Sharing charts
2. Sharing datasets
3. Gallery of charts
4. Templates

### What do the top 3 similar apps do for their users

- Excel - Allows creation of spider graphs through datasets as well as many other charts. The problem here is how convoluted it is to create a chart when it could be much simpler.
- Google Sheets - Similar to Excel in it’s functionality and problems.
- Visual Paradigm - Another online excel tool that has templates for charts however has the same limitations as any spreadsheet based tool being that it is clunky and hard for a novice to pickup.

## Design - Planning

### What design system will you use

Material Design

### What will your user flow be

Sign in / Create an Account ->
-- Home Page with first chart ->
-- -- Modify Dataset or Chart
-- -- Create a new chart
-- -- User taps nav to see categories and user switcher ->
-- -- -- Shown a list of charts they have on their account
-- -- -- User taps user account to sign out or edit

### What is the URL to your wireframes

[Figma Wireframes](https://www.figma.com/file/o6GSpN5vFpmogvtJw0Y3hs/Untitled?node-id=0%3A1)

## Frameworks - Libraries

### What 3rd party frameworks/libraries are you considering using

- Client: React, Material UI, Chart.js, TypeScript
- Server: Nest.js, TypeORM, MongoDB, BCrypt, CORS, GraphQL
- Marketing: LESS, Modern Normalize

### Do APIs require you to contact its maintainer to gain access

All of our APIs are internal.

### Are you required to pay to use the API

No.

### Have you considered using Apple Frameworks (MapKit, Healthkit, ARKit?)

N\A

## Target Audience

### Who is your target audience? Be specific

Anyone that needs to compare different sets of data and
comparing metrics of those data sets. IE: Baseball players,
Racecars, RPG Characters, Time Management.

### What feedback have you gotten from potential users

None

### Have you validated the problem and your solution with your target audience? How?

None

## Research

### Research thoroughly before writing a single line of code. Solidify the features of your app conceptually before implementation. Spend the weekend researching so you can hit the ground running on Monday

Prototype Key Feature(s)

- This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.

## Contribute

### Download Source

```bash
git clone https://github.com/Spider-Graph/Frontend.git
```

### Branch

```bash
git checkout -b <your name>
```

### Install Dependencies

```bash
yarn
```

### Start Development Server

```bash
yarn start
```

### Upload changes

```bash
git push origin <your-name>
```

### Create Pull Request

[Pull Request](https://github.com/Spider-Graph/Frontend/compare)
