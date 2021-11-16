import { Link } from "react-router-dom";

const EntryListFilterDate = ({entries, title}) => { // can do (props and then declare each one or only the ones you need)
    const dateOne = new Date();
    const text = dateOne.toString();
    var date = text.substring(0, 10);
    console.log(text);
    
    

    return ( 
        <div className="entry-listfilterdate">
            <h2> { title } </h2>
              {entries.filter(entry => entry.date.substring(0, 10) == date).map((entry) => (
                <div className="entry-preview" key = {entry.id}>
                    <Link to = {`/entries/${entry.id}`}>
                        <h2>{ entry.title }</h2>
                        <p>{ entry.mealType }</p>
                        <p>{ entry.date.substring(0, 10) } </p>
                    </Link>
                 </div>
            ))}
        </div>
    );
}
 
export default EntryListFilterDate;