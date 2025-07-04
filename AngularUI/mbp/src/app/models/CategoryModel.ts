export interface CategoryModel {
    id?: number; // Optional for now, you can generate it later or receive it from API
    name: string;
    description?: string;
    allocatedAmount: number;
    parentId?: number; // Assuming ParentId is the ID of another category
  }
  