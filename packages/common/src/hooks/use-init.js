import { useEffect, useState } from "react";
export const useInit = (f) => {
    const [v, setV] = useState(null);
    useEffect(() => {
        const v = f();
        setV(v);
    }, []);
    return v;
};
