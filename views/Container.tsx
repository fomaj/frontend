import * as React from 'react';
import Navbar from "./Navigation/NavBar";

type Props = {
    children: React.ReactNode;
};

export function Container({children}: Props) {
    return (
        <div className={"h-screen bg-gray-800"}>
            <Navbar/>
            {children}
        </div>
    );
}