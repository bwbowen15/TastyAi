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
            const res = await fetch("https://tastyai-205d7f0474f5.herokuapp.com//chat", {
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
                            label="Instructions(be specific, if you do not give enough details it will not generate a recipe)"
                            variant="filled"
                            multiline
                            rows={7} 
                            inputRef={recipeRef}
                            fullWidth
                            required
                        />
                    </div>
                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </form>

            <div className="response-section">
                <h2>Response</h2>
                <pre className="response-content">{response}</pre>
            </div>
        </div>
        </>
    );
}

export default Chat;