import { useContext, useEffect } from "react"
import { AllContext } from "../../context/contex"



export const ProfilePosts = (props) => {
    const auth = useContext(AllContext)
    useEffect(() => {
        try {
            const res = fetch(`https://backend.jeelore.site/api/qsn/getuserposts`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: props.id
                }),
            })
        } catch (error) {
            
        }
    })


}