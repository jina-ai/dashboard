import React from "react";

export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export default function Card ({children, className}: DivProps) {
 return (
    <div className={`${className} flex bg-white rounded-md border border-gray-200 p-4`}>
        {children}
    </div>
)
 }