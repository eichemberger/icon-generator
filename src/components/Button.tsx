import React from "react";
import clsx from "clsx";
import {buttonColor} from "~/config/colors";

export function Button(props: React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary'| 'secondary'
}) {
    const { variant = 'primary' } = props;

    const color = buttonColor[variant];

    return <button {...props} className={clsx("px-4 py-2 rounded", color)}>{props.children}</button>;
}