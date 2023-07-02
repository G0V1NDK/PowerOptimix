import Forms from "./components/Forms";
import Output from "./components/Output";
import "./App.css";
import Navbar from "./components/Navbar";
import { Heading } from "@chakra-ui/react";
// import { color } from "framer-motion";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navbar />
      <div className="headline">
        <div className="headline-inner">
          <Heading as="h1" size="lg">
            Power Optimix: Your 
            <span style={{color: "blue"}}> AI </span>
             Guide to Efficient Energy Usage and Sustainable
            Living
          </Heading>
          {/* <p>
            Take charge of your energy consumption with Energy Saver Advisor, the ultimate tool for optimizing your energy usage. Discover personalized recommendations, track your energy usage, and save money while reducing your environmental footprint. From smart home solutions to energy-efficient appliances, our app provides valuable insights and tips to help you make informed decisions. Join the movement towards a greener future and become an energy-saving champion with Energy Saver Advisor!"
          </p> */}
        </div>
      </div>
      <div className="forms-outer">
        <div className="forms-main">
          <Forms />
        </div>
      </div>
      {/* <div className="output-outer">
        <Heading size='lg'>Your Savings Here: </Heading>
        <div className="output-main">
          <Output />
        </div>
      </div> */}
      <Footer/>
    </>
  );
}

export default App;
