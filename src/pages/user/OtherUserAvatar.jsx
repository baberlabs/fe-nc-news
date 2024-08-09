export default function OtherUserAvatar({ name, avatarURL }) {
  return (
    <div className="my-4 flex h-20 w-20 items-center justify-center self-center rounded-full bg-white">
      <img src={avatarURL} alt={`Avatar of ${name}`} className="h-10" />
    </div>
  );
}
