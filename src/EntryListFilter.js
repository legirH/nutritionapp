import { Link } from "react-router-dom";
// maping all entries that are Favorite 
const EntryListFilter = ({entries, title}) => { // can do (props and then declare each one or only the ones you need)

    return ( 
        <div className="entry-listfilter">
            <h2> { title } </h2>
              {entries.filter(entry => entry.favorite).map((entry) => (
                <div className="entry-preview" key = {entry.id}>
                    <Link to = {`/entries/${entry.id}`}>
                        <h2>{ entry.title } {entry.favorite == true ? '♥' : ''} </h2>
                        <p>{ entry.mealType }</p>
                        <p>{ entry.date.substring(0, 10) } </p>
                    </Link>
                 </div>
            ))}
        </div>
    );
}
 
export default EntryListFilter;