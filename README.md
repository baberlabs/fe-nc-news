# NC News Frontend (Client Application)

A React-based single-page application that consumes the NC News REST API.

The application allows users to browse, filter, sort, and interact with news articles and comments. It focuses on correct API consumption, client-side routing, and predictable UI state, without server-side rendering or backend logic.

---

## Live Deployment

- **Frontend (Netlify):**  
  https://babers-reach.netlify.app

- **Backend API (Render):**  
  https://be-nc-news-8igb.onrender.com/api

The frontend and backend are deployed independently and communicate exclusively over HTTP.

---

## What This Application Provides

- Displays a paginated list of articles
- Filters articles by topic
- Sorts articles by date, title, votes, or comment count
- Allows users to view individual articles
- Fetches and displays article comments
- Allows logged-in users to:
  - post comments
  - vote on articles
  - delete their own comments

All data is fetched from a live REST API. No data is mocked on the client.

---

## Client-Side Behaviour

- Routing is handled entirely on the client using React Router
- UI state is driven by API responses and local component state
- Logged-in user state is persisted via `localStorage`
- Optimistic updates are used for voting interactions
- Error states and loading states are handled explicitly in the UI

There is no authentication system. “Login” is simulated by selecting an existing username exposed by the API.

---

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS v3
- **Build Tool:** Vite
- **Deployment:** Netlify

This is a pure client-side SPA. There is no server-side rendering and no backend code in this repository.

---

## Project Structure (High-Level)

- `src/pages/`  
  Route-level components (Home, Articles, Article, User, Login)

- `src/components/`  
  Shared UI components (Header, Navigation, Logo)

- `src/contexts/`  
  Global state (logged-in user context)

- `src/utilities/`  
  API clients, formatting helpers, and small pure functions

- `src/styles/`  
  Tailwind CSS entry point

The structure prioritises separation of concerns and readability over abstraction.

---

## Local Development

### Requirements

- Node.js (LTS recommended)
- npm

---

### Setup

```bash
git clone https://github.com/baberlabs/fe-nc-news.git
cd fe-nc-news
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Design Notes

- API calls are isolated in utility modules rather than embedded in components
- Custom hooks (`useArticles`, `useComments`, `useUser`, etc.) encapsulate data-fetching logic
- UI components are kept deliberately simple and explicit
- Tailwind is used directly without component abstraction layers

The code favours clarity and traceability over cleverness.

---

## Limitations

- No authentication or authorisation
- No form validation beyond basic client-side checks
- No caching layer beyond in-memory React state
- No accessibility audit beyond sensible defaults

These constraints are intentional and reflect the scope of a client-only application consuming a pre-defined public API.

---

## Acknowledgements

This frontend application was created as part of a **Digital Skills Bootcamp in Software Development** delivered by **Northcoders**, a UK-based training provider.
