# API Consumer App

## Description

TypeScript + Vite web application that demonstrates consuming REST APIs. It fetches posts from JSONPlaceholder API and allows users to search and paginate through results using both Fetch and Axios as HTTP clients.

![Project Demo](/public/demo.webp "Project Demo")

## Project Structure

```
api-consumer-app/
├── index.html
├── package.json
├── tsconfig.json
├── public/
└── src/
    ├── main.ts              # App logic, event handlers, and API calls
    ├── style.css            # Styles and responsive layout
    └── types.ts             # TypeScript interfaces for API data
```

## Technologies

- TypeScript
- Vite 6
- Fetch API & Axios (HTTP clients)
- JSONPlaceholder API (public REST API)

## Requirements

- Node.js 18+ and npm

## Installation

```bash
git clone <repo-url>
cd api-consumer-app
npm install
```

## Run

- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview built app: `npm run preview`

## Features

- **Dual HTTP Clients**: Switch between Fetch API and Axios for making requests [src/main.ts](src/main.ts)
- **Search Functionality**: Filter posts by search term from JSONPlaceholder API [src/main.ts](src/main.ts)
- **Pagination**: Navigate through results with configurable items per page [src/main.ts](src/main.ts)
- **Error Handling**: Comprehensive error handling including network detection, API errors, and manual error forcing [src/main.ts](src/main.ts)
- **Loading States**: Visual feedback during API requests [src/main.ts](src/main.ts)
- **Response Status Display**: Shows HTTP status and response information [src/main.ts](src/main.ts)
- **Type-Safe Implementation**: Fully typed with TypeScript interfaces [src/types.ts](src/types.ts)

## Learnings

- Comparison of Fetch API and Axios for HTTP requests
- Error handling in API consumption (network errors, HTTP errors, custom errors)
- Pagination and search filtering strategies
- TypeScript typing for external API data
- DOM manipulation and event handling without frameworks
