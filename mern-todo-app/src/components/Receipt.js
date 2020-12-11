import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getReceipt } from '../actions/paymentActions';

const Receipt = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceipt(props));
  }, [props, dispatch]);

  const userPayment = useSelector(state => state.userPayment);

  const { receipt } = userPayment;

  return (
    <div className="mt-5 pt-5">
      {
        receipt
          ?
          (
            <div className="py-5 alert alert-success">

              <button className="btn btn-success ml-5">
                <Link to='/' className="text-white">Continue Shopping</Link>
              </button>
              <div className="text-center">

                <h1>Congratulations, {receipt.fullName}</h1>
                <div>
                  <p>
                    Your payment of <b>${receipt.amount}</b> was successful
                </p>
                  <p>
                    Please keep your payment ID <b> <u> {receipt.reference} </u> </b> for
                      future reference
              </p>
                </div>
              </div>

            </div >
          )
          :
          (
            <div className="py-5 alert alert-success">

              <button className="btn btn-success ml-5">
                <Link to='/' className="text-white">Continue Shopping</Link>
              </button>
            </div>
          )

      }
    </div >
  );
};

export default Receipt;
