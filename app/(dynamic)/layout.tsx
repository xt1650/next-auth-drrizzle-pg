import { auth } from "@/lib/auth";
import SessionProvider from "@/components/session-provider";
import { ReactNode } from "react";

export default async function Layout({children} : { children : ReactNode} ) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            {<div>{children}</div>}
        </SessionProvider>
    );
    
}