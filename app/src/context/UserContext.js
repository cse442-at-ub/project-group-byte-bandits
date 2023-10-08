import { createContext } from "react";


export const UserContext = createContext({
  setID: () => {throw new Error("Can't use userContext here.")}, 
  id: null,
});



