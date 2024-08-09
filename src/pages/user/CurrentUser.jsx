import Heading from "./Heading";
import UserAvatar from "./UserAvatar";

export default function CurrentUser({ user }) {
  return (
    <>
      <Heading user={user} />
      <p>@{user.username}</p>
      <UserAvatar name={user.name} avatarURL={user.avatar_url} />
    </>
  );
}
