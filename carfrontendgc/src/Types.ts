export interface Car {
    id: number;
    name: string;
    horsepower: number;
    color: string;
    year: number;
    country: string;
}

export interface Incident {
    id?: number;
    car: number;
    description: string;
    date: string;
    location: string;
}
