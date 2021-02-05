import React, { useState, useEffect, Fragment } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';
import { loadCategories, saveCategory } from '../actions/categoryAction';
import { loadOrders, deleteOrder } from '../actions/ordersAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = (props) => {


    const [showCatModal, setShowCatModal] = useState(false);
    const [showProdModal, setShowProdModal] = useState(false);
    const [showOrders, setShowOrders] = useState(false);

    const categoryList = useSelector(state => state.categoryList);
    const { categories } = categoryList;

    const ordersList = useSelector(state => state.ordersList);
    const { orders } = ordersList;
    const orderDelete = useSelector(state => state.orderDelete);
    const { success: successDeleteOrder } = orderDelete;

    const [category, setCategory] = useState('');
    const [id, setId] = useState('');
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQty, setProductQty] = useState('');
    const productList = useSelector(state => state.productList);
    const { products } = productList;
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const categorySave = useSelector(state => state.categorySave);
    const { loading: catLoadingSave, success: catSuccessSave, error: catErrorSave } = categorySave;
    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete } = productDelete;
    const [errorMsg, setErrorMsg] = useState(errorSave || catErrorSave);
    const [successMsg, setSuccessMsg] = useState(successSave || catSuccessSave);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCategories())
        loadCategories();

        dispatch(loadOrders())

        dispatch(listProducts())

    }, [dispatch, successDelete, successDeleteOrder, successSave, catSuccessSave]);

    const handleMessages = evt => {
        setErrorMsg('');
        setSuccessMsg('');
    };

    const handleShowCat = () => setShowCatModal(true);

    const handleShowProd = (product) => {
        setShowProdModal(true);

        if (product && product.productImage !== undefined) {

            setId(product._id);
            setProductName(product.productName);
            setProductImage(product.productImage);
            setProductDesc(product.productDesc);
            setProductPrice(product.productPrice);
            setProductCategory(product.productCategory);
            setProductQty(product.productQty);
        }
    };

    const handleShowOrders = () => setShowOrders(true);


    const handleCloseCat = () => {
        setShowCatModal(false);
        handleMessages();
    };

    const handleCloseProd = () => {
        setShowProdModal(false);
        handleMessages();
    };

    const handleCloseOrders = () => {
        setShowOrders(false);
    };

    const handleCategorySubmit = evt => {
        evt.preventDefault();

        if (isEmpty(category)) {
            setErrorMsg('Please enter a category');
        } else {
            const data = { category };

            dispatch(saveCategory(data));
        }
    };

    const handleProductImage = (evt) => {
        setProductImage(evt.target.files[0]);
        setErrorMsg('');
        setSuccessMsg('');
    };

    const deleteProdHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    const handleProductSubmit = (evt) => {
        evt.preventDefault();

        if (productImage === null) {
            setErrorMsg('Please select an image');
        }
        else if (isEmpty(productName) || isEmpty(productDesc) || isEmpty(productPrice.toString())) {
            setErrorMsg('All fields are required');
        }
        else if (isEmpty(productCategory)) {
            setErrorMsg('Please select a category');
        }
        else if (isEmpty(productQty.toString())) {
            setErrorMsg('Please select a quantity');
        }
        else {
            let formData = new FormData();
            formData.append("productId", id);
            formData.append("productImage", productImage);
            formData.append("productName", productName);
            formData.append("productDesc", productDesc);
            formData.append("productPrice", productPrice.toString());
            formData.append("productCategory", productCategory);
            formData.append("productQty", productQty.toString());

            // const formData = ({
            //     id,
            //     productImage, productName, productDesc, productPrice, productCategory, productQty,
            // })
            dispatch(saveProduct(formData))
        }
    }


    const showHeader = () => (
        <div className="bg-dark text-white pt-5 pb-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>
                            <FontAwesomeIcon icon={faHome} />{' '} Dashboard
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );

    const showActionButtons = () => (
        <div className="bg-light my-2">
            <div className="container">
                <div className="row pb-3">
                    <div className="col-md-4 my-1">
                        <Button variant="outline-info" className="btn-block" onClick={handleShowCat}>
                            <FontAwesomeIcon icon={faPlus} /> {' '}Add Category
                        </Button>
                    </div>
                    <div className="col-md-4 my-1">
                        <Button variant="outline-warning" className="btn-block" onClick={handleShowProd}>
                            <FontAwesomeIcon icon={faPlus} /> {' '} Add Food
                        </Button>
                    </div>
                    <div className="col-md-4 my-1">
                        <Button variant="outline-success" className="btn-block" onClick={handleShowOrders}>
                            <FontAwesomeIcon icon={faMoneyCheckAlt} /> {' '} View Orders
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )

    const showCategoryModal = () => (
        <Modal show={showCatModal} onHide={handleCloseCat} >
            <form onSubmit={handleCategorySubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(errorMsg || catErrorSave || errorSave) && showErrorMsg(errorMsg || catErrorSave || errorSave)}
                    {(successMsg || catSuccessSave || successSave) && showSuccessMsg("Successful")}
                    {(loadingSave || catLoadingSave) ? (
                        <div className="text-center">{showLoading()}</div>
                    ) : (
                            <Fragment>
                                <label className="text-secondary">Category</label>
                                <input type="text" className="form-control" name="category" onChange={(e) => {
                                    setCategory(e.target.value);
                                    setErrorMsg('');
                                    setSuccessMsg('');
                                }} />
                            </Fragment>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseCat}>Close</Button>
                    <Button type="submit">Submit</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )

    const showFoodModal = () => (
        <Modal show={showProdModal} onHide={handleCloseProd}>
            <form onSubmit={handleProductSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorSave && showErrorMsg(errorSave)}
                    {successSave && showSuccessMsg("Successful")}
                    {(loadingSave || catLoadingSave) ? (
                        <div className="text-center">{showLoading()}</div>
                    ) : (
                            <Fragment>
                                <div className="custom-file mb-2">
                                    <input type="file" name="productImage" className="custom-file-input" onChange={handleProductImage} />
                                    <label className="custom-file-label">Choose File</label>
                                </div>
                                <div className="form-group">
                                    <label className="text-secondary">Name</label>
                                    <input type="text" name="productName" value={productName} onChange={(e) => {
                                        setProductName(e.target.value);
                                        setErrorMsg('');
                                        setSuccessMsg('');
                                    }} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="text-secondary">Description</label>
                                    <textarea rows="3" name="productDesc" value={productDesc} onChange={(e) => {
                                        setProductDesc(e.target.value);
                                        setErrorMsg('');
                                        setSuccessMsg('');
                                    }} className="form-control"></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="text-secondary">Price</label>
                                    <input type="text" name="productPrice" value={productPrice} onChange={(e) => {
                                        setProductPrice(e.target.value);
                                        setErrorMsg('');
                                        setSuccessMsg('');
                                    }} className="form-control" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="text-secondary">Category</label>
                                        <select className="custom-select mr-sm-2" name="productCategory" value={productCategory} onChange={(e) => {
                                            setProductCategory(e.target.value);
                                            setErrorMsg('');
                                            setSuccessMsg('');
                                        }} >
                                            <option value="">Choose one...</option>
                                            {categories && categories.map(c => (
                                                <option key={c._id} value={c._id}>{c.category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="text-secondary">Quantity</label>
                                        <input type="number" name="productQty" value={productQty} onChange={(e) => {
                                            setProductQty(e.target.value);
                                            setErrorMsg('');
                                            setSuccessMsg('');
                                        }} className="form-control" min="0" max="1000" />
                                    </div>
                                </div>
                            </Fragment>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseProd}>Close</Button>
                    <Button type="submit">{id ? "Update" : "Submit"}</Button>
                </Modal.Footer>
            </form>
        </Modal>

    )

    const showOrdersModal = () => (
        <Modal show={showOrders} onHide={handleCloseOrders} centered dialogClassName="orders-modal" className="orders-modal">
            <Modal.Header closeButton>
                <Modal.Title>Orders</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Fragment>

                    <Table striped bordered hover responsive>
                        <thead><tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Reference</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {orders ? orders.map((order, i) => (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{order.fullName}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.reference}</td>
                                    <td>{order.createdAt}</td>
                                    <td>
                                        <Button variant="warning">Edit</Button>
                                        {' '}
                                        <Button variant="danger" onClick={() => deleteOrderHandler(order._id)}>Delete</Button>
                                    </td>
                                </tr>
                            )) : <div></div>}
                        </tbody>
                    </Table>
                </Fragment>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseOrders}>Close</Button>
            </Modal.Footer>
        </Modal >
    )

    const showProductsList = () => (
        <Fragment>
            <h3>Products</h3>
            <Table striped bordered hover responsive>
                <thead><tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>No. In Stock</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{product.productName}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productQty}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowProd(product)}>Edit</Button>
                                {' '}
                                <Button variant="danger" onClick={() => deleteProdHandler(product)} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    );

    return (
        <section>
            {showHeader()}
            {showActionButtons()}
            {showCategoryModal()}
            {showFoodModal()}
            {showOrdersModal()}
            {showProductsList()}
        </section>
    );
};

export default AdminDashboard;