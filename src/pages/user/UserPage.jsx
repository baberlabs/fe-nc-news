import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, getUsers } from "../../utilities/api";
import { DriveFileRenameOutline, Save } from "@mui/icons-material";
import { useArticles } from "../articles/useArticles";
import useUser from "./useUser";
import useUsers from "./useUsers";
import CurrentUserLoading from "./CurrentUserLoading";
import CurrentUser from "./CurrentUser";
import OtherUsersLoading from "./OtherUsersLoading";
import OtherUsers from "./OtherUsers";
import LoggedInForm from "./LoggedInForm";

export default function User() {
  const { username } = useParams();
  const { user, isLoading } = useUser(username);
  const { users, areLoading } = useUsers();

  const otherUsers = users.filter(
    (otherUser) => otherUser.username !== user.username,
  );

  // TODO: Later
  // Implement a form for loggedInUser, such that
  // a loggedInUser can update their name, username
  // and their avatar_url

  return (
    <section className="mb-20 flex flex-col items-center gap-4 p-4 md:p-8">
      {/* <LoggedInForm user={user} /> */}
      {isLoading ? <CurrentUserLoading /> : <CurrentUser user={user} />}
      {areLoading ? (
        <OtherUsersLoading />
      ) : (
        <OtherUsers otherUsers={otherUsers} />
      )}
    </section>
  );
}
