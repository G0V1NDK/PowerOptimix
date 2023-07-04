const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

let finaldata=[];
router.use(cors());

router.post("/send", async (req, res) => {
  console.log(req.body);
  const EnteredContent=req.body.appliances;
  // console.log(EnteredContent[0].name);
  const EnteredBillamt=req.body.bill_amt;

  const content = `
  Personalized Home Energy Advisor Recommendations:
  
  Energy bills: ${EnteredBillamt} in Rupees 
  Appliance_Information: ${JSON.stringify(EnteredContent)}
  Strictly Assume these variable and act accordingly in the entire prompt:
    saved_money = ${(EnteredBillamt * 3.14 / 10).toFixed(2)}
    appliance_name = appliance[index].name
    appliance_age = appliance[index].age in years
    appliance_powerConsumption = appliance[index].powerConsumption in watt
    appliance_usagePerDay = appliance[index].usagePerDay in hours

  User preferences=> Priority: Cost savings

    For the Appliance_Information iterate through a whole array of object and generates the suggestion according to their object -> appliance_name, appliance_age, appliance_powerConsumption, appliance_usagePerDay for each index.

    Please provide personalized recommendations for reducing energy usage and increasing efficiency based on the given information.

    Give all recommendations in 'energy_saving_tips' according to the 'Appliance_Information'.

    Output should be only in json format and should strictly follow the following json structure and it is indented for indian citizens
    {
      recommendations: {
        energy_saving_tips: [
          "Recommendation 1",
          "Recommendation 2"
        ],
        appliance_upgrade_suggestions: [
          "Suggested upgrade or replacement for Appliance 1",
          "Suggested upgrade or replacement for Appliance 2"
        ],
        estimated_cost_savings: "By implementing these recommendations, you can potentially save [saved_money] in rupees per [specific time period]."
      }
    }

  `;
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content }],
  });
  
  const receivedResponseString = chatCompletion.data.choices[0].message.content;
  
  const receivedResponseJSON = JSON.parse(receivedResponseString);
  
  finaldata={
    energy_saving_tips: receivedResponseJSON.recommendations.energy_saving_tips,
    appliance_upgrade_suggestions: receivedResponseJSON.recommendations.appliance_upgrade_suggestions,
    estimated_cost_savings: receivedResponseJSON.recommendations.estimated_cost_savings
  }

  console.log("FinalData at Post")
  console.log(finaldata);
  res.redirect('/getInfo');
// res.redirect('/se');
});

router.get("/getInfo", async (req, res) => {

  try{
    // const myData = await finaldata;
    console.log("GetInfo")
    console.log(finaldata);
    return res.status(200).json(finaldata);
  }catch(err){
    console.log("backend getInfo");
    return res.status(500).json(err.message);
  }
//  res.send(finaldata);
//  finaldata=[];
});

module.exports = router;

