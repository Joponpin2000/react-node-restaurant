import { fetchProductdetails } from "../api/product";
import { setCookie } from '../helpers/cookies';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const product = await fetchProductdetails(productId);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                productId: product._id,
                productName: product.productName,
                productImage: product.productImage,
                productPrice: product.productPrice,
                productQty: product.productQty,
                qty
            }
        })

        const { cart: { cartItems } } = getState();
        setCookie("cartItems", JSON.stringify(cartItems));
    }
    catch (error) {

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    })

    const { cart: { cartItems } } = getState();
    setCookie("cartItems", JSON.stringify(cartItems));

}

const saveShipping = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING,
        payload: data
    })
}

const savePayment = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT,
        payload: data
    })
}

export { addToCart, removeFromCart, saveShipping, savePayment };