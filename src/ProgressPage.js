import React from "react";
import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useFetch from './useFetch';



function ProgressPage() {
//
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
        { bgcolor: "#ef6c00", completed: caloriePercent, name: "Calories" },
        { bgcolor: "#00695c", completed: proteinPercent, name: "Protein" },
        { bgcolor: "#24ef00", completed: carbohydratePercent, name: "Carbohydrates" },
        { bgcolor: "#ef007f", completed: fatsPercent, name: "Fats" },
        { bgcolor: "#739e2e", completed: calciumPercent, name: "Calcium" },
      ];

      return (
        <div className="ProgressPage">
          {testData.map((item, idx) => (
            <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} name={item.name} />
          ))}
        </div>
      );
}
 
export default ProgressPage;