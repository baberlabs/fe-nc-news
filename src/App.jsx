import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Articles from "./pages/articles";
import Article from "./pages/article";
import Login from "./pages/login";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
