import React, { useState } from "react";
import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { getData } from "../api";
import { Heading } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

const ApplianceForm = () => {
  const [intialVal, setIntialVal] = useState([]);
  let k = 0;

  const postData = async (res) => {
    try {
      console.log(`http://localhost:3000/send`);
      const response = await axios.post(`http://localhost:3000/send`, res);
      console.log("postData");
      console.log(response.data);
      getData(response.data);
      setIntialVal(response.data);
      // setSubmitting(false);
    } catch (err) {
      console.log("front post: " + err.message);
      // setSubmitting(false);
    }
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  };

  const validateAmt = (value) => {
    let error;
    if (!value) {
      error = "Amount is required";
    }
    return error;
  };

  const validateAge = (value) => {
    let error;
    if (!value) {
      error = "Age is required";
    }
    return error;
  };

  const validatePowerConsumption = (value) => {
    let error;
    if (!value) {
      error = "Please enter power consumed in watts";
    }
    return error;
  };

  const validateUsagePerDay = (value) => {
    let error;
    if (!value) {
      error = "Usage per day is required";
    }
    return error;
  };

  //   const mainValidate = ()=>{
  //     if(validateAge && validateName && validatePowerConsumption && validateUsagePerDay){
  //         console.log()
  //     }
  //   }

  return (
    <>
      <Formik
        initialValues={{
          appliances: [
            { name: "", age: "", powerConsumption: "", usagePerDay: "" },
          ],
        }}
        // onSubmit={(values, actions) => {
        //   postData({ appliances: values.appliances, bill_amt: values.bill_amt });
        //   setTimeout(() => {
        //       actions.setSubmitting(false);
        //   }, 1000);
        // }}
        onSubmit={postData}
      >
        {(props) => (
          <Form>
            <Field name="bill_amt" validate={validateAmt}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.bill_amt && form.touched.bill_amt}
                >
                  <FormLabel>Bill Amount</FormLabel>
                  <NumberInput max={50000} min={10}>
                    <NumberInputField
                      {...field}
                      placeholder="Enter Bill Amount"
                    />
                  </NumberInput>
                  <FormErrorMessage>{form.errors.bill_amt}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <FieldArray name="appliances">
              {({ push, remove }) => (
                <>
                  {props.values.appliances.map((_, index) => (
                    <div key={index}>
                      <FormControl>
                        <FormLabel>Appliance Name - {index + 1}</FormLabel>
                        <Field
                          name={`appliances.${index}.name`}
                          validate={validateName}
                        >
                          {({ field, form }) => (
                            <Input
                              {...field}
                              placeholder="Enter the name of appliance"
                            />
                          )}
                        </Field>
                        <FormErrorMessage>
                          <ErrorMessage
                            name={`appliances.${index}.name`}
                            component="div"
                          />
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Appliance Age (in Years)</FormLabel>
                        <Field
                          name={`appliances.${index}.age`}
                          validate={validateAge}
                        >
                          {({ field, form }) => (
                            <NumberInput>
                              <NumberInputField
                                {...field}
                                placeholder="Enter Appliance Age"
                              />
                            </NumberInput>
                          )}
                        </Field>
                        <FormErrorMessage>
                          <ErrorMessage
                            name={`appliances.${index}.age`}
                            component="div"
                          />
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Power Consumption (in Watts)</FormLabel>
                        <Field
                          name={`appliances.${index}.powerConsumption`}
                          validate={validatePowerConsumption}
                        >
                          {({ field, form }) => (
                            <NumberInput>
                              <NumberInputField
                                {...field}
                                placeholder="Enter Power Consumption"
                              />
                            </NumberInput>
                          )}
                        </Field>
                        <FormErrorMessage>
                          <ErrorMessage
                            name={`appliances.${index}.powerConsumption`}
                            component="div"
                          />
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Usage per Day (in hours)</FormLabel>
                        <Field
                          name={`appliances.${index}.usagePerDay`}
                          validate={validateUsagePerDay}
                        >
                          {({ field, form }) => (
                            <NumberInput>
                              <NumberInputField
                                {...field}
                                placeholder="Enter Usage per Day"
                              />
                            </NumberInput>
                          )}
                        </Field>
                        <FormErrorMessage>
                          <ErrorMessage
                            name={`appliances.${index}.usagePerDay`}
                            component="div"
                          />
                        </FormErrorMessage>
                      </FormControl>

                      {index > 0 && (
                        <Button onClick={() => remove(index)} style={{margin: "1rem 0rem 0 0"}}>Remove</Button>
                      )}
                    </div>
                  ))}
                  <Button onClick={() => push({})}>Add Appliance</Button>
                </>
              )}
            </FieldArray>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
              style={{margin: "1.5rem"}}
              // onClick={postData}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {(intialVal.length === 0) ? (
        <></>
      ) : (
        <div className="output-outer">
          <Heading size="lg">Your Savings Here: </Heading>
          <div className="output-main">
            {console.log(intialVal)}
            <Heading as="h2" size="md">
              As a Personalized Home Energy Advisor, I have analyzed your energy
              consumption patterns based on the information you provided. Here
              are my recommendations for reducing energy usage and increasing
              efficiency:
            </Heading>
            <ol>
              <li>
                <Heading as="h2" size="md">
                  Energy Saving Tips:
                </Heading>
                <ul>
                  {!intialVal.energy_saving_tips
                    ? ""
                    : intialVal.energy_saving_tips.map((idx) => <li key={k++}>{idx}</li>)}
                </ul>
              </li>
              <li>
                <Heading as="h2" size="md">
                  Appliance Upgrade Suggestions:
                </Heading>
                <ul>
                  {!intialVal.appliance_upgrade_suggestions
                    ? ""
                    : intialVal.appliance_upgrade_suggestions.map((idx) => (
                        <li key={k++}>{idx}</li>
                      ))}
                </ul>
              </li>
              <li>
                <Heading as="h2" size="md">
                  Estimated Cost Saving:
                </Heading>
                <Heading as="h3" size="sm">
                  {intialVal.estimated_cost_savings}
                </Heading>
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplianceForm;
