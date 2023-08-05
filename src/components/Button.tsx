import React from "react";
import clsx from "clsx";
import {buttonColor} from "~/config/constants";
import {Spinner} from "~/components/Spinner";

export function Button(props: React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary'| 'secondary',
    isLoading?: boolean
}) {
    const { variant = 'primary' } = props;

    const color = buttonColor[variant];

    return (
        <button
            {...props}
            className={clsx("flex gap-2 items-center justify-center text-white px-4 py-2 rounded disabled:bg-gray-600", color)}>
            {props.isLoading && <Spinner />}
            {props.children}
        </button>

    );
}