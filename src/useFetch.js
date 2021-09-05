// This is a custom hook, must start with "use" otherwise it wont work
import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortConst = new AbortController(); // assosiating abort with fetch so it can be stoped

        console.log('Use effect ran');
        fetch(url, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resourse');
                }


            return res.json()
            })
            .then((data) => {
                setData(data);
                setisPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted')
                } else {
                    setisPending(false);
                    setError(err.message);
                }
                
            })
            return () => abortConst.abort();

    }, [url]); // if nothing in the array [] then it will only run once, if you put eg name it will run only when name is changed, if no [] then will run evertime something is changed


    return { data, isPending, error }

}


export default useFetch;