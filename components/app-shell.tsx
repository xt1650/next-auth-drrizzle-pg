"use client"
import { ReactNode, useState } from "react";
import Header from "./header";
import AvatarMenu from "./avatar-menu";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { TaskCounts } from "@/types/task-counts";

export default function AppShell({ children ,taskCounts }: { children: ReactNode, taskCounts : TaskCounts }) {
    const [open, setOpen] = useState(false)

    const pathname = usePathname();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="sm:col-span-12"><Header /></div>
            <div className={cn("transition -translate-x-full delay-200 absolute top-20 w-full h-full left-0 bg-background sm:col-span-3",
                open && "translate-x-0"
            )}><Sidebar taskCounts={taskCounts} onClick={()=> setOpen(false)}/></div>
            <div>
                <Button className={cn(
                    pathname === "/tasks",
                    pathname === "/important",
                    pathname === "/myday",
                )} variant="link" onClick={()=>setOpen(true)}>
                    <ChevronLeftIcon className="w-6 h-6"/> Lists
                </Button>
            </div>
            <div className="sm:col-span-9">{children}</div>
        </div>

    )

}