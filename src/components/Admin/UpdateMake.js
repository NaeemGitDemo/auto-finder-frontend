import React from 'react'
import { getMakes, deleteMake } from '../../services/makeService'
import { Link } from 'react-router-dom'




class UpdateMake extends React.Component {
    state = {
        makes: [],
        errMsg: '',
        className: 'alert alert-success',
        value: ''

    }

    async componentDidMount() {
        try {
            const makes = await getMakes()
            this.setState({ makes })
        } catch (error) {

        }
    }
    handleDelete = async (id) => {
        const originalMakes = { ...this.state.makes }
        try {
            const makes = this.state.makes.filter(m => {
                return m._id !== id
            })
            this.setState({ makes })
            await deleteMake(id)
            this.setState({ errMsg: 'Make Deleted', className: 'alert alert-info' })
        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger', makes: originalMakes })
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
                    {this.state.makes &&
                        this.state.makes.map(make => {
                            return <li className="list-group-item" key={make._id}>
                                <div className="row">
                                    <div className="col-8">
                                        {make.name}
                                    </div>
                                    <div className="col">
                                        <Link className='btn btn-info' to={`/dashboard/addmake/${make._id}`}>Update</Link>
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

export default UpdateMake