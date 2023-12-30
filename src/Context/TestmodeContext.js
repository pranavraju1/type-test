import { createContext, useContext, useState } from "react";


const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {

  const [testTime,setTestTime] = useState(15);
  const values = {
    testTime,
    setTestTime
  }
  return(<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
  // all the components inside children will be able to access testTime and setTestTime
}

export const useTestMode = () => useContext(TestModeContext); //this is to use the values