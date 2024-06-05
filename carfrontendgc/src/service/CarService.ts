import axios from 'axios';
import {Car} from "../Types";


const CarService = {
    getAllCars: async () => {
        try {
            const response = await axios.get("https://simon123.pythonanywhere.com//cars/");
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch cars from the server.');
        }
    },

    getCars: async (page: number = 1, pageSize: number = 10) => {
        try {
            const response = await axios.get("https://simon123.pythonanywhere.com//cars/", {
                params: {
                    page: page,
                    page_size: pageSize,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch cars from the server.');
        }
    },

    getCarById: async (id: number) => {
        try {
            const response = await axios.get(`https://simon123.pythonanywhere.com//cars/${id}/`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching car data');
        }
    },

    addCar: async (carData: Omit<Car, 'id'>) => {
        try {
            const response = await axios.post(`https://simon123.pythonanywhere.com//cars/`, carData);
            return response.data as Car;
        } catch (error) {
            throw new Error('Unable to add car to the server.');
        }
    },

    deleteCar: async (carId: number) => {
        try {
            const response = await axios.delete(`https://simon123.pythonanywhere.com//cars/${carId}/`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to delete car from the server.');
        }
    },

    updateCar: async (carData: Car) => {
        try {
            const response = await axios.put<Car>(`https://simon123.pythonanywhere.com//cars/${carData.id}/`, carData);
            return response.data;
        } catch (error) {
            throw new Error('Unable to update car on the server.');
        }
    },

    getHorsepowers: async () => {
        try {
            const response = await axios.get<number[]>(`https://simon123.pythonanywhere.com//horsepowers/`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch horsepower values from the server.');
        }
    },

    async getCarsByHorsepower(horsepower: number) {
        try {
            const response = await axios.get(`https://simon123.pythonanywhere.com//cars/horsepower/${horsepower}/`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch cars by horsepower from the server.');
        }
    },
};

export default CarService;
