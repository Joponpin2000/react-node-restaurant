import { ORDERS_LIST_REQUEST, ORDERS_LIST_FAIL, ORDERS_LIST_SUCCESS, ORDER_DELETE_SUCCESS, ORDER_DELETE_REQUEST, ORDER_DELETE_FAIL } from '../constants/ordersConstants';
import { delOrder, getOrders } from "../api/orders";


const loadOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ORDERS_LIST_REQUEST
        });
        const orders = await getOrders();
        dispatch({
            type: ORDERS_LIST_SUCCESS,
            payload: orders
        })
    } catch (error) {
        dispatch({
            type: ORDERS_LIST_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DELETE_REQUEST,
            payload: id
        });
        const order = await delOrder(id);
        dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export { loadOrders, deleteOrder };