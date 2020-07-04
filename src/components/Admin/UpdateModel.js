import React from 'react'
import { getModels, deleteModel } from '../../services/modelService'
import { Link } from 'react-router-dom'



class UpdateModel extends React.Component {
    state = {
        models: [],
        errMsg: '',
        className: 'alert alert-success',
    }


    componentDidMount = async () => {
        const models = await getModels()
        this.setState({ models })
    }
    handleDelete = async (id) => {
        try {
            let models = this.state.models.filter(model => {
                return model._id !== id
            })
            this.setState({ models, errMsg: 'Model Deleted', className: 'alert alert-success' })
            await deleteModel(id)
        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger' })
        }
    }
    render() {
        return (
            <div className='container'>
                <ul className="list-group">
                    {this.state.errMsg &&
                        <div className={this.state.className} role="alert">
                            {this.state.errMsg}
                        </div>}
                    {this.state.models &&
                        this.state.models.map(make => {
                            return <li className="list-group-item" key={make._id}>
                                <div className="row">
                                    <div className="col-8">
                                        {make.name}
                                    </div>
                                    <div className="col">
                                        <Link className='btn btn-warning' to={`/dashboard/carpic/${make._id}`}>Image</Link>
                                    </div>
                                    <div className="col">
                                        <Link className='btn btn-info' to={`/dashboard/addmodel/${make._id}`}>Update</Link>
                                    </div>
                                    <div className="col">
                                        <button
                                            className='btn btn-danger'
                                            onClick={(e) => this.handleDelete(make._id)}
                                        >Delete</button>
                                    </div>
                                </div>

                            </li>

                        })

                    }
                </ul>
            </div>
        )
    }
}

export default UpdateModel