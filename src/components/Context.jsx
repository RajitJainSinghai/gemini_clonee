import { createContext, useState } from "react";
import run from "./gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // ✅ Handles smooth text display word by word
    const displayTextGradually = (text) => {
        const words = text.split(" ");
        setResultData(""); // Clear previous result
        words.forEach((word, index) => {
            setTimeout(() => {
                setResultData((prev) => prev + word + " ");
            }, 50 * index);
        });
    };

    // ✅ Start a new chat (Clear results)
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
    };

    // ✅ Send prompt and update history
    const onSent = async (prompt = input) => {
        if (!prompt.trim()) return; // Prevent empty searches

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);

        // ✅ Update history (avoid duplicates)
        setPrevPrompts((prev) => (prev.includes(prompt) ? prev : [prompt, ...prev]));

        // ✅ Fetch AI response
        const response = await run(prompt);
        const formattedResponse = response
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold formatting
            .replace(/\*/g, "<br>"); // Line breaks

        displayTextGradually(formattedResponse); // Show response gradually
        setLoading(false);
        setInput(""); // Clear input field
    };

    // ✅ Trigger search when "Enter" is pressed
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSent();
        }
    };

    const contextValue = {
        prevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        handleKeyPress,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
