import axios from "axios";

export const getData = async(response)=>{
    try{
        // const value = await axios.get(`http://localhost:3000/getInfo`);

        const res = await response;
        console.log("getData");
        console.log(res.estimated_cost_savings);

        return res;
        // setIntialData(value.data);
    }catch(err){
        console.log(err);
    }
}

