import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL } from '../constants/productConstants';
import { delProduct, fetchProductdetails, fetchProducts, saveNewProduct } from "../api/product";


const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });
        const products = await fetchProducts();

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: products
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
            payload: productId
        });
        const product = await fetchProductdetails(productId);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const saveProduct = (productData) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_SAVE_REQUEST,
            payload: productData
        });
        if (productData.id) {
            // const product = await updateProduct(productData.id);
            // dispatch({
            //     type: PRODUCT_SAVE_SUCCESS,
            //     payload: product
            // })
        } else {
            const product = await saveNewProduct(productData);
            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: product
            })
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_SAVE_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
            payload: productId
        });
        const product = await delProduct(productId);
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export { listProducts, detailsProduct, saveProduct, deleteProduct };