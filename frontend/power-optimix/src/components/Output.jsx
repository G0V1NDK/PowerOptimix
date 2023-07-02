import React, { useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../api";

const Output = ()=>{
    const[initalData, setIntialData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
               const result = await getData;
               console.log("fetchData");
               console.log(result.estimated_cost_savings);
            //    setIntialData(result);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
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