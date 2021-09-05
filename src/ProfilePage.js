import { useState } from "react";

const ProfilePage = () => {

         // Nutritionix request
        const nutritionix = require("nutritionix-api");

       
        const APP_ID   = '4f8d3652'; // Your APP ID
        const API_KEY  = '65fc845830a41cc8dd76825821b4ac38'; // Your KEY
        const SearchPhrase = '1 cup flour';
        
        nutritionix.init(APP_ID,API_KEY);
        
        nutritionix.natural.search(SearchPhrase).then(result => {
            console.log(result);
        });

    // Profile Page
        const [name, setName] = useState('');
        const [calories, setCalories] = useState('0');
        const [protein, setProtein] = useState('0');
        const [carbohydrates, setCarbohydrates] = useState('0');
        const [fats, setFats] = useState('0');
        const [calcium, setCalcium] = useState('0');

        return (  
            <div className="profile">
            <h2> { name } </h2>
            <form> 
                <label>Name:</label>
                <input 
                    type ="text"
                    required
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
                 <label>Calories:</label>
                <input 
                    type ="text"
                    required
                    value = {calories}
                    onChange = {(e) => setCalories(e.target.value)}
                />
                <label>Protein:</label>
                <input 
                    type ="text"
                    required
                    value = {protein}
                    onChange = {(e) => setProtein(e.target.value)}
                />
                <label>Carbohydrates:</label>
                <input 
                    type ="text"
                    required
                    value = {carbohydrates}
                    onChange = {(e) => setCarbohydrates(e.target.value)}
                />
                <label>Fats:</label>
                <input 
                    type ="text"
                    required
                    value = {fats}
                    onChange = {(e) => setFats(e.target.value)}
                />
                <label>Calcium:</label>
                <input 
                    type ="text"
                    required
                    value = {calcium}
                    onChange = {(e) => setCalcium(e.target.value)}
                />
            
            {/*
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Loading...</button>}

            */}


            </form>
            
            <p> { calories }</p>
            <p> { protein }</p>
            <p> { carbohydrates }</p>
            <p> { fats }</p>
            <p> { calcium }</p>
        </div>
            
        );
}
 
export default ProfilePage;