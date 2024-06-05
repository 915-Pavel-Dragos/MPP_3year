import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Typography,
    Paper,
    Button,
    Box,
    Modal,
    TextField,
} from "@mui/material";
import { Car, Incident } from "../../Types";
import CarService from "../../service/CarService";
import {
    addNewIncident,
    deleteIncident,
    getIncidents,
    updateIncident as updateIncidentRequest,
} from "../../service/IncidentService";
import { toast } from "react-toastify";

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [addIncidentModalOpen, setAddIncidentModalOpen] = useState(false);
    const [updateIncidentModalOpen, setUpdateIncidentModalOpen] = useState(false);
    const [addIncident, setAddIncident] = useState<Incident>({
        car: parseInt(id!),
        date: "",
        description: "",
        location: "",
    });
    const [updateIncident, setUpdateIncident] = useState<Incident>({
        car: parseInt(id!),
        date: "",
        description: "",
        location: "",
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const carData = await CarService.getCarById(parseInt(id ?? ""));
                const incidents = await getIncidents(parseInt(id ?? ""));
                setCar(carData);
                setIncidents(incidents);
            } catch (error: any) {
                console.error("Error fetching car:", error.message);
            }
        };

        fetchCar();
    }, [id]);

    const handleOnDelete = async (incidentId: number) => {
        try {
            await deleteIncident(incidentId);
            setIncidents(incidents.filter((i) => i.id !== incidentId));
        } catch (exception: any) {
            toast(exception.message);
        }
    };

    const openAddModal = () => {
        setAddIncident({
            car: parseInt(id!),
            date: "",
            description: "",
            location: "",
        });
        setAddIncidentModalOpen(true);
    };

    const openUpdateModal = () => {
        setUpdateIncidentModalOpen(true);
    };

    const addIncidentHandle = async () => {
        try {
            const incident: Incident = await addNewIncident(addIncident);
            setIncidents([...incidents, incident]);
            toast("Added successfully", {
                type: "success",
                position: "top-right",
            });
        } catch (error) {}
    };

    const updateIncidentHandle = async () => {
        try {
            const incident: Incident = await updateIncidentRequest(updateIncident);
            const newIncidents = incidents.map((i) =>
                i.id === incident.id ? incident : i
            );
            setIncidents(newIncidents);
            toast("Added successfully", {
                type: "success",
            });
        } catch (error) {
            toast(error as string, {
                type: "error",
            });
        }
    };

    if (!car) {
        return <Typography variant="h6">Car not found.</Typography>;
    }

    return (
        <div>
            <Modal
                open={addIncidentModalOpen}
                onClose={() => setAddIncidentModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        fullWidth
                        style={textFieldStyle}
                        label="Date YYYY-MM-DD"
                        value={addIncident?.date}
                        onChange={(e) =>
                            setAddIncident({ ...addIncident, date: e.target.value })
                        }
                        required
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        style={textFieldStyle}
                        value={addIncident?.location}
                        onChange={(e) =>
                            setAddIncident({ ...addIncident, location: e.target.value })
                        }
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        style={textFieldStyle}
                        value={addIncident?.description}
                        onChange={(e) =>
                            setAddIncident({ ...addIncident, description: e.target.value })
                        }
                        required
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            style={{ width: "100px" }}
                            variant="contained"
                            onClick={addIncidentHandle}
                            disabled={
                                addIncident.date === "" ||
                                addIncident.location === "" ||
                                addIncident.description === ""
                            }
                        >
                            Add
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={updateIncidentModalOpen}
                onClose={() => setUpdateIncidentModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        fullWidth
                        style={textFieldStyle}
                        label="Date YYYY-MM-DD"
                        value={updateIncident?.date.slice(0, 10)}
                        onChange={(e) =>
                            setUpdateIncident({ ...updateIncident, date: e.target.value })
                        }
                        required
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        style={textFieldStyle}
                        value={updateIncident?.location}
                        onChange={(e) =>
                            setUpdateIncident({ ...updateIncident, location: e.target.value })
                        }
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        style={textFieldStyle}
                        value={updateIncident?.description}
                        onChange={(e) =>
                            setUpdateIncident({
                                ...updateIncident,
                                description: e.target.value,
                            })
                        }
                        required
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            style={{ width: "100px" }}
                            variant="contained"
                            onClick={updateIncidentHandle}
                            disabled={
                                updateIncident.date === "" ||
                                updateIncident.location === "" ||
                                updateIncident.description === ""
                            }
                        >
                            Update
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Typography variant="h4" gutterBottom>
                Car Details
            </Typography>
            <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                <Typography variant="body1" gutterBottom>
                    <strong>Id: </strong> {car.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Name: </strong> {car.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Horsepower: </strong> {car.horsepower}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Color: </strong> {car.color}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Year: </strong> {car.year}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Country: </strong> {car.country}
                </Typography>
            </Paper>
            <Box style={{ margin: "10px" }}>
                <Button variant="contained" onClick={() => openAddModal()}>
                    Add Incident
                </Button>
                <Typography variant="h6" gutterBottom>
                    Incidents
                </Typography>
                {incidents.length === 0 ? (
                    <Typography variant="body1">No incidents found.</Typography>
                ) : (
                    incidents.map((incident) => (
                        <Paper
                            key={incident.id}
                            elevation={3}
                            style={{ padding: "20px", marginBottom: "20px" }}
                        >
                            <div style={{ position: "relative" }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Description: </strong> {incident.description}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Date: </strong> {incident.date.substring(0, 10)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Location: </strong> {incident.location}
                                </Typography>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        display: "flex",
                                        rowGap: "10px",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleOnDelete(incident.id!)}
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setUpdateIncident(incident);
                                            openUpdateModal();
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    ))
                )}
            </Box>
        </div>
    );
};

export default CarDetails;

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const textFieldStyle = {
    marginBottom: "10px",
};
