"use client"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Task } from '@/types/task'
import React from 'react'
import { Checkbox } from './ui/checkbox'
import completeTask from '@/actions/complete.task'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { updateTask } from "@/actions/update-task"
import { StarFilledIcon, StarIcon, SunIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { format } from "date-fns";

type Props = {
  tasks: Task[],
  accentClassName: string
}


function TaskList({ tasks, accentClassName }: Props) {


  async function checkTask(task: Task) {
    await completeTask(task.id, !task.isComplete)
  }

  async function updateTitle(task: Task, title: string) {
    const data = {
      title: title
    }
    await updateTask(task.id, data)

  }

  async function updateNote(task: Task, note: string) {
    const data = {
      note: note
    }

    await updateTask(task.id, data)

  }

  async function toggleImportant(task: Task) {
    const data = {
      isImportant: !task.isImportant
    }

    await updateTask(task.id, data)
  }

  async function handleRemoveFromDay(task:Task) {
    const data = {
      addedToMyDayAt: null
    }
    await updateTask(task.id,data)
    
  }

  async function handleAddToMyDay(task:Task) {

    console.log(new Date().toISOString())
    const data = {
      addedToMyDayAt: new Date()
    }
    await updateTask(task.id,data)
    
  }



  return (
    <div>
      {tasks.map((task) => (
        
        <div className='bg-accent mb-0.5 rounded text-foreground flex items-center' key={task.id}>
          <div className='p-3'>
            <Checkbox checked={task.isComplete ? true : false} onClick={() => checkTask(task)}></Checkbox>
          </div>
          <div className="flex-auto ">


            <Drawer>
              <DrawerTrigger className={cn("w-full text-left p-3",task.isComplete && "line-through text-muted-foreground")}> {task.title}</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Task</DrawerTitle>
                </DrawerHeader>
                <div className="p-5 flex flex-col gap-5">
                  <Input
                    type="text"
                    name="title"
                    defaultValue={task.title ?? ""}
                    onChange={(e) => updateTitle(task, e.target.value)}

                  />
                  <Textarea placeholder="Add Note"
                    name="note"
                    defaultValue={task.note ?? ""}
                    onChange={(e) => updateNote(task, e.target.value)}
                  />
                  
                  {
                    
                  task.addedToMyDayAt && 
                   task.addedToMyDayAt.toDateString() > format(new Date(),"yyyy-MM-dd")
                  ? (
                    <Button className={cn("bg-accent hover:bg-accent/50",accentClassName)} 
                    onClick={()=> handleRemoveFromDay(task)}>
                      <SunIcon className="mr-2 w-6 h-6"></SunIcon>Remove from My Day </Button>
                  ) : (
                    <Button onClick={()=> handleAddToMyDay(task)}>
                      
                      <SunIcon className="mr-2 w-6 h-6"></SunIcon>Add To My Day</Button>
                  )}


                </div>
                {/* <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter> */}
              </DrawerContent>
            </Drawer>

          </div>
          <Button
            className={accentClassName}
            variant="ghost"
            onClick={() => toggleImportant(task)}>
            {task.isImportant ? (
              <StarFilledIcon className="w-6 h-6"></StarFilledIcon>
            ) : (
              <StarIcon className="w-6 h-6" />
            )}</Button>


        </div>
      ))}
    </div>
  )
}

export default TaskList
