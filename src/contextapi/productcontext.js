import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/ProductReducer"
import { type } from "@testing-library/user-event/dist/type";
 
const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const intialstate = {
    isLoading:false,
    isError:false,
    products:[],
    featureProducts:[],
    isSingleLoading: false,
    singleProduct:{},
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer,intialstate);

    const getProducts = async(url)=>{
        dispatch({type: "SET_LOADING"});
      try {
         const res = await axios.get(url);
         const product = await res.data;
         dispatch({ type: "SET_API_DATA", payload: product})
      } catch (error) {
        dispatch({ type: "API_ERROR"});
      }
     };


    //  my 2nd api call for single product
    const getSingleProduct = async (url)=>{
      dispatch({type: "SET_SINGLE_LOADING"});
      try {
        const res = await axios.get(url);
        const  singleProduct = await res.data;
        dispatch({type:"SET_SINGLE_PRODUCT", payload: singleProduct})
      } catch (error) {
        dispatch({ type: "SET_SINGLE_ERROR"});
      }
    }



    useEffect(()=>{
getProducts(API)
    },[])


  return <AppContext.Provider value={{ ...state,getSingleProduct}}>{children}</AppContext.Provider>;
};

// custom hooks
const useProductContext = () =>{
    return useContext(AppContext)
}

export { AppProvider,AppContext,useProductContext };
