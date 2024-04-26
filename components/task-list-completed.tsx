"use client"
import { Task } from '@/types/task'
import { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import TaskList from './task-list'
import { tasks } from '@/lib/schema'

type Props = {
  tasks: Task[]
}

export default function TaskListCompleted(props: Props) {
  const [open, setOpen] = useState(false)
  const { tasks } = props;

  return (
    <div>

      {open ? (
        <div className='flex flex-col gap-5'>
          <div> <Button onClick={() => setOpen(!open)}>
            <ChevronDownIcon className='mr-2'></ChevronDownIcon> Completed {tasks.length}
          </Button></div>

          <TaskList tasks={tasks} accentClassName=''></TaskList>
        </div>
      ) : (
        <div>

          <Button onClick={() => setOpen(!open)}>
            <ChevronRightIcon className='mr-2' /> Completed {tasks.length}
          </Button>
        </div>
      )}
    </div>
  )
}
