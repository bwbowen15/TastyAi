import { useRef, useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import './Chat.css';
import Sidebar from "../Components/Sidebar";

const Chat = () => {
    const recipeRef = useRef();
    const restrictionsRef = useRef();
    const goalsRef = useRef();
    
    const[response, setResponse] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setResponse(""); // Reset response on each submit
        
        const recipe = recipeRef.current.value;
        const restrictions = restrictionsRef.current.value;
        const goals = goalsRef.current.value;

        console.log("Form values:");
        console.log("recipe:", recipe);
        console.log("restrictions:", restrictions);
        console.log("goals:", goals);

        const data = {recipe, restrictions, goals};
        try{
            const res = await fetch("http://localhost:8080/", {
                //mode: 'no-cors',
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const json = await res.json();
            setResponse(json.reply);
        }catch(error){
            console.error("Error:", error);
        };
        
        console.log(response);
        //TODO: save resonse to sidebar, eventually this will save to user database and allow them to store their recipes.
        //Eventually when you click the recipe on the sidebar it will popup with a box that shows the recipe, along with the macros with nice logos.
    }
    return(
        <>
        <Sidebar></Sidebar>
        <div className="chat-container">
            <h1>Chat</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="goals-restrictions-container">
                    <div className="input-group">
                        <label className="input-label">
                            Goals:
                        </label>
                        <TextField id="goals-field" label="Goals(separate each goal with a comma)" variant="filled" inputRef={goalsRef} required fullWidth></TextField>
                    </div>
                    <div className="input-group">
                        <label className="input-label">
                            Restrictions:
                        </label>
                        <TextField id="restrictions-field" label="Restrictions(separate each restriction with a comma)" variant="filled" inputRef={restrictionsRef} required fullWidth></TextField>
                    </div>
                </div>
                <div className="recipe-container">
                    <div className="recipe-input-group">
                        <label className="recipe-label">
                            Input instructions here:
                        </label>
                        <TextField
                            id="outlined-basic"
                            label="Instructions- Be Specific!"
                            variant="filled"
                            multiline
                            rows={7} 
                            inputRef={recipeRef}
                            fullWidth
                            required
                            style={{ backgroundColor: '#333333', border: '1px solid #444444',borderRadius: '5px'}}/>
                    </div>
                    <Button id="submit-button" variant="contained" type="submit" >Submit</Button>
                </div>
            </form>

            <div className="response-section">
                <h2>Recipe</h2>
                <pre className="response-content">{response}</pre>
            </div>
        </div>
        </>
    );
}

export default Chat;