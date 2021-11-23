import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [isPending, setisPending] = useState(false);
    const history = useHistory();


    const handelSubmit = (e) =>{
        e.preventDefault();
        const dateOne = new Date()
        let date = dateOne.toString();

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

             const entry ={ title, body, mealType, date, favorite, totalCal, totalProtein, totalCarbs, totalFats, totalCalcium };



            console.log(totalCal);
            console.log(totalProtein);
            console.log(totalCarbs);
            console.log(totalFats);
            console.log(totalCalcium);

            
            /* not sure if this needs to be inside the natural nutrient search 
            part or outside in the general handle submit */

            console.log("Fetch was done")
            
            fetch('http://localhost:8000/entries', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry)
            }).then(() => {
                console.log('New entry added');
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