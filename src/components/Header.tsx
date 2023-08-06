import {PrimaryLink} from "~/components/PrimaryLink";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "~/components/Button";
import React from "react";
import {useBuyCredits} from "~/hooks/useBuyCredits";
import {api} from "~/utils/api";

export function Header() {
    const { buyCredits } = useBuyCredits();

    const session = useSession();

    const isLoggedIn = !!session.data;

    const credits = api.user.getCredits.useQuery(undefined, {
        enabled: isLoggedIn,
    });

    return (
        <header className="dark:bg-gray-900">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <PrimaryLink href="/">Icon Generator</PrimaryLink>
                <ul className="flex gap-4">
                    <li>
                        <PrimaryLink href="/generate">Generate</PrimaryLink>
                    </li>
                    <li>
                        <PrimaryLink href="/community">Community</PrimaryLink>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <PrimaryLink href="/collection">Collection</PrimaryLink>
                        </li>
                    )}
                </ul>
                <ul className="flex gap-4">
                    {isLoggedIn && (
                        <>
                            <div className="flex items-center">
                                Credits remaining { credits.data }
                            </div>
                            <li>
                                <Button
                                    onClick={() => {
                                        buyCredits().catch(console.error);
                                    }}
                                >
                                    Buy Credits
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        signOut().catch(console.error);
                                    }}
                                >
                                    Logout
                                </Button>
                            </li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Button
                                onClick={() => {
                                    signIn().catch(console.error);
                                }}
                            >
                                Login
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
}