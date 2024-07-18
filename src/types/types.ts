import { TSVehicle } from "../drizzle/schema";

export interface VehicleSpecifications {
    fuelType: string;
    transmission: string;
    color: string;
    seatingCapacity: number;
    features: string;
}

export interface FleetManagement {
    status: string;
}

export interface ExtendedTSVehicle extends TSVehicle {
    specifications: VehicleSpecifications;
    fleetManagement: FleetManagement;
}
