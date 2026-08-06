import { ReactNode } from "react";

interface PanelProps {
    children: ReactNode;
    className?: string;
}

export default function Panel({
    children,
    className = ""
}: PanelProps) {
    return (
        <div className={`rounded-lg border bg-white shadow-sm p-5 ${className}`}>
            {children}
        </div>
    );

}