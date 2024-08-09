import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LoggedInUserProvider } from "./contexts/LoggedInUserContext";

import Header from "./components/Header";

import Home from "./pages/home";
import Articles from "./pages/articles";
import Article from "./pages/article";
import Login from "./pages/login";
import User from "./pages/user";

import Wildcard from "./pages/wildcard";

export default function App() {
  return (
    <LoggedInUserProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:username" element={<User />} />
            <Route path="/*" element={<Wildcard />} />
          </Routes>
        </main>
      </Router>
    </LoggedInUserProvider>
  );
}
