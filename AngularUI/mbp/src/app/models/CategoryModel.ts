export interface CategoryModel {
  uniqueId?: number;
  name: string;
  description?: string;
  allocatedAmount?: number;
  parentId?: number;
  createdDate?: string | null;
  lastUpdatedDate?: string | null;
  userId?: number;
  appUser?: any; // You can strongly type this if needed
  subCategories?: SubCategoryWrapper | null;
}

export interface SubCategoryWrapper {
  $id: string;
  $values: CategoryModel[];
}
