import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false,isLogin, ...props },
    ref
) {
    const input = ref ? ref : useRef();
    const commonStyles = 'focus:ring-0 hover:border-b-[#FF9F14] text-white focus:text-[#FF9F14] hover:text-[#FF9F14]';
    const loginStyles = 'appearance-none w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-white focus:border-b-[#FF9F14] ' + commonStyles;
    const otherStyles = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +className ;

    const inputStyles = isLogin ? loginStyles : otherStyles;

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input {...props} type={type} className={inputStyles}  ref={input} />
    );
});
