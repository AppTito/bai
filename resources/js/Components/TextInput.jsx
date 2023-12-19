import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "appearance-none w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-white focus:border-b-[#FF9F14] focus:ring-0 hover:border-b-[#FF9F14] text-white focus:text-[#FF9F14] hover:text-[#FF9F14]" +
                className
            }
            ref={input}
        />
    );
});
