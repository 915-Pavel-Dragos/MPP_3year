import React, { useEffect, useState } from 'react';
import {Car} from "../../Types";
import CarService from '../../service/CarService';
import Chart from "react-google-charts";

const CarChart: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carData = await CarService.getCars(1, 100);
                setCars(carData.results);
            } catch (error: any) {
                console.error('Error fetching cars:', error.message);
            }
        };

        fetchCars();
        console.log(cars);
    }, []);

    const generateChartData = (): any[] => {
        const carData = cars.reduce((acc: { [year: string]: number }, car: Car) => {
            const year = car.year.toString();
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        const chartData = [["Car year", "Number of cars"], ["2000", 0]];
        for (const year in carData) {
            chartData.push([year, carData[year]]);
        }
        return chartData;
    };

    const data = generateChartData();

    return (
        <div>
            <h2>Car Chart by Year</h2>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
            />
        </div>
    );
};

export default CarChart;
