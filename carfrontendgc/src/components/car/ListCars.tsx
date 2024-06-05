import React, { useEffect, useState } from 'react';
import CarService from "../../service/CarService";
import { isAuthenticated } from "../../service/authService"; // Import the isAuthenticated function
import { Car } from "../../Types";
import { Typography, List, ListItem, ListItemText, Paper, Button, Grid, Box, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";

const ListCars: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [page, setPage] = useState<number>(1);
    const [horsepowers, setHorsepowers] = useState<number[]>([]);
    const [selectedHorsepower, setSelectedHorsepower] = useState<number | null>(0);
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = () => {
            const authStatus = isAuthenticated();
            console.log("Auth status:", authStatus);
            setIsAuthenticatedUser(!!authStatus);
        };

        checkAuthStatus();
    }, []);

    useEffect(() => {
        if (isAuthenticatedUser) {
            const fetchCars = async () => {
                try {
                    const carData = await CarService.getCars(page);
                    console.log("Fetched cars:", carData); 
                    setCars(carData.results);
                } catch (error: any) {
                    console.error('Error fetching cars:', error.message);
                }
            };

            const fetchHorsepowers = async () => {
                try {
                    const hpData = await CarService.getHorsepowers();
                    console.log("Fetched horsepowers:", hpData);
                    setHorsepowers(hpData);
                } catch (error: any) {
                    console.error('Error fetching horsepower values:', error.message);
                }
            };

            fetchCars();
            fetchHorsepowers();
        }
    }, [isAuthenticatedUser, page]);

    useEffect(() => {
        if (isAuthenticatedUser) {
            const fetchCarsByHorsepower = async () => {
                try {
                    const carData = await CarService.getCarsByHorsepower(selectedHorsepower ?? 0);
                    console.log("Fetched cars by horsepower:", carData);
                    setCars(carData);
                } catch (error: any) {
                    console.error('Error fetching cars:', error.message);
                }
            };
            fetchCarsByHorsepower();
        }
    }, [isAuthenticatedUser, selectedHorsepower]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleCarClick = (car: Car) => {
        navigate(`/car/${car.id}`);
    };

    const handleAddCar = () => {
        navigate('/addcar');
    }

    const handleUpdateButton = (car: Car) => {
        navigate(`/updatecar/${car.id}`, { state: { carData: car } });
    };

    const handleDeleteButton = (car: Car) => {
        navigate(`/deletecar/${car.id}`, { state: { carData: car } });
    };

    const handleHorsepowerChange = (event: number) => {
        const newValue = event as number;
        setSelectedHorsepower(newValue);
    };

    const handleChart = () => {
        navigate('/carchart');
    };

    if (!isAuthenticatedUser) {
        return (
            <div>
                <Typography variant="h6" color="error">
                    You need to be logged in to view this content.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/login')}>
                    Login
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>List of Cars</Typography>
            <Button variant="contained" onClick={handleAddCar}>Add Car</Button>
            <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</Button>
            <Button variant="contained" onClick={handleNextPage}>Next Page</Button>
            <Button variant="contained" onClick={handleChart}>Car Chart</Button>
            <Box display="inline-block" marginLeft={2}>
                <Select
                    value={selectedHorsepower}
                    onChange={(event) => handleHorsepowerChange(event.target.value as number)}
                >
                    <MenuItem value={0}>All Horsepowers</MenuItem>
                    {horsepowers.map((hp) => (
                        <MenuItem key={hp} value={hp}>{`${hp} HP`}</MenuItem>
                    ))}
                </Select>
                {selectedHorsepower !== null && (
                    <Typography variant="body2" color="textSecondary">
                        Selected Horsepower: {selectedHorsepower} HP
                    </Typography>
                )}
            </Box>
            <Paper elevation={3} style={{ marginTop: '20px' }}>
                <List>
                    {cars.map((car) => (
                        <Grid container key={car.id}>
                            <Grid item xs={8} onClick={() => handleCarClick(car)}>
                                <ListItem button>
                                    <ListItemText
                                        primary={car.name}
                                        secondary={`Horsepower: ${car.horsepower}HP - Color: ${car.color} - Year: ${car.year} - Country: ${car.country}`}
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="flex-end" alignItems="center" paddingRight={2}>
                                    <Button variant="outlined" onClick={() => handleUpdateButton(car)}>Update</Button>
                                    <Button variant="outlined" onClick={() => handleDeleteButton(car)}>Delete</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default ListCars;
