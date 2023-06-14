import {Button, TextField} from "@mui/material";
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from "../../store/models/authUser";
import {useSigInMutation} from '../../store/api/auth'
import { useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Decode} from "../../store/models/jwtDecode";
import jwtDecode from "jwt-decode";
type Props = {
    display: boolean,
    setDisplay :React.Dispatch<React.SetStateAction<boolean>>
}
export function SignIn({display,setDisplay}:Props) {
    const [login, result] = useSigInMutation()
    const navigate = useNavigate()
    const { handleSubmit,  register } = useForm<User>()

    
    const btnSubmit: SubmitHandler<User> = async (data) => await login(data)
        .unwrap()
        .then(response=>{
            toast.success(`Добро пожаловать ${data.username}`,{
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            const decode:Decode=jwtDecode(response.access_token)
            if(decode.is_admin===1){
                navigate('/admin')
            } else{
                navigate('/',{replace:true})
            }
        })
        .catch(error=>toast.error(`${error.data.detail}`,{
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
        }))

    return(
        <div
            className={` py-2 ${display?'flex':'hidden'} flex-col justify-between items-center duration-200`}
        >
            <form
                onSubmit={handleSubmit(btnSubmit)}
            >
                <TextField
                    {...register('username')}
                    type="text"
                    sx={{ marginTop: 2, width: '100%' }}
                    variant="outlined"
                    label="Username"
                />
                <TextField
                {...register('password')}
                                label="Password"
                                variant="outlined"
                                type="password"
                                sx={{ marginTop: 2, width: '100%' }}
                            />
                <Button
                    variant="contained"
                    color="error"
                    sx={{ marginTop: 2, width: '100%' }}
                    type="submit"
                    disabled={result.isLoading}
                >Sign In</Button>
            </form>
            <div>
                <span className="mr-2">{ display?'Нет аккаунта?':''}</span>
                <button

                    onClick={()=>setDisplay(display=>!display)}
                    className="text-[#da002b]"
                >{display?'Зарегистрироваться':'' }</button>
                </div>
        </div>
    )
}