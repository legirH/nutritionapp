import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const EntryDetails = () => {
    const { id } = useParams();
    const { data: entry, error, isPending } = useFetch('http://localhost:8000/entries/' + id);

    const dateOne = new Date()
    let date = dateOne.toString().substring(0, 10);

    const idPart1 = date.replace(" ", "-");
    let dateid = idPart1.replace(" ", "-");
    
    const history = useHistory();

    const handelClick = () => {

        //Add subtraction from the dailyTotal
        //1. fetch todays todaysTotal
        //2. take values and subtract current entry amounts amounts

        fetch('http://localhost:8000/todaysTotals/' + dateid)
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resourse');
                }
            return res.json()
            })
            .then((data) => {
                 const todaysTotal = {date, 
                    todaysTotalCalories: Math.round( 100 * (data.todaysTotalCalories - (entry.totalCal * (entry.servingsConsumed/entry.servings)))) / 100, 
                    todaysTotalProtein: Math.round( 100 * (data.todaysTotalProtein - (entry.totalProtein * (entry.servingsConsumed/entry.servings)))) / 100, 
                    todaysTotalCarbohydrates: Math.round( 100 * (data.todaysTotalCarbohydrates - (entry.totalCarbs * (entry.servingsConsumed/entry.servings)))) / 100, 
                    todaysTotalFats: Math.round( 100 * (data.todaysTotalFats - (entry.totalFats * (entry.servingsConsumed/entry.servings)))) / 100, 
                    todaysTotalCalcium: Math.round( 100 * (data.todaysTotalCalcium - (entry.totalCalcium * (entry.servingsConsumed/entry.servings)))) / 100, 
                    id: dateid};

                    console.log(todaysTotal);


                
                console.log('Total Calories for the day: ' + data.todaysTotalCalories );
                console.log('Total Protein for the day: ' + data.todaysTotalProtein);
                console.log('Total Carbs for the day: ' + data.todaysTotalCarbohydrates);
                console.log('Total Fats for the day: ' + data.todaysTotalFats);
                console.log('Total Calcium for the day: ' + data.todaysTotalCalcium);

                console.log('Calories: db value minus entry value: ' + Math.round( 100 * (data.todaysTotalCalories - (entry.totalCal * (entry.servingsConsumed/entry.servings)))) / 100);
                console.log('Protein: db value minus entry value: ' + Math.round( 100 * (data.todaysTotalProtein - (entry.totalProtein * (entry.servingsConsumed/entry.servings)))) / 100);
                console.log('Carbohydrates: db value minus entry value: ' + Math.round( 100 * (data.todaysTotalCarbohydrates - (entry.totalCarbs * (entry.servingsConsumed/entry.servings)))) / 100);
                console.log('Fats: db value minus entry value: ' + Math.round( 100 * (data.todaysTotalFats - (entry.totalFats * (entry.servingsConsumed/entry.servings)))) / 100);
                console.log('Calcium: db value minus entry value: ' + Math.round( 100 * (data.todaysTotalCalcium - (entry.totalCalcium * (entry.servingsConsumed/entry.servings)))) / 100);

                console.log(entry.totalCal);
                console.log(entry.totalProtein);
                console.log(entry.totalCarbs);
                console.log(entry.totalFats);
                console.log(entry.totalCalcium);
                //3. update todays todaysTotal
            //should update the useEffect above to run

            fetch('http://localhost:8000/todaysTotals/' + dateid, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todaysTotal)
            })  
        });
            

            fetch('http://localhost:8000/entries/' + entry.id, {
                method: 'DELETE'
            }).then(() => {
                history.push('/');
            })

    }


    const handelClickFavoriteToggle = () => {
        if (entry.favorite == true) {
            fetch('http://localhost:8000/entries/' + entry.id, {
                //Toggeling favorite tag to false
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ favorite: false })

            }).then(() => {
                history.push('/');
            })
        }
        else {
            fetch('http://localhost:8000/entries/' + entry.id, {
                //Toggeling favorite tag to false
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ favorite: true })

            }).then(() => {
                history.push('/');
            })
        }
    }
// When deleteing past entries, their amount gets subtracted from the current days total 
// 1. only show delete button on entries that are of the current date
// 2. do it semi properly, if deleting a past entry (entry that doesnt have the current date)
//    dont subtract from the total
// 3. do it properly, everyting in option 2 but subtract the amount its total in the json db


    return (
        <div className="entry-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {entry && (
                <article>

                    <div className= "basicInfo">

                    <h2>{entry.title}   {entry.favorite == true ? '♥' : ''}  </h2>
                    <h4> {entry.date.substring(0, 10)} </h4>
                    <p>{entry.mealType}  </p>
                    <p> Servings: {entry.servings}  </p> 
                    <p> Servings Consumed: {entry.servingsConsumed}</p>
                    <div>{entry.body}</div>

                    <button onClick={handelClick}>delete</button>
                    <button onClick={handelClickFavoriteToggle}>Toggle Favorite</button>

                    </div>
                    <div className="micronutrients">
                        <h3> Micronutrient Amounts </h3>

                        <h4> Calories: {Math.round(entry.totalCal * 100 * (entry.servingsConsumed / entry.servings)) / 100} kcal </h4>
                        <h4> Protein: {Math.round(entry.totalProtein * 100 * (entry.servingsConsumed / entry.servings)) / 100} g </h4>
                        <h4> Carbohydrates: {Math.round(entry.totalCarbs * 100 * (entry.servingsConsumed / entry.servings)) / 100} g </h4>
                        <h4> Fats: {Math.round(entry.totalFats * 100 * (entry.servingsConsumed / entry.servings)) / 100} g </h4>
                        <h4> Calcium: {Math.round(entry.totalCalcium * 100 * (entry.servingsConsumed / entry.servings)) / 100} mg </h4>
                    </div>

                </article>
            )}
        </div>
    );
}

export default EntryDetails;