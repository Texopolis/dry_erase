import React, {forwardRef} from "react";
import { Gloria_Hallelujah } from "@next/font/google";

type Props = {
  senderId: string;
  message: string;
  timestamp: string;
    displayName: string;
  textColor:string
};

const gloriaHallelujah = Gloria_Hallelujah({ weight: "400" });

const FriendChatBubble = forwardRef(({
    senderId,
    message,
    timestamp,
    displayName,
    textColor
}: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        second: "numeric",
    };

    return (
        <div ref={ref} className="flex gap-2 my-1 w-10/12 self-end justify-end text-right">
            <div>
                <div
                    className={`py-2 px-4 rounded-2xl ${gloriaHallelujah.className} break-all w-fit shadow-md mb-1 text-xl ${textColor}`}
                >
                    {message}
                </div>
                <p className="text-xs text-primary_accent text-right mr-2">
                    {Date.now() - Number(timestamp) <= 60000 ? "Now" :
                        new Date(timestamp).toLocaleString(undefined, options)}
                </p>
            </div>
            <div className="self-center text-xs text-grey">{displayName}</div>
        </div>
    );
});
FriendChatBubble.displayName = "UserChatBubble";


export default FriendChatBubble;
