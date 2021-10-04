import { Link } from "react-router-dom";

const EntryList = ({entries, title}) => { // can do (props and then declare each one or only the ones you need)

    return ( 
        <div className="entry-list">
            <h2> { title } </h2>
              {entries.map((entry) => (
                <div className="entry-preview" key = {entry.id}>
                    <Link to = {`/entries/${entry.id}`}>
                        <h2>{ entry.title }</h2>
                        <p>{ entry.mealType }</p>
                    </Link>
                 </div>
            ))}
        </div>
    );
}
 
export default EntryList;

// <button onClick={() => handleDelete(blog.id)}>delete blog</button>
