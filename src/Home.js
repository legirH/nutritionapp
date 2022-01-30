import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import EntryListFilter from "./EntryListFilter";
import EntryListFilterDate from "./EntryListFilterDate";
import useFetch from './useFetch';

const Home = () => {

    const dateOne = new Date()
    let date = dateOne.toString().substring(0, 10);

    const idPart1 = date.replace(" ", "-");
    let dateid = idPart1.replace(" ", "-");
      

    const [calories, setCalories] = useState();
    const [protein, setProtein] = useState();
    const [carbohydrates, setCarbohydrates] = useState();
    const [fats, setFats] = useState();
    const [calcium, setCalcium] = useState();

    const [todaysTotalCalories, setTodaysTotalCalories ] = useState();
    const [todaysTotalProtein, setTodaysTotalProtein ] = useState();
    const [todaysTotalCarbohydrates, setTodaysTotalCarbohydrates ] = useState();
    const [todaysTotalFats, setTodaysTotalFats ] = useState();
    const [todaysTotalCalcium, setTodaysTotalCalcium ] = useState();

    const { data: entries, isPending, error } = useFetch('http://localhost:8000/entries');

    useEffect(() => {
        const abortConst = new AbortController(); // assosiating abort with fetch so it can be stoped

        console.log('Use effect ran');
        fetch('http://localhost:8000/profile', { signal: abortConst.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resourse');
                }


            return res.json()
            })
            .then((data) => {
                setCalories(data.calories);
                setProtein(data.protein);
                setCarbohydrates(data.carbohydrates);
                setFats(data.fats);
                setCalcium(data.calcium);
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
      
      useEffect(() => {
        const abortConst = new AbortController(); // assosiating abort with fetch so it can be stoped
        
        console.log('Use effect ran');
        fetch('http://localhost:8000/todaysTotals/' + dateid, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resourse');
                }


            return res.json()
            })
            .then((data) => {
                setTodaysTotalCalories(data.todaysTotalCalories);
                setTodaysTotalProtein(data.todaysTotalProtein);
                setTodaysTotalCarbohydrates(data.todaysTotalCarbohydrates);
                setTodaysTotalFats(data.todaysTotalFats);
                setTodaysTotalCalcium(data.todaysTotalCalcium);

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

    var currentCalories = todaysTotalCalories;
    var goalCalories = calories;
    var caloriePercent = Math.round((currentCalories / goalCalories) * 100);

    var currentProtein = todaysTotalProtein;
    var goalProtein = protein;
    var proteinPercent = Math.round((currentProtein / goalProtein ) * 100);

    var currentCarbohydrates = todaysTotalCarbohydrates;
    var goalCarbohydrates = carbohydrates;
    var carbohydratePercent = Math.round((currentCarbohydrates / goalCarbohydrates ) * 100);

    var currentFats = todaysTotalFats;
    var goalFats = fats;
    var fatsPercent = Math.round((currentFats / goalFats ) * 100);

    var currentCalcium = todaysTotalCalcium;
    var goalCalcium = calcium;
    var calciumPercent = Math.round(( currentCalcium / goalCalcium ) * 100);

    var globalPercent = Math.round((caloriePercent + proteinPercent + carbohydratePercent + fatsPercent + calciumPercent) / 5) ;


    const testData = [
        { bgcolor: "#6a1b9a", completed: globalPercent, name: "Total" },
      ];

      

    return ( 
        <div>  
            {testData.map((item, idx) => (
            <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} name={item.name} />
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