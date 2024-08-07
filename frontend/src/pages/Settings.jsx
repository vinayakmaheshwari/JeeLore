import { Setting } from "../components/Setting"



export const SettingsPage = () => {
    return(
        <div className="flex flex-col flex-1 h-full items-center justify-center w-full">
            <div className="h-20 w-full"></div>
            <div className="flex h-full w-full items-center justify-center">
            <Setting />
            </div>
        </div>
        
    )
}