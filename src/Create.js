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
        const entry ={ title, body, mealType};

        setisPending(true);

        fetch('http://localhost:8000/entries', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry)
        }).then(() => {
            console.log('New entry added');
            setisPending(false);
            history.push('/');

        })

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