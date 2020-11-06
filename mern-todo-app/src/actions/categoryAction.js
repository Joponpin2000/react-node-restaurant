import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, CATEGORY_SAVE_FAIL } from '../constants/categoryConstants';
import { getCategories, saveNewCategory } from "../api/category";


const loadCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_LIST_REQUEST
        });
        const categories = await getCategories();
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: categories
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const saveCategory = (category) => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_SAVE_REQUEST,
            payload: category
        });
        const categoryFromDatabase = await saveNewCategory(category);
        dispatch({
            type: CATEGORY_SAVE_SUCCESS,
            payload: categoryFromDatabase
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_SAVE_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export { loadCategories, saveCategory };