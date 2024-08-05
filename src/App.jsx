import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Login from "./pages/Login";
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
