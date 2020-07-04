import React from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="card-deck mb-3 text-center">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Make</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Manage Make<small className="text-muted"></small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Add New Make- Update or Delete Exisiting Make</li>
                            </ul>
                            <Link type="button" className="btn btn-lg  btn-outline-primary m-2" to='/dashboard/addmake/new'>Add New</Link>
                            <Link type="button" className="btn btn-lg  btn-outline-info" to='/dashboard/updatemake'>Update / Delete</Link>
                        </div>
                    </div>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Model</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Manage Model<small className="text-muted"></small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Add New Model- Update or Delete Exisiting Model</li>
                            </ul>
                            <Link type="button" className="btn btn-lg  btn-outline-primary m-2" to='/dashboard/addmodel/new'>Add New</Link>
                            <Link type="button" className="btn btn-lg  btn-outline-info" to='/dashboard/updatemodel'>Update / Delete</Link>
                        </div>
                    </div>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Cars</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Manage Cars<small className="text-muted"></small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Add New Cars- Update or Delete Exisiting Cars</li>
                            </ul>
                            <Link type="button" className="btn btn-lg  btn-outline-primary m-2" to='/dashboard/addcar/new'>Add New</Link>
                            <Link type="button" className="btn btn-lg  btn-outline-info" to='/dashboard/updatecar'>Update / Delete</Link>
                        </div>
                    </div>
                </div>
                <div className="card-deck mb-3 text-center">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">User</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Manage Users<small className="text-muted"></small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Add New Users- Update or Delete Exisiting Users</li>
                            </ul>
                            <button type="button" className="btn btn-lg  btn-outline-primary m-2">Add New</button>
                            <button type="button" className="btn btn-lg  btn-outline-info">Update / Delete</button>
                        </div>
                    </div>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Coming...Soon</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Manage More<small className="text-muted"></small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Add New Make- Update or Delete Exisiting make</li>
                            </ul>
                            <button type="button" className="btn btn-lg  btn-outline-primary m-2">Add New</button>
                            <button type="button" className="btn btn-lg  btn-outline-info">Update / Delete</button>
                        </div>
                    </div>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Coming...Soon</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">Manage More<small className="text-muted"></small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Add New Make- Update or Delete Exisiting make</li>
                            </ul>
                            <button type="button" className="btn btn-lg  btn-outline-primary m-2">Add New</button>
                            <button type="button" className="btn btn-lg  btn-outline-info">Update / Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard