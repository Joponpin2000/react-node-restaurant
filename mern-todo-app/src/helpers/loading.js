import React, { Fragment } from 'react';

export const showLoading = () => (
    <Fragment>
        <div className="text-center text-secondary">
            <div className="spinner-border spinner-border-lg" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </Fragment>
)