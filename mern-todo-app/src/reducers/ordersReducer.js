import { ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, ORDERS_LIST_FAIL, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST } from '../constants/ordersConstants';

function ordersListReducer(state = { orders: [] }, action) {

    switch (action.type) {
        case ORDERS_LIST_REQUEST:
            return {
                loading: true,
                orders: []
            };

        case ORDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case ORDERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

function orderDeleteReducer(state = { order: {} }, action) {

    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return {
                loading: true
            };

        case ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case ORDER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export { ordersListReducer, orderDeleteReducer };