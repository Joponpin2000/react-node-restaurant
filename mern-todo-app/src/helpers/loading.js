import React, { Fragment } from 'react';

export const showLoading = () => (
    <Fragment>
        <div className="spinner-grow text-primary mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-dark mr-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </Fragment>
)