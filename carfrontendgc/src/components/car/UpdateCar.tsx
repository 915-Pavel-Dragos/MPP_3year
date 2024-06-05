import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CarService from "../../service/CarService";
import { Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { Car } from "../../Types";

const UpdateCar: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [carData, setCarData] = useState<Car | null>(
        state ? state.carData : null
    );

    const handleUpdateCar = async () => {
        try {
            if (carData) {
                await CarService.updateCar(carData);
                navigate("/");
            }
        } catch (error: any) {
            console.error("Error updating car:", error.message);
        }
    };

    if (!carData) {
        return <Typography variant="h6">Car not found.</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Update Car
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="ID"
                            name="id"
                            value={carData.id}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={carData.name}
                            onChange={(e) => setCarData({ ...carData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Horsepower"
                            name="horsepower"
                            type="number"
                            value={carData.horsepower}
                            onChange={(e) =>
                                setCarData({
                                    ...carData,
                                    horsepower: parseInt(e.target.value) || 0,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={carData.color}
                            onChange={(e) =>
                                setCarData({ ...carData, color: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Year"
                            name="year"
                            type="number"
                            value={carData.year}
                            onChange={(e) =>
                                setCarData({ ...carData, year: parseInt(e.target.value) })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            value={carData.country}
                            onChange={(e) =>
                                setCarData({ ...carData, country: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleUpdateCar}
                            data-testid="update-car-button"
                        >
                            Update Car
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default UpdateCar;
