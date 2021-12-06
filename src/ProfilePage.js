import { useState, useEffect } from "react";
import { useHistory } from "react-router";


const ProfilePage = () => {  



        const [name, setName] = useState('');
        const [calories, setCalories] = useState('0');
        const [protein, setProtein] = useState('0');
        const [carbohydrates, setCarbohydrates] = useState('0');
        const [fats, setFats] = useState('0');
        const [calcium, setCalcium] = useState('0');
        const [isPending, setisPending] = useState(false);
        const history = useHistory();

        //const { data: profile, isPending: pending , error } = useFetch('http://localhost:8000/profile')

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
                    setName(data.name);
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
    
        }, []); // if nothing in the array [] then it will only run once, if you put eg name it will run only when name is changed, if no [] then will run evertime something is changed

        const handelSubmit = (e) =>{
            e.preventDefault();
            const profile ={ name, calories, protein, carbohydrates, fats, calcium};
            const totals = { globalPercent, caloriePercent, proteinPercent, carbohydratePercent, fatsPercent, calciumPercent }

    
            setisPending(true);

    
            fetch('http://localhost:8000/profile', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile)
            }).then(() => {
                console.log('Profile updated');
                setisPending(false);
                history.push('/progress');
    
            })

            fetch('http://localhost:8000/totals', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(totals)
            }).then(() => {
                console.log('Totals updated');
                setisPending(false);
                history.push('/progress');
    
            })
    
        }
        // adding up todays enties 
        

        // get and add up all the entries miconutrients together for currentABC for the current day
        //and save as a new json field, have to update each time new entry is added and day is changed
        // update when new entry is created? but add up in profile page?
        var currentCalories = 400;
        var goalCalories = calories;
        var caloriePercent = Math.round((currentCalories / goalCalories) * 100);
  
        var currentProtein = 60;
        var goalProtein = protein;
        var proteinPercent = Math.round((currentProtein / goalProtein ) * 100);
  
        var currentCarbohydrates = 150;
        var goalCarbohydrates = carbohydrates;
        var carbohydratePercent = Math.round((currentCarbohydrates / goalCarbohydrates ) * 100);
  
        var currentFats = 24;
        var goalFats = fats;
        var fatsPercent = Math.round((currentFats / goalFats ) * 100);
  
        var currentCalcium = 1000;
        var goalCalcium = calcium;
        var calciumPercent = Math.round(( currentCalcium / goalCalcium ) * 100);
  
        var globalPercent = Math.round((caloriePercent + proteinPercent + carbohydratePercent + fatsPercent + calciumPercent) / 5) ;
  

        return (  
            <div className="profile">

            <h2> &#x2665; { name } &#x2665;  </h2>
            <form onSubmit = {handelSubmit}> 
                <label>Name: </label>
                <input 
                    type ="text"
                    required
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
                 <label>Calories: kcal</label>
                <input 
                    type ="text"
                    required
                    value = {calories}
                    onChange = {(e) => setCalories(e.target.value)}
                />
                <label>Protein: g</label>
                <input 
                    type ="text"
                    required
                    value = {protein}
                    onChange = {(e) => setProtein(e.target.value)}
                />
                <label>Carbohydrates: g</label>
                <input 
                    type ="text"
                    required
                    value = {carbohydrates}
                    onChange = {(e) => setCarbohydrates(e.target.value)}
                />
                <label>Fats: g</label>
                <input 
                    type ="text"
                    required
                    value = {fats}
                    onChange = {(e) => setFats(e.target.value)}
                />
                <label>Calcium: mg</label>
                <input 
                    type ="text"
                    required
                    value = {calcium}
                    onChange = {(e) => setCalcium(e.target.value)}
                />
            
           
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Loading...</button>}

            </form>

        </div>
            
        );
}
 
export default ProfilePage;