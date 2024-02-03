import { useMemo } from "react";

export function Button(props) {
    const {
        children,
        size = "",
        block = false,
        outlined = false,
        secondary,
        success,
        danger ,
        onClick,
    } = props;

    const buttonClasses = useMemo(() => {
        let defaultClasses =
            "my-2 rounded-xl font-title text-white flex flex-row items-center justify-center";

        if (block) {
            defaultClasses += " block w-full ";
        }

        if (size === "sm") {
            defaultClasses += " text-sm h-8 px-2 ";
        } else {
            defaultClasses += " h-12 px-4 ";
        }

        if (outlined) {
            if (secondary) {
                defaultClasses += " b-g border text-gray-600";
            } else if (success) {
                defaultClasses += " border-green-600 border text-green-500";
            } else if (danger) {
                defaultClasses += " border-red-500 border text-red-500";
            } else {
                defaultClasses += "text-[#0066ff] border-blue-400 border ";
            }
        } else {
            if (secondary) {
                defaultClasses += " bg-gray-400 ";
            } else if (success) {
                defaultClasses += " bg-green-600 ";
            } else if (danger) {
                defaultClasses += " bg-red-500 ";
            } else {
                defaultClasses += "bg-blue-500";
            }
        }

        return defaultClasses;
    }, [block, danger, outlined, secondary, size, success]);

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
