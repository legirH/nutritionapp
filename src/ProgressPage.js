import React from "react";
import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useFetch from './useFetch';



function ProgressPage() {

      // Nutritionix request
      /*
      const nutritionix = require("nutritionix-api");
        
      const APP_ID   = '4f8d3652'; // Your APP ID
      const API_KEY  = '65fc845830a41cc8dd76825821b4ac38'; // Your KEY
      const SearchPhrase = '1 cup flour';
      
      nutritionix.init(APP_ID,API_KEY);
      
      nutritionix.natural.search(SearchPhrase).then(result => {
          console.log(result);
          
      });
      */

      const [calories, setCalories] = useState();
      const [protein, setProtein] = useState();
      const [carbohydrates, setCarbohydrates] = useState();
      const [fats, setFats] = useState();
      const [calcium, setCalcium] = useState();

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


      var currentCalories = 400;
      var goalCalories = calories;
      var caloriePercent = (currentCalories / goalCalories) * 100;

      var currentProtein = 60;
      var goalProtein = protein;
      var proteinPercent = (currentProtein / goalProtein ) * 100;

      var currentCarbohydrates = 250;
      var goalCarbohydrates = carbohydrates;
      var carbohydratePercent = (currentCarbohydrates / goalCarbohydrates ) * 100;

      var currentFats = 24;
      var goalFats = fats;
      var fatsPercent = (currentFats / goalFats ) * 100;

      var currentCalcium = 16;
      var goalCalcium = calcium;
      var calciumPercent = ( currentCalcium / goalCalcium ) * 100;

      var globalPercent = (caloriePercent + proteinPercent + carbohydratePercent + fatsPercent + calciumPercent) / 5 ;

      const testData = [
        { bgcolor: "#6a1b9a", completed: globalPercent },
        { bgcolor: "#6a1b9a", completed: caloriePercent },
        { bgcolor: "#00695c", completed: proteinPercent },
        { bgcolor: "#ef6c00", completed: carbohydratePercent },
        { bgcolor: "#ef6c00", completed: fatsPercent },
        { bgcolor: "#ef6c00", completed: calciumPercent },
      ];

      return (
        <div className="ProgressPage">
          {testData.map((item, idx) => (
            <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
          ))}
        </div>
      );
}
 
export default ProgressPage;