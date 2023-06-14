import React from "react";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";


export function  Auth(){

    const [display,setDisplay] = React.useState(true)
    // let page;
    // if(display){
    //     page=<SignIn display={ display} setDisplay={setDisplay} />
    // } else {
    //     page = <SignUp display={ display} setDisplay={setDisplay} />
    // }
    return   (
        <div className='flex flex-col justify-start items-center mt-5 h-[500px]'>
            <div className='w-[500px] border flex flex-col justify-between items-center py-5 md:py-2 px-3'>
                <SignIn display={ display} setDisplay={setDisplay} />
            </div>
        </div>
    )
}