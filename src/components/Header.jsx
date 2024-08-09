import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-black p-4 text-sm font-black md:p-8">
      <Logo />
      <Navigation />
    </header>
  );
}
