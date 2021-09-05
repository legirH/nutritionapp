import EntryList from './EntryList';
import useFetch from './useFetch';

const HistoryPage = () => {
    const { data: entries, isPending, error } = useFetch('http://localhost:8000/entries');


   
    return ( 
        <div className="history"> 
            { error && <div> { error } </div>}
            {isPending && <div> Loading... </div>}
            {entries && <EntryList entries={entries} title="All Entries"  /> }    
        </div>
     );
}
 
export default HistoryPage;