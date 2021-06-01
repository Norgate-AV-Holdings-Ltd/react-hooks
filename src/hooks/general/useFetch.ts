import { useState, useEffect } from "react"

export const useFetch = (url: string = '', options: any = null) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        let isMounted = true;

        setLoading(true);

        fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (isMounted) {
                setData(data);
                setError(null);
            }
        })
        .catch(error => {
            if (isMounted) {
                setError(error);
                setData(null);
            }
        })
        .finally(() => isMounted && setLoading(false));

        return () => {
            isMounted = false
        };

    }, [url, options]);

    return { loading, error, data };
};
