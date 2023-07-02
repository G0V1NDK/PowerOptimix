import React, { useEffect, useState } from "react";
import axios from "axios";

const Output = ()=>{
    const[initalData, setIntialData] = useState([]);

    useEffect(()=>{
        const getData = async(data)=>{
            try{
                const value = await axios.get(`http://localhost:3000`, data);
                console.log("backend");
                console.log(value.data);
                setIntialData(value.data);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    },[]);
    

    return (
        <div>
            <div className="text-output">
                {initalData}
            </div>
        </div>
    )
}

export default Output;