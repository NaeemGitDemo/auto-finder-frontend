import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'
import NavBar from './components/NavBar'
import Home from './components/Home'
import CarDetails from './components/CarDetails'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout';
import Profile from './components/User/Profile';
import Dashboard from './components/Dashboard'
import AddMake from './components/Admin/AddMake';
import UpdateMake from './components/Admin/UpdateMake';
import UpdateModel from './components/Admin/UpdateModel';
import AddModel from './components/Admin/AddModel';
import UpdateCar from './components/Admin/UpdateCar'
import { giveToken } from './services/loginService'
import Header from './test'
import './App.css';
import AddCar from './components/Admin/AddCar';
import UploadCarPic from './components/Admin/UploadCarPic';
import Password from './components/User/Password';
import AddUserCar from './components/User/AddUserCar'



class App extends React.Component {
  state = {
    user: ''
  }

  componentDidMount() {
    try {
      //const token = giveToken()
      const user = decode(giveToken())
      this.setState({ user })
    } catch (error) {

    }
  }

  render() {

    return (
      <BrowserRouter>
        <NavBar user={this.state.user} />
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          <Route exact path='/test' component={Header} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/home/:id' component={CarDetails} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/register/:id' component={Register} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/profile' render={(props) => { return <Profile {...props} user={this.state.user} /> }} />
          <Route exact path='/dashboard/addmake/:id' component={AddMake} />
          <Route exact path='/dashboard/updatemake' component={UpdateMake} />
          <Route exact path='/dashboard/addmodel/:id' component={AddModel} />
          <Route exact path='/dashboard/updatemodel' component={UpdateModel} />
          <Route exact path='/dashboard/addcar/:id' component={AddCar} />
          <Route exact path='/dashboard/updatecar' component={UpdateCar} />
          <Route exact path='/dashboard/carpic/:id' component={UploadCarPic} />
          <Route exact path='/password/:id' component={Password} />
          <Route exact path='/user/addcar/:id' component={AddUserCar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
