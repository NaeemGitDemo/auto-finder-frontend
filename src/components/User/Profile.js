import React from 'react'
import { getUser } from '../../services/userService'
import { getCarsDetails } from '../../services/carDetailsService'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'



const imageBaseURL = 'https://autofinder-car-images.s3.us-east-2.amazonaws.com/'
class Profile extends React.Component {
    state = {
        user: [],
        cars: []
    }

    componentDidMount = async () => {
        const res = await getUser()
        const cars = await getCarsDetails()
        this.setState({ user: res.data, cars })

    }
    filterCarsByUserId = () => {
        const userId = this.state.user._id
        return this.state.cars.filter(car => {
            return car.userId === userId
        })

    }

    render() {
        const carList = this.filterCarsByUserId()
        return (
            <div className='container'>
                <div className="alert alert-info" role="alert">
                    <h3 className='ml-4'>Welcome {(this.props.user.name)}...!!!</h3>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="card mb-3" >
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">My Profile</h4>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={imageBaseURL + this.state.user._id} className="card-img m-1" alt="profileImg" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{this.state.user.name}</h5>
                                                <p className="card-text">{this.state.user.email}</p>
                                                <p className="card-text"><small className="text-muted">User Since :{<Moment format="YYYY/MM/DD">{this.state.user.date}</Moment>}</small></p>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row ">
                                                <div className="col">
                                                    <Link className='btn btn-outline-info btn-sm m-1' to={`/dashboard/carpic/${this.state.user._id}`}>Add Image</Link>
                                                </div>
                                                <div className="col">
                                                    <Link className='btn btn-outline-primary btn-sm m-1' to={`/register/${this.state.user._id}`} > Edit Profile</Link>
                                                </div>
                                                <div className="col">
                                                    <Link className='btn btn-outline-warning btn-sm m-1' to={`/password/${this.state.user._id}`} >Change Password</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">Manage Cars</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title"
                                        >Cars {carList.length ? -carList.length : null}

                                            <small className="text-muted"></small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Add New Cars- Update or Delete Exisiting Cars</li>
                                        </ul>
                                        <Link type="button" className="btn btn-lg  btn-outline-primary m-2" to={`/user/addcar/:id?user=${this.state.user.name}&id=${this.state.user._id}`}>Add New</Link>
                                        <Link type="button" className="btn btn-lg  btn-outline-info" to='/dashboard/updatecar'>Update / Delete</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="alert alert-info" role="alert">
                    {(carList === '') && <p>Posted Cars Will Appear Here...Post New Ad Now!</p>}
                    <div className="row row-cols-1 row-cols-md-3" >
                        {
                            carList.map(car => {
                                return <div className="col mb-4" key={car._id}>
                                    <div className="card">
                                        <img src={imageBaseURL + car._id} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{car.model.make.name} - {car.model.name}</h5>
                                            <p className="card-text">-Year: {car.year} </p>
                                            <p className="card-text">-Price: ${car.price}</p>
                                            <p className="card-text">-Mileage: {car.milage}</p>
                                            <p className="card-text">-Color: {car.color}</p>
                                            <p className="card-text"> - Body Type: ${car.bodyType}</p>
                                            <p className="card-text"> - Transmission: {car.transmission}</p>
                                            <p className="card-text"> - Drive Type: {car.driveType}</p>
                                            <p className="card-text"> - Description: {car.description}</p>

                                        </div>
                                    </div>
                                </div>


                            })

                        }
                    </div>

                </div>




            </div>
        )
    }
}

export default Profile