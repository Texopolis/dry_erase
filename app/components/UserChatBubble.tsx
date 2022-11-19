import React, { forwardRef } from "react";
import { Delius } from "@next/font/google";

type Props = {
  senderId: string;
  message: string;
  timestamp: string;
  displayName: string;
};

const deluis = Delius({ weight: "400" });

const UserChatBubble = forwardRef(
  (
    { message, timestamp, displayName }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      second: "numeric",
    };

    return (
      <div ref={ref} className="flex gap-2 my-1 self-start w-10/12">
        <div className="self-center text-xs text-grey">{displayName}</div>
        <div>
          <p
            className={`py-2 px-4 rounded-2xl ${deluis.className} break-all w-fit shadow-md mb-1 text-xl text-dark`}
          >
            {message}
          </p>
          <p className="text-xs text-primary_accent ml-2">
            {Date.now() - Number(timestamp) <= 60000
              ? "Now"
              : new Date(timestamp).toLocaleString(undefined, options)}
          </p>
        </div>
      </div>
    );
  }
);
UserChatBubble.displayName = "UserChatBubble";
export default UserChatBubble;
