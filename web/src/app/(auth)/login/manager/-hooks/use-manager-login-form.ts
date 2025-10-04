import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router"; // <-- import useNavigate

import { loginFormManagerApi } from "../-api/login-form-manager.api"
import { useAuthStore } from "@/store";

export function useManagerLoginForm(){
    const setCredentials = useAuthStore(state=>state.setCredentials)
    const navigate = useNavigate()
    
    return useMutation({
        mutationFn: loginFormManagerApi,
        onSuccess: (data) => {
            setCredentials({
                user: data.user,
                tokens: data.tokens,
                role: data.role
            })   

            navigate({href:"/landing", replace: true})
        },
        onError: (data) => {
            console.log(data)
            alert("Something went wrong")
        }
    })
}