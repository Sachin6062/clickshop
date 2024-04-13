import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../Reducer/FilterReducer";
import { type } from "@testing-library/user-event/dist/type";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: false,
  sorting_value: "lowest",
  filters:{
     text: "",
     category: "all",
     company: "all",
     color : "all",
     maxPrice: 0,
     price: 0,
     minPrice: 0,
  },


};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function (for sorting)
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue  });
  };

  // update the filter value(for filtering not for sorting )
  const updateFilterValue = (event) =>{
      // console.log(event.target.value);
   let name = event.target.name;
   let value = event.target.value; 
   return dispatch({type :"UPDATE_FILTERS_VALUE",payload:{name, value}});
  }

  // to clear the filters
const clearFilters = () => {
  dispatch({type: "CLEAR_FILTERS"});
}  
  // to sort the product(for sorting and filter bcoz useeefect need)
  useEffect(() => {
    dispatch({type:"FILTER_PRODUCTS"});
     dispatch({ type: "SORTING_PRODUCTS"});
  }, [products, state.sorting_value, state.filters]);



  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting, updateFilterValue ,clearFilters  }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
