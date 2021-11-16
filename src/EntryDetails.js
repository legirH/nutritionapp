import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const EntryDetails = () => {
    const { id } = useParams();
    const { data: entry, error, isPending} = useFetch('http://localhost:8000/entries/' + id);
    const history = useHistory();

    const handelClick= () => {
        fetch('http://localhost:8000/entries/' + entry.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }
    const handelClickFavorite= () => {
        fetch('http://localhost:8000/entries/' + entry.id, {
            //set favorite in entry to true put or patch
            
        })
    }

    return (
        <div className="entry-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { entry && (
                <article>
                    
                    <h2>{ entry.title } { entry.date.substring(0, 10) } </h2>
                    <p>{ entry.mealType }</p>
                    <div>{ entry.body }</div>
                    
                    <button onClick = {handelClick}>delete</button>
                    <button onClick = {handelClickFavorite}>Favorite</button>
                </article>
            )}
        </div>
    );
}
 
export default EntryDetails;