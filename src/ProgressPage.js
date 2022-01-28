import React from "react";
import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useFetch from './useFetch';



function ProgressPage() {

    const dateOne = new Date()
    let date = dateOne.toString().substring(0, 10);

    const idPart1 = date.replace(" ", "-");
    let dateid = idPart1.replace(" ", "-");
      

      const [calories, setCalories] = useState();
      const [protein, setProtein] = useState();
      const [carbohydrates, setCarbohydrates] = useState();
      const [fats, setFats] = useState();
      const [calcium, setCalcium] = useState();

      const [globalPercent, setGlobalPercent ] = useState();
      const [caloriePercent, setCaloriePercent ] = useState();
      const [proteinPercent, setProteinPercent ] = useState();
      const [carbohydratePercent, setCarbohydratePercent ] = useState();
      const [fatsPercent, setFatsPercent ] = useState();
      const [calciumPercent, setCalciumPercent ] = useState();




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

        // fetch  fetch('http://localhost:8000/todaysTotals/' + dateid) 
        // fetch profile values
        // do calculation 
        // 1. possible do fetch profile values first then do calculation 
        // of percent inside setGlobalPercent
        // 2. Get rid of global percent completely fetch both data from profile and 
        // todays totals seperatly and then do calculation as in the profile page
        
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
                setCaloriePercent(data.caloriePercent);
                setProteinPercent(data.proteinPercent);
                setCarbohydratePercent(data.carbohydratePercent);
                setFatsPercent(data.fatsPercent);
                setCalciumPercent(data.calciumPercent);
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