import {
  // for home page  
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
  // for single product page
  
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/productConstants";
  



  
  // reducer for getting all product ??
  export const productReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        // for home page 
        case ALL_PRODUCT_REQUEST:
          return {
             loading:true,
             product:[],
          };
    
    
          case ALL_PRODUCT_SUCCESS:
            return {
               loading:false,
               product:action.payload.products,
               productsCount : action.payload.productsCount,
            };
    
            case ALL_PRODUCT_FAIL:
              return {
                 loading:false,
                 error : action.payload,
              };
              case CLEAR_ERRORS:
                return {
                  ...state,
                  error: null,
                };
              default:
                return state;
    }
  };
  // reducer for fetching details of single product page
  export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
    
      // requesting for the product details
      case PRODUCT_DETAILS_REQUESTS:
        return {
          loading: true,
          ...state,
        };
      // when get the product details
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
      // when error while fetching the product details
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      // clear all the errors
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };