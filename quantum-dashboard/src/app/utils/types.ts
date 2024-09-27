export interface Farmer {
    status: string;
    farmers_name: string;
    phone_number: string;
    sensor_id: number
    farmer_location: string;
    created_at:string
    updated_at:string

  }
  
  export type FarmersList = Farmer[];
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
  }
  
  export interface FarmersTableProps {
    farmers: FarmersList;
    pagination: PaginationInfo;
  }