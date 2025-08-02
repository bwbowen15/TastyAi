import { useRef } from "react";

const Chat = () => {
    const recipeRef = useRef();
    const restrictionsRef = useRef();
    const goalsRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = recipeRef.current.value;
        const restrictions = restrictionsRef.current.value;
        const goals = goalsRef.current.value;

        console.log(recipe);
        console.log(restrictions);
        console.log(goals);
    }
    return(
        <>
            <h1>Chat</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>
                        Goals: <input type="text" ref={goalsRef}/>
                    </label>
                </div>
                <div>
                    <label>
                        Restrictions: <input type="text" ref={restrictionsRef}/>
                    </label>
                </div>
                <div>
                    <label>
                        Input instructions here:
                        <textarea ref={recipeRef} required/>
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            
        </>
    );
}

export default Chat;