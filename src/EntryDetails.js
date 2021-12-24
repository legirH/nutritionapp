import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";


const EntryDetails = () => {
    const { id } = useParams();
    const { data: entry, error, isPending } = useFetch('http://localhost:8000/entries/' + id);
    
    const history = useHistory();


    const handelClick = () => {
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