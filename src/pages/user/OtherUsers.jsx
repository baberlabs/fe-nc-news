import { Link } from "react-router-dom";

import OtherUserAvatar from "./OtherUserAvatar";

export default function OtherUsers({ otherUsers }) {
  return (
    <article className="flex w-[360px] flex-col gap-4">
      <h3 className="text-xl font-bold">Other Users</h3>
      <ul className="flex flex-col gap-4">
        {otherUsers.map((user) => (
          <li className="flex w-full rounded bg-gray-200" key={user.username}>
            <Link
              to={`/users/${user.username}`}
              className="flex flex-row items-center gap-8 px-8 py-4"
            >
              <OtherUserAvatar name={user.name} avatarURL={user.avatar_url} />
              <div>
                <h4 className="font-bold">{user.name}</h4>
                <p>@{user.username}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
