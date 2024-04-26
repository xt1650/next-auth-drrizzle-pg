"use client"
import { KeyboardEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { createTask, CreateTaskSchema } from "@/actions/create-task";

type Props = {
    className:string;
    isImportant? : boolean;
    isMyDay? : boolean;
}

export default function AddTask(props : Props) {
    const {className , isImportant , isMyDay} = props;
    const [isAdding, setIsAdding] = useState(false);
    const [title,setTitle] = useState("")
    async function handleKeyDown(e:KeyboardEvent) {
        console.log("keydown")

        if(e.key === "Enter"){
            const data : CreateTaskSchema = {
                title: title,
                isImportant: isImportant ? true : false,
                addedToMyDayAt: undefined
            }
            if(isMyDay ){

                data.addedToMyDayAt = new Date();
            }

            await createTask(data);
            setTitle("")
        }
        
    }

    return (
        <div>
            {isAdding ? (

                <Input
                type="text"
                name="title"
                placeholder="Try adding pay utilities by Friday 6pm"
                onKeyDown={handleKeyDown}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={()=>setIsAdding(false)}
                ></Input>
            ) : (
                <Button className={className} onClick={()=> setIsAdding(true)}
                > <PlusIcon></PlusIcon>Add Task</Button>
            )}
        </div>
    )


}