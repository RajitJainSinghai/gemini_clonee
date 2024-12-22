import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Context } from './Context'

const Main = () => {
     const {onSent, recentPrompt, showResult,loading, resultData, setInput, input}
 = useContext(Context);

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini Clone</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

{!showResult ?
<>
    <div className="greet">
                <p><span>Hello, Dev..</span></p>
                <p>How I can Help you today!!!</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest some beautifull places to see an upcoming road trips.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
            
                <div className="card">
                    <p>Lorem ipsum dolor sit, amet consectetur - Urban Planning.</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
            
                <div className="card">
                    <p>Lorem ipsum dolor sit, amet consectetur - road trips.</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            
                <div className="card">
                    <p>Lorem ipsum dolor sit, amet consectetur - Information Given.</p>
                    <img src={assets.message_icon} alt="" />
                </div>
            </div>
    <br /> </> : 
    <div className='result'>
        <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? <div className='loader'>
                <hr />
                <hr />
                <hr />
            </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
            
        </div>
    </div>
}


            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => {setInput(e.target.value)}} type="text" value={input}placeholder='Enter the prompt here'/>
                    <div className='flex gap-2'>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />

                     {input ?<img onClick={() => {onSent()}} src={assets.send_icon} alt="" />:null}   
                    </div>
                </div>
                <p className="page-bottom text-center text-gray-500">gemini will provide the inaccurate information, so double check your information.</p>
            </div>
        </div>
    </div>
  )
}

export default Main