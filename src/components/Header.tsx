import {PrimaryLink} from "~/components/PrimaryLink";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "~/components/Button";
import React from "react";
import {useBuyCredits} from "~/hooks/useBuyCredits";

export function Header() {
    const { buyCredits } = useBuyCredits();

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

            <ul className="flex gap-5">
                    {
                        isLoggedIn &&
                        <>
                            <li>
                                <Button onClick={() => {
                                    buyCredits().catch(console.error)
                                }}>Buy more credits</Button>
                            </li>
                            <li>

                                <Button variant={'secondary'} onClick={() => {
                                    signOut().catch(console.error)
                                }}>Logout</Button>
                            </li>
                        </>
                    }
                    {
                        !isLoggedIn &&
                        <li>
                            <Button onClick={() => {
                                signIn().catch(console.error)
                            }}>Login</Button>
                        </li>
                    }
            </ul>
        </header>
    );
}