import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { loginFormTenantApi } from "../-api/login-form-tenant.api"
import { useAuthStore } from "@/store";

export function useTenantLoginForm(){
    const setCredentials = useAuthStore(state=>state.setCredentials)
    const navigate = useNavigate()

    return useMutation({
        mutationFn: loginFormTenantApi,
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