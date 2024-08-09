import { Link } from "react-router-dom";

import { AccessTimeFilled, Comment, ThumbUp } from "@mui/icons-material";

export default function Home() {
  return (
    <section className="flex flex-col px-4 py-8 text-center">
      <h2 className="text-[8rem] font-black tracking-tighter text-red-600">
        NN
      </h2>
      <p className="text-xl">News from farthest reaches of the world</p>
      <div className="mt-8 flex flex-row flex-wrap justify-center gap-4">
        <ArticleLink
          text="Most Votes"
          href="/articles?sort_by=votes"
          icon={<ThumbUp style={{ fontSize: "5rem" }} />}
        />
        <ArticleLink
          text="Most Comments"
          href="/articles?sort_by=comment_count"
          icon={<Comment style={{ fontSize: "5rem" }} />}
        />
        <ArticleLink
          text="Most Recent"
          href="/articles?sort_by=created_at"
          icon={<AccessTimeFilled style={{ fontSize: "5rem" }} />}
        />
      </div>
    </section>
  );
}

function ArticleLink({ icon, text, href }) {
  return (
    <Link
      to={href}
      className="flex w-40 flex-col items-center justify-center gap-2 rounded bg-gray-300 p-4 hover:bg-zinc-800 hover:font-bold hover:text-red-600"
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
}
