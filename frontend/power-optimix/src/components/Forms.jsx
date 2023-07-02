import React from "react";
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

const ApplianceForm = () => {
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
      error = "Power Consumption is required";
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
    <Formik
      initialValues={{
        appliances: [
          { name: "", age: "", powerConsumption: "", usagePerDay: "" },
        ],
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
            actions.setSubmitting(false);
        //   if (Object.keys(actions.errors).length === 0) {
        //   }
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="bill_amt" validate={validateAmt}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.bill_amt && form.touched.bill_amt}>
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
                            <Input {...field} placeholder="Enter the name of appliance" />
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
                      <FormLabel>Appliance Age</FormLabel>
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
                      <FormLabel>Power Consumption</FormLabel>
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
                      <FormLabel>Usage per Day</FormLabel>
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
                      <Button onClick={() => remove(index)}>Remove</Button>
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
            // onClick={() => (props.values.appliances.length !== 4) ? alert("Please Complete the fields") : console.log(props)}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ApplianceForm;
