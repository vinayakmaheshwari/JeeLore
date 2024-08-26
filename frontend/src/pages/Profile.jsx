import { ProfilePosts } from "../components/ProfilePosts"


export const ProfilePage = () => {
   
    return(
        <div className="flex flex-col flex-1 h-full items-center justify-center w-full">
            <div className="h-20 w-full"></div>
            <ProfilePosts/>
           
        </div>
    )
}