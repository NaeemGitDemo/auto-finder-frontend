import React from 'react'
import { getCarsDetails, deleteCarDetails } from '../../services/carDetailsService'
import { Link } from 'react-router-dom'



class UpdateCar extends React.Component {
    state = {
        carsDetails: [],
        errMsg: '',
        className: 'alert alert-success',
    }

    componentDidMount = async () => {
        const carsDetails = await getCarsDetails()
        this.setState({ carsDetails })
    }

    handleDelete = async(id) => {
        const originalCars = { ...this.state.carsDetails }
        try {
            const cars = this.state.carsDetails.filter(car => {
                return car._id !== id
            })
            await deleteCarDetails(id)
            this.setState({ carsDetails: cars, errMsg: 'Car Deleted', className: 'alert alert-info' })

        } catch (error) {
            this.setState({ errMsg: 'Something Went Wrong', carsDetails: originalCars, className: 'alert alert-danger' })
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
                    {this.state.carsDetails &&
                        this.state.carsDetails.map(car => {
                            return <li className="list-group-item" key={car._id}>
                                <div className="row">
                                    <div className="col-8">
                                        {car.model.name}-{car.year}-{car.color}-${car.price}
                                    </div>
                                    <div className="col">
                                        <Link className='btn btn-info' to={`/dashboard/addcar/${car._id}`}>Update</Link>
                                    </div>
                                    <div className="col">
                                        <button
                                            className='btn btn-danger'
                                            onClick={(e) => this.handleDelete(car._id)}
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


export default UpdateCar