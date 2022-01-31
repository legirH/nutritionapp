import { Link } from "react-router-dom";
// mapping all entries 
const EntryList = ({entries, title}) => { // can do (props and then declare each one or only the ones you need)

    return ( 
        <div className="entry-list">
            <h2> { title } </h2>
              {entries.map((entry) => (
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
 
export default EntryList;

// <button onClick={() => handleDelete(blog.id)}>delete blog</button>
