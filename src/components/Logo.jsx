import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <h1 className="w-fit text-2xl text-red-600 md:text-3xl lg:text-4xl">
        NN
      </h1>
    </Link>
  );
}
