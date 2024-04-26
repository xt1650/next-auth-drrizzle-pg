import AddTask from "@/components/add-tasks";
import TaskList from "@/components/task-list";
import TaskListCompleted from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db"
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export default async function Page() {
    const session = await auth()


    const res = await db.query.tasks.findMany({
        where : and(
            eq(tasks.userId,session?.user.id!),
            eq(tasks.isComplete, false)
        )
    });

    const resCompleted = await db.query.tasks.findMany(
        {where : and(
            eq(tasks.userId, session?.user.id!),
            eq(tasks.isComplete,true)
        )}
    )

    return (
        <div className="flex flex-col text-accent-blue-foreground p-5 gap-5">




            <h1 className="font-bold text-3xl ">Tasks</h1>

            {
                res.length > 0 ? (
                    <div><TaskList tasks={res} accentClassName="text-red"></TaskList></div>

                ) : (
            <div>
                Tasks show up here if they aren't aren't part of lists you've created
            </div>
            )}
            <div><TaskListCompleted tasks={resCompleted}></TaskListCompleted></div>
            <div><AddTask className="text-accent"/></div>
        </div>
        )

}