import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LoggedInUserProvider } from "./contexts/LoggedInUserProvider";

import Home from "./pages/home";
import Articles from "./pages/articles";
import Article from "./pages/article";
import Login from "./pages/login";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <LoggedInUserProvider>
      <Router>
        <Header />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </LoggedInUserProvider>
  );
}
