export interface IBaseRepository<T> {

    // CRUD operations
    create(item: T): Promise<T>; // Ensured full item for creation
    update(id: number | string, item: Partial<T>): Promise<T>;
    delete(id: number | string): Promise<void>;
    findOne(id: number | string): Promise<T | null>; // Allow null for non-existent items
    findAll?(): Promise<T[]>;
  
    // Filtering and searching
    findByCondition?(condition: Partial<T>): Promise<T[]>; // Find multiple based on conditions
  
    // Removal ?(alternative to delete for complex scenarios)
    remove?(item: T): Promise<void>; // Remove by object instance
  
    // Bulk operations ?(optional)
    saveMany?(items: T[]): Promise<T[]>; // Create or update multiple items efficiently
    createMany?(items: T[]): Promise<T[]>; // Create multiple items in a single transaction

    //FIXME: 
    // paginate?(options: PaginateOptions): Promise<PaginatedResult<T>>; // Paginate results with options
    // findByCursor?(cursor: string, limit?: number): Promise<CursorPaginatedResult<T>>; // Fetch results using a cursor-based approach
  
    // Counting and existence checks
    count?(condition?: Partial<T>): Promise<number>; // Count items matching a condition
    exists?(id: number | string): Promise<boolean>; // Check if an item with the given ID exists
  
    // Aggregations and statistics
    sum?(field: string): Promise<number>; // Calculate the sum of a numeric field
    average?(field: string): Promise<number>; // Calculate the average of a numeric field
    min?(field: string): Promise<T[keyof T] | null>; // Find the minimum value of a field
    max?(field: string): Promise<T[keyof T] | null>; // Find the maximum value of a field
  
    // Transaction management
    beginTransaction?(): Promise<void>; // Start a transaction
    commitTransaction?(): Promise<void>; // Commit a transaction
    rollbackTransaction?(): Promise<void>; // Rollback a transaction
  
  }
  