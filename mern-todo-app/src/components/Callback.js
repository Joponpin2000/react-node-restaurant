import React, { useEffect } from 'react';
import { verify } from '../api/payment';
import { showLoading } from '../helpers/loading';

function Callback(props) {

    useEffect(() => {
        const reference = props.location.search.split("reference=")[1];

        verify(reference)
            .then((url) => {
                window.location.replace(url);
            });
    }, [props.location.search]);

    return (
        <div className="mt-5 pt-5">
            <div className="text-center mx-5 my-5" > {showLoading()}</div>
        </div>
    )
}

export default Callback;
