import { useState } from "react";

import InputField from "./InputField";
import UserAvatar from "./UserAvatar";
import { Save } from "@mui/icons-material";

export default function LoggedInForm({ user }) {
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [avatarURL, setAvatarURL] = useState(user?.avatar_url);
  return (
    <form className="flex flex-col gap-4">
      <InputField text="Name" id="name" value={name} />
      <InputField text="Username" id="username" value={username} />
      <UserAvatar name={name} avatarURL={avatarURL} />
      <InputField text="Avatar URL" id="avatar-url" value={avatarURL} />
      <button className="mt-4 flex w-fit flex-row gap-4 self-center rounded bg-gray-700 px-4 py-2 font-bold text-white">
        <Save />
        <span>Save Details</span>
      </button>
    </form>
  );
}
