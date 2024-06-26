import AddTask from "@/components/add-tasks";
import TaskList from "@/components/task-list";
import TaskListCompleted from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db"
import { tasks } from "@/lib/schema";
import { and, eq , gte } from "drizzle-orm";
import {format } from "date-fns"

export default async function Page() {
  
    const session = await auth()

    const date = new Date(format(new Date(),"yyyy-MM-dd"))

    const res = await db.query.tasks.findMany({
        where : and(
            eq(tasks.userId,session?.user.id!),
            eq(tasks.isComplete, false),
            gte(tasks.addedToMyDayAt, date)
        )
    });

    const resCompleted = await db.query.tasks.findMany(
        {where : and(
            eq(tasks.userId, session?.user.id!),
            eq(tasks.isComplete,true),
            
            gte(tasks.addedToMyDayAt, date)
        )}
    )

    return (
        <div className="flex flex-col text-accent-foreground p-5 gap-5">




            <h1 className="font-bold text-3xl ">Tasks For Today</h1>

            {
                res.length > 0 ? (
                    <div><TaskList tasks={res} accentClassName="text-accent-foreground"></TaskList></div>

                ) : (
            <div>
                Try starring some tasks to see them here...
            </div>
            )}
            <div><TaskListCompleted tasks={resCompleted}></TaskListCompleted></div>
            <div><AddTask 
            isImportant={true} 
            isMyDay={true}
            className="text-accent"/></div>
        </div>
        )

}