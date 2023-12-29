import React, { useState, useEffect } from "react";
import { ChevronLast, ChevronFirst } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import { useWindowSize } from "@uidotdev/usehooks";
import logo from "../../imgs/badi.webp";
import SidebarContext from "@/context/sidebarContext.jsx";

export function Sidebar({ children, user }) {
    const [expanded, setExpanded] = useState(true);
    const { width } = useWindowSize();

    useEffect(() => {
        setExpanded(width >= 768);
    }, [width]);

    const getInitials = (name) => {
        const nameArray = name.split(" ");
        return nameArray.map((word) => word[0]).join("").toUpperCase();
    };

    return (
        <div className={"flex "}>
            <aside className="h-screen ">
                {/*<nav className="h-full max-h-screen flex flex-col bg-itemSA border-r shadow-sm">*/}
                    <nav className="h-full flex flex-col bg-itemSA border-r shadow-sm">
                        <div className="py-5 pr-4  flex justify-around ">
                            <img src={logo} alt=""
                                 className={`overflow-hidden transition-all ${
                                     expanded ? "w-36" : "w-0"
                                 }`}/>
                            <button onClick={() => setExpanded((curr) => !curr)}
                                    className="p-1.5 rounded-lg bg-primary ">
                                {expanded ? <ChevronFirst/> : <ChevronLast/>}
                            </button>
                        </div>
                        <SidebarContext.Provider value={{expanded}}>
                            <ul className="flex-1 px-4 overflow-y-auto">{children}</ul>
                            {/*<ul className="flex-1 px-4">{children}</ul>*/}
                        </SidebarContext.Provider>
                        <div className="flex w-full py-2 pr-0.5 mb-2 items-start justify-around">
                            <Link className="flex items-center" text="Cerrar Sesión" href={route("logout")}
                                  method="post" as="button">
                                <Icon icon="mdi:logout" className={"text-primary"}/>
                                <span
                                    className={`overflow-hidden transition-all text-primary ${expanded ? "w-52 ml-3" : "w-0"}`}>
                                Cerrar Sesión
                             </span>
                            </Link>
                        </div>
                        <div className="border-t  flex w-full py-2 pr-1.5 items-center justify-around">
                            {user && user.name && (
                                <div
                                    className={`overflow-hidden transition-all border rounded items-center text-primary ml-2 p-2 pt-2`}>
                                    {getInitials(user.name)}
                                </div>
                            )}
                            <div className={`flex justify-around items-center overflow-hidden transition-all
                            ${expanded ? "w-48 " : " w-0 "} `}>
                                <div className="leading-4">
                                    <h4 className="font-semibold text-white">{user.name}</h4>
                                    <span className="text-xs text-white">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </nav>
            </aside>
        </div>
);
}

