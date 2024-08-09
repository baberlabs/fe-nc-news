export default function UserAvatar({ name, avatarURL }) {
  return (
    <div className="my-4 flex h-40 w-40 items-center justify-center self-center">
      <img src={avatarURL} alt={`Avatar of ${name}`} className="h-36" />
    </div>
  );
}
