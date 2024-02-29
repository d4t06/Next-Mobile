import { ReactNode } from "react";



export default function AuthLayout({children}: {children: ReactNode}) {


    return (
        <div>
            <h1>This is auth sdfsdflayout</h1>
            {children}
        </div>
    )
}   