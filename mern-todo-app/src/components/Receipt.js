import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getReceipt } from '../actions/paymentActions';
import { showLoading } from '../helpers/loading';

const Receipt = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceipt(props));
  }, [props, dispatch]);

  const receipt = useSelector(state => state.userPayment);

  return (
    <div className="mt-5 pt-5">
      {
        !receipt.user
          ?
          (
            <div className="text-center my-5"> { showLoading()}</div>
          )
          :
          (
            <div className="my-5 py-5">

              <button className="btn btn-secondary ml-5">
                <Link to='/'>Back Home</Link>
              </button>
              <div className="text-center">

                <h1>Congratulations {userPayment.receipt.fullName}</h1>
                <div>
                  <p>
                    Your payment of ${userPayment.receipt.amount} was successful
                </p>
                  <p>
                    Please keep your payment ID {userPayment.receipt.reference} for
                      future reference
              </p>
                </div>
              </div>

            </div >
          )
      }
    </div >
  );
};

export default Receipt;
