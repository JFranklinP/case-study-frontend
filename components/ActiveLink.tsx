import Link from "next/link";
import React, { FC } from "react";

interface Props {
    text: string;
    href: string;
}
export const ActiveLink: FC <Props>= ({text,href}) => {
    return ( 
    <Link  href={href}>{text}</Link>
   );
};