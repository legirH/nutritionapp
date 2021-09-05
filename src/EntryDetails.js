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

    return (
        <div className="entry-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { entry && (
                <article>
                    <h2>{ entry.title }</h2>
                    <p>{ entry.mealType }</p>
                    <div>{ entry.body }</div>
                    <button onClick = {handelClick}>delete</button>
                </article>
            )}
        </div>
    );
}
 
export default EntryDetails;