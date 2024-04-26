import { TaskCounts } from '@/types/task-counts'
import { HomeIcon, StarIcon, SunIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

function Sidebar({ onClick ,taskCounts}: { onClick: Function ,taskCounts : TaskCounts}) {
    return (
        <div className='p-5'>
            <ul className='flex flex-col gap-5'>
                <li>
                    <Link href="/myday"
                        onClick={() => onClick()}>

                        <div className='flex gap-5'>
                            <SunIcon className='w-6 h-6'></SunIcon>My Day
                        </div>

                        <div className='text-muted-foreground'>{taskCounts.myDay}</div>
                    </Link>
                </li>
                <li>
                    <Link href="/important" className='flex gap-2 items-center justify-between'
                        onClick={() => onClick()}>

                        <div className='flex gap-5'>
                            <StarIcon className='w-6 h-6'></StarIcon>Important
                        </div>

                        <div className='text-muted-foreground'>{taskCounts.important}</div>
                    </Link>
                </li>
                <li>
                    <Link href="/tasks" className='flex gap-2 items-center justify-between'
                        onClick={() => onClick()}>

                        <div className='flex gap-5'><HomeIcon className='w-6 h-6' /> Tasks</div>

                        <div className='text-muted-foreground'>{taskCounts.tasks}</div>
                    </Link>
                </li>
            </ul>

        </div>
    )
}

export default Sidebar
