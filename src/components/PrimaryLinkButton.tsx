import Link, {type LinkProps} from "next/link";
import React, {type ReactNode} from "react";
import {buttonColor} from "~/config/colors";
import clsx from "clsx";

export function PrimaryLinkButton(props: LinkProps & { children: ReactNode}) {
    const color = buttonColor['primary'];

    return <Link className={clsx(color, 'px-4 py-2 rounded self-start')} {...props}>{props.children}</Link>
}