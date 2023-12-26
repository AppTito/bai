import React, { useContext, useState } from "react";
import { Link } from "@inertiajs/react";
import SidebarContext from "@/context/sidebarContext.jsx";

export function SidebarItem({ icon, text, active, alert, href, method, children, as, categoryIcon }) {
    const { expanded } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const renderLink = () => {
        if (href) {
            return (
                <Link href={href} className="flex items-center" method={method} as={as}>
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        {text}
                    </span>
                </Link>
            );
        } else {
            return (
                <div className={`flex ${expanded ? "" : "flex-col items-center"} cursor-pointer`} onClick={handleToggle}>
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3 " : "w-0"}`}>
                        {text}
                    </span>
                    {expanded && categoryIcon}
                </div>
            );
        }
    };

    return (
        <li className={` relative  flex flex-col items-start py-2 px-3 my-1 font-medium rounded-md cursor-pointer
            group ${active ? " bg-gradient-to-tr from-borderHover-900 to-borderHover-100 text-white" :
            "hover:bg-[#d3fcb9] text-primary hover:text-primary transition-all group-hover:bg-itemSA"}`}
            style={{ zIndex: isOpen ? 2 : 1 }}>
            {renderLink()}
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-primary ${expanded ? "" : "top-2 "}`} />
            )}
            {!expanded && (
                <div className={` absolute left-full rounded-md px-2 py-1 ml-6 bg-primary text-white text-sm
                invisible -translate-x-3 transition-all group-hover:visible group-hover:opacity-100
                group-hover:translate-x-0  z-2`}>
                    {text}
                </div>
            )}
            {children && (
                <ul className={`ml-4 ${isOpen ? "block" : "hidden"} ${expanded ? "w-52  " : "max-content "}`} style={{ zIndex: 1 }}>
                    {children}
                </ul>
            )}
        </li>
    );
}
