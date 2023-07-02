const express = require("express");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

router.get("/", async (req, res) => {
  const content = `
    Personalized Home Energy Advisor Recommendations:

    Energy bills:
    Monthly energy bill for January 2023: 600 kWh
    Monthly energy bill for February 2023: 550 kWh
    Monthly energy bill for March 2023: 700 kWh

    Appliance information:

    Refrigerator:
    Make: ABC Appliances
    Model: XYZ123
    Age: 5 years
    Average daily usage: 8 hours

    Air conditioner:
    Make: CoolTech
    Model: AC456
    Age: 3 years
    Average daily usage: 4 hours

    Washing machine:
    Make: CleanLaundry
    Model: WM789
    Age: 2 years
    Average weekly usage: 10 hours

    Home characteristics:
    Home size: 1500 square feet
    Insulation quality: Good
    Heating system: Gas furnace
    Cooling system: Central air conditioning
    Renewable energy sources: None

    User preferences:
    Priority: Cost savings

    Please provide personalized recommendations for reducing energy usage and increasing efficiency based on the given information.

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
        estimated_cost_savings: "By implementing these recommendations, you can potentially save [estimated cost savings in rupees] per [specific time period]."
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

  let energy_saving_tips = ``;
  let appliance_upgrade_suggestions = ``;
  const estimated_cost_savings = `
    <li>
      ${receivedResponseJSON.recommendations.estimated_cost_savings}
    </li>
  `;

  for (const energy_saving_tip of receivedResponseJSON.recommendations.energy_saving_tips)
  {
    energy_saving_tips = energy_saving_tips + "<li>" + energy_saving_tip + "</li>";
  }

  for (const appliance_upgrade_suggestion of receivedResponseJSON.recommendations.appliance_upgrade_suggestions)
  {
    appliance_upgrade_suggestions = appliance_upgrade_suggestions + "<li>" + appliance_upgrade_suggestion + "</li>";
  }

  const tempOutput = `
    <h2>As a Personalized Home Energy Advisor, I have analyzed your energy consumption patterns based on the information you provided. Here are my recommendations for reducing energy usage and increasing efficiency:</h2>
    <ol>
      <li>
        <h3>Energy Saving Tips</h3>
        <ul>${energy_saving_tips}</ul>
      </li>
      <li>
        <h3>Appliance Upgrade Suggestions</h3>
        <ul>${appliance_upgrade_suggestions}</ul>
      </li>
      <li>
        <h3>Estimated Cost Savings</h3>
        <ul>${estimated_cost_savings}</ul>
      </li>
    </ol>
    <h3>Please note that these recommendations are tailored to your specific situation and preferences. Feel free to reach out if you have any questions or need further assistance.</h3>
  `;

  res.send(tempOutput);
});

module.exports = router;
