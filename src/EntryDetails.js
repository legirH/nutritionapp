import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";


const EntryDetails = () => {
    const { id } = useParams();
    const { data: entry, error, isPending} = useFetch('http://localhost:8000/entries/' + id);
    const history = useHistory();
    const [favorite, setFavorite] = useState();

/*
    useEffect(() => {
        const abortConst = new AbortController(); // assosiating abort with fetch so it can be stoped

        console.log('Use effect ran');
        fetch('http://localhost:8000/entries/' + entry.id , { signal: abortConst.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resourse');
                }


            return res.json()
            })
            .then((data) => {
                setFavorite(data.favorite);
                //setisPending(false);
                //setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted')
                } else {
                    //setisPending(false);
                    //setError(err.message);
                } 
            })
            return () => abortConst.abort();
    }, []);
*/
    const handelClick= () => {
        fetch('http://localhost:8000/entries/' + entry.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    
    const handelClickFavoriteToggle= () => {
        if( entry.favorite == true){
            fetch('http://localhost:8000/entries/' + entry.id, {
            //set favorite in entry to true put or patch
            method: 'PATCH',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({ favorite: false })
            
            }).then(() => {
                history.push('/');
            })
        }
        else {
            fetch('http://localhost:8000/entries/' + entry.id, {
            //set favorite in entry to true put or patch
            method: 'PATCH',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({ favorite: true })
            
            }).then(() => {
                history.push('/');
            })
        }
    }


    const handelClickAddAsNewEntry= () => {
        fetch('http://localhost:8000/entries/' + entry.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }
    // heart --> &#x2665;
 

    return (
        <div className="entry-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { entry && (
                <article>
                    
                    <h2>{ entry.title }   {entry.favorite == true ? '♥' : ''}  </h2>
                    <h4> { entry.date.substring(0, 10) } </h4>
                    <p>{ entry.mealType }</p>
                    <div>{ entry.body }</div>
                    
                    <button onClick = {handelClick}>delete</button>
                    <button onClick = {handelClickFavoriteToggle}>Toggle Favorite</button>
                    <button onClick = {handelClickAddAsNewEntry}>Add As New Entry</button>
                </article>
            )}
        </div>
    );
}
 
export default EntryDetails;