export interface DAO {

    // TODO: maybe put some variables here

    // hightly subject to change because of the alias but all interfaces should check
    // to see if that item is already in the database
    doesExists(alias:string): Promise<void>;

    errorMessage(warning:string, error:string): string;

}