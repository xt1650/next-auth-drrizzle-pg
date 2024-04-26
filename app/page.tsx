import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import SignInBtn from "@/components/signin-btn";
import SignInBtnAuto from "@/components/signin-btn-auto";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex h-screen w-screen justify-center items-center">

      <div className="flex flex-col gap-5 text-center">
        <ModeToggle></ModeToggle>

        <h1>To Do</h1>
        {session ? (

          <Link href="/tasks">

            <Button>Go To App<ArrowRightIcon className="ml-2"></ArrowRightIcon></Button>

          </Link>


        ) : <SignInBtn></SignInBtn>}

      </div>




    </div>
  );
}
