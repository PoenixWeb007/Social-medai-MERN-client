import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { _id, firstName } = useSelector((state) => state.global.user);
  return <div>Welcome {firstName}</div>;
}

export default ProfilePage;
