export default function Heading({ user }) {
  return (
    <h2 className="mt-20 text-2xl font-black text-gray-500">
      {user?.name ? user.name : "Guest"}
    </h2>
  );
}
