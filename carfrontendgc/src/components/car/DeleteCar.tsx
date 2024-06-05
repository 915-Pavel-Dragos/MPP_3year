import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';
import CarService from "../../service/CarService";


const DeleteCar: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const car = state ? state.carData : null;

    const handleDeleteCar = async () => {
        try {
            if (car) {
                await CarService.deleteCar(car.id);
                navigate('/');
            }
        } catch (error: any) {
            console.error('Error deleting car:', error.message);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Delete Car</Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>ID: {car.id}</Typography>
                <Typography variant="body1" gutterBottom>Name: {car.name}</Typography>
                <Typography variant="body1" gutterBottom><strong>Horsepower: </strong> {car.horsepower}HP</Typography>
                <Typography variant="body1" gutterBottom><strong>Color: </strong> {car.color}</Typography>
                <Typography variant="body1" gutterBottom><strong>Year: </strong> {car.year}</Typography>
                <Typography variant="body1" gutterBottom><strong>Country: </strong> {car.country}</Typography>
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="body1">Are you sure you want to delete this car?</Typography>
                    <Button variant="contained" color="error" style={{ marginRight: '10px' }} onClick={handleDeleteCar}>Yes</Button>
                    <Button variant="contained" onClick={() => navigate(`/`)}>No</Button>
                </div>
            </Paper>
        </div>
    );
};

export default DeleteCar;
