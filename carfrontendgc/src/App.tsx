import React from 'react';
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CarDetails from "./components/car/CarDetails";
import ListCars from "./components/car/ListCars";
import AddCar from "./components/car/AddCar";
import UpdateCar from "./components/car/UpdateCar";
import DeleteCar from "./components/car/DeleteCar";
import CarChart from "./components/car/CarChart";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ListCars />} />
                    <Route path="/car/:id" element={<CarDetails />} />
                    <Route path="/addcar" element={<AddCar />} />
                    <Route path="/updatecar/:id" element={<UpdateCar />} />
                    <Route path="/deletecar/:id" element={<DeleteCar />} />
                    <Route path="/carchart" element={<CarChart />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
