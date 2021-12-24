import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

const Create = () => {    

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [servingsConsumed, setServingsConsumed] = useState('1');
    const [servings, setServings] = useState('1');
    const [isPending, setisPending] = useState(false);
    const history = useHistory();

    const [todaysTotalCalories, setTodaysTotalCalories] = useState(0);
    const [todaysTotalProtein, setTodaysTotalProtein] = useState(0);
    const [todaysTotalCarbohydrates, setTodaysTotalCarbohydrates] = useState(0);
    const [todaysTotalFats, setTodaysTotalFats] = useState(0);
    const [todaysTotalCalcium, setTodaysTotalCalcium] = useState(0);

    const dateOne = new Date()
    let date = dateOne.toString().substring(0, 10);

    const idPart1 = date.replace(" ", "-");
    let id = idPart1.replace(" ", "-");

    useEffect(() => {
        const abortConst = new AbortController(); // assosiating abort with fetch so it can be stoped

        console.log('Use effect ran for todaysTotals');
        fetch('http://localhost:8000/todaysTotals/' + id, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok) {
                    console.log('error in useEffect')
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
                console.log('from db calories '+ data.todaysTotalCalories);
                console.log('from db protein ' + data.todaysTotalProtein);
                console.log('data is '+data)
        
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

    }, []); // if nothing in the array [] then it will only run once, if you put eg name it will run only when name is changed, if no [] then will run evertime something is changed


    const handelSubmit = (e) =>{
        e.preventDefault();
        
        console.log(date);

        const favorite = new Boolean(false);

        setisPending(true);

        // Nutritionix request
    
        const nutritionix = require("nutritionix-api");
        
        const APP_ID   = '4f8d3652'; // Your APP ID
        const API_KEY  = '65fc845830a41cc8dd76825821b4ac38'; // Your KEY
        const SearchPhrase = body;
      
        nutritionix.init(APP_ID,API_KEY);
      
        nutritionix.natural.search(SearchPhrase).then(result => {
        
            console.log(result);

            var totalCal = 0;
            var totalProtein = 0;
            var totalCarbs = 0;
            var totalFats = 0;
            var totalCalcium = 0;

                // loop to add all calories and micronutrient amounts when there are multiple food items
            for (let i = 0; i < result.foods.length; i++){
                
                var calories = result.foods[i].nf_calories;
                var protein = result.foods[i].nf_protein;
                var carbohydrates = result.foods[i].nf_total_carbohydrate;
                var fats = result.foods[i].nf_total_fat;
                var calcium = result.foods[i].full_nutrients.find(x => x.attr_id === 301).value;

                totalCal = totalCal + calories;
                totalProtein = totalProtein + protein;
                totalCarbs = totalCarbs + carbohydrates;
                totalFats = totalFats + fats;
                totalCalcium = totalCalcium + calcium;
                
            }

            const entry ={ title, body, mealType, servings, servingsConsumed, date, favorite, totalCal, totalProtein, totalCarbs, totalFats, totalCalcium };

            totalCal = todaysTotalCalories + totalCal;
            totalProtein = todaysTotalProtein + totalProtein;
            totalCarbs = todaysTotalCarbohydrates + totalCarbs;
            totalFats = todaysTotalFats + totalFats;
            totalCalcium = todaysTotalCalcium + totalCalcium;

            const todaysTotal = {date, todaysTotalCalories: totalCal, todaysTotalProtein: totalProtein, todaysTotalCarbohydrates: totalCarbs, todaysTotalFats: totalFats, todaysTotalCalcium: totalCalcium, id}

            // testing data
            console.log('total Calories' + totalCal);
            console.log('total Protein' + totalProtein);
            console.log('total Carbohydrates' + totalCarbs);
            console.log('total Fats' + totalFats);
            console.log('total Calcium' + totalCalcium);
    
            console.log("Fetch was done")
                
            fetch('http://localhost:8000/entries', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry)
            })
            // .then(() => {
            //     console.log('New entry added');
            //     setisPending(false);
            //     history.push('/'); 

            // })

            // if its the first enyry of the day or if all the totals = 0 then create a new
            // total entry, if not fetch the total for the current day and add entry details to
            // the new total
            fetch('http://localhost:8000/todaysTotals/' + id, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todaysTotal)
            }).then(() => {
                console.log('New total added');
                setisPending(false);
                history.push('/'); 

            })
          
        });
    
    }

    return ( 
        <div className="create">
            <h2>Add a New Entry</h2>
            <form onSubmit = {handelSubmit}> 
                <label>Title:</label>
                <input 
                    type ="text"
                    required
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Food Entry:</label>
                <textarea
                    required
                    value = {body}
                    onChange = {(e) => setBody(e.target.value)}
                ></textarea>
                <label>Servings:</label>
                <input 
                    type ="text"
                    required
                    value = {servings}
                    onChange = {(e) => setServings(e.target.value)}
                />
                <label>Servings Consumed:</label>
                <input 
                    type ="text"
                    required
                    value = {servingsConsumed}
                    onChange = {(e) => setServingsConsumed(e.target.value)}
                />
                <label> Meal Type:</label>
                <select 
                    required
                    value = {mealType}
                    onChange = {(e) => setMealType(e.target.value)}
                >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>

                </select>
                
                {!isPending && <button>Add Entry</button>}
                {isPending && <button disabled>Adding entry...</button>}

        
            </form>
            
        </div>
     );
}
 
export default Create;