
export interface FarmerDetails {
  farmers_name: string;
   farmer_location: string;
   phone_number: string; 
    farmer_id: number;
    sensor_id:number 
  }

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
