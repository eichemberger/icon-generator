import {PrimaryLink} from "~/components/PrimaryLink";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "~/components/Button";
import React from "react";

export function Header() {

    const session = useSession();

    const isLoggedIn = !!session.data;

    return (
        <header className="px-4 container mx-auto dark:bg-gray-800 flex justify-between h-16 items-center">
            <PrimaryLink href="/">Icon Generator</PrimaryLink>

            <ul>
                <li>
                    <PrimaryLink href="/generate">Generate</PrimaryLink>
                </li>
            </ul>

            <ul>
                <li>
                    {
                        isLoggedIn &&
                        <Button variant={'secondary'} onClick={() => {
                            signOut().catch(console.error)
                        }}>Logout</Button>
                    }
                    {
                        !isLoggedIn &&
                        <Button onClick={() => {
                            signIn().catch(console.error)
                        }}>Login</Button>
                    }
                </li>
            </ul>
        </header>
    );
}