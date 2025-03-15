import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Context } from './Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, handleKeyPress } = useContext(Context);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    const toggleListening = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        console.log("Recognized:", transcript);

        setInput(transcript);
        onSent(transcript);
        setIsListening(false);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
    };

    const speakResponse = () => {
        if (!resultData) return;
        stopSpeaking();
        const speech = new SpeechSynthesisUtterance();
        speech.text = resultData.replace(/<\/?[^>]+(>|$)/g, "");
        speech.lang = "en-US";
        speech.rate = 1;
        speech.volume = 1;
        speech.pitch = 1;

        speech.onstart = () => setIsSpeaking(true);
        speech.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(speech);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini Clone</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev..</span></p>
                            <p>How I can Help you today!!!</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => onSent("Suggest some beautiful places for a road trip.")}> 
                                <p>Suggest some beautiful places for a road trip.</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Plan a 7-day trip to Italy with a focus on food and culture.")}> 
                                <p>Plan a 7-day trip to Italy with a focus on food and culture.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card hide" onClick={() => onSent("Help me create an itinerary for a solo backpacking trip through Southeast Asia.")}> 
                                <p>Help me create an itinerary for a solo backpacking trip through Southeast Asia.</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                            <div className="card hide" onClick={() => onSent("Suggest 5 easy and quick dinner recipes for busy weeknights.")}> 
                                <p>Suggest 5 easy and quick dinner recipes for busy weeknights.</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                        </div>
                        <br />
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <>
                                    {!isSpeaking ? (
                                        <button onClick={speakResponse} className="speak-btn">🔊 Listen</button>
                                    ) : (
                                        <button onClick={stopSpeaking} className="stop-btn">🛑 Stop</button>
                                    )}
                                </>
                            )}
                            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>

                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            type="text"
                            value={input}
                            placeholder='Enter the prompt here'
                        />
                        <div className='flex gap-2'>
                            {/* <img src={assets.gallery_icon} alt="" /> */}
                            <img 
                                src={isListening ? assets.stop_icon : assets.mic_icon} 
                                onClick={toggleListening} 
                                className="mic-btn" 
                                alt={isListening ? "Stop Listening" : "Voice Input"} 
                            />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="page-bottom text-center text-gray-500">
                        Gemini may provide inaccurate information, so double-check your facts.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
