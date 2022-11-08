import React from "react";

type Props = { friends: string[] };

const FriendsList = ({ friends }: Props) => {
  return <div>FriendsList{friends}</div>;
};

export default FriendsList;
