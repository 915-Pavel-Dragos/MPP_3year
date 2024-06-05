import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarService from "../../service/CarService";
import { Typography, TextField, Button, Paper, Grid } from "@mui/material";

const AddCar: React.FC = () => {
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        name: "",
        horsepower: "",
        color: "",
        year: "",
        country: "",
    });

    const handleAddCar = async () => {
        try {
            await CarService.addCar({
                name: carData.name,
                horsepower: parseInt(carData.horsepower),
                color: carData.color,
                year: parseInt(carData.year),
                country: carData.country,
            });
            navigate("/");
        } catch (error: any) {
            console.error("Error adding car:", error.message);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Add New Car
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            data-testid="add-car"
                            value={carData.name}
                            onChange={(e) => setCarData({ ...carData, name: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Horsepower"
                            type="number"
                            data-testid="horsepowers"
                            value={carData.horsepower}
                            onChange={(e) =>
                                setCarData({ ...carData, horsepower: e.target.value })
                            }
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Color"
                            data-testid="color"
                            value={carData.color}
                            onChange={(e) =>
                                setCarData({ ...carData, color: e.target.value })
                            }
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Year"
                            type="number"
                            data-testid="year"
                            value={carData.year}
                            onChange={(e) => setCarData({ ...carData, year: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            data-testid="country"
                            value={carData.country}
                            onChange={(e) =>
                                setCarData({ ...carData, country: e.target.value })
                            }
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleAddCar}
                            data-testid="add-car-button"
                        >
                            Add Car
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default AddCar;
