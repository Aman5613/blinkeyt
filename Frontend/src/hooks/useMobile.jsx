import { useState } from "react";

const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    return isMobile;

}

export default useMobile;