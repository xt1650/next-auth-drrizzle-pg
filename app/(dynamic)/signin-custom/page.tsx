import SigninBtnCustom from "@/components/signin-btn-custom";
import SignOutBtnCustom from "@/components/signout-btn.custom";
import { auth } from "@/lib/auth";

export default async function Page() {
    

    const session = await auth();

    if(session){
        return (
        <div>
            Signed in as: {session.user.name} <br></br>
            <SignOutBtnCustom></SignOutBtnCustom>
        </div>)
    }

    return (
        <div>
            <h1>Sign in Custom</h1>
            <SigninBtnCustom provider={{id : "github" , name : "GitHub"}} ></SigninBtnCustom>
        </div>
    )
}