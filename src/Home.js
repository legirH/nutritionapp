import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import EntryListFilter from "./EntryListFilter";
import EntryListFilterDate from "./EntryListFilterDate";
import useFetch from './useFetch';

const Home = () => {

    const { data: entries, isPending, error } = useFetch('http://localhost:8000/entries');


    const [ globalPercent, setGlobalPercent ] = useState();


    useEffect(() => {
        const abortConst = new AbortController(); // assosiating abort with fetch so it can be stoped

        console.log('Use effect ran');
        fetch('http://localhost:8000/totals', { signal: abortConst.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resourse');
                }


            return res.json()
            })
            .then((data) => {
                setGlobalPercent(data.globalPercent);
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

    const testData = [
        { bgcolor: "#6a1b9a", completed: globalPercent },
      ];

      

    return ( 
        <div>  
            <h2> Home Page </h2>
            {testData.map((item, idx) => (
            <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
          ))}

            { error && <div> { error } </div>}
            {isPending && <div> Loading... </div>}
            {entries && <EntryListFilter entries={entries} title="Favorite Entries"  /> }  
            {entries && <EntryListFilterDate entries={entries} title="Today's Entries"  /> }  

        </div>
     );
}
 
export default Home;




/*

 //let name = 'Jon';
    
    const [name, setName] = useState('Jon');
    const [age, setAge] = useState(35);

    const handleClick = () => {
    //    console.log('Hello World');
        setName('Nolen');
        setAge(25);
    }

    const handleClickAgain = (name, e) => {
        console.log('Hello ' + name, e.timeStamp)
    }


// using inside use state, this is not normal to hard code data in, now using a json data base
    [{ title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }]

    const [name, setName] = useState('mario');


    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(newBlogs);
    }
    


 blogs={blogs} is a prop which allows you to use the blogs above in the Blogs List componet without hardcoding it in the component itself 
            

            
 handleDelete={handleDelete} //handelDelete prop

 the line below is a way to use filter and show just marios blogs by checking if blog.author is equal to "mario"
 <BlogList blogs={blogs.filter((blog) => blog.author === "mario")} title="Mario's blogs" />

 <button onClick = {() => setName('luigi')}>change name</button>
 <p> { name } </p>
 



 <p>{ name } is { age } years old</p>
 <button onClick = {handleClick}>
     Click me
 </button>

 <button onClick ={(e) => handleClickAgain('Bob', e)}>
     Click me Too
 </button>



  // const title = 'Welcome to the new blog';
 // const likes = 50;
 // const link = "http://www.google.com"; 
*/