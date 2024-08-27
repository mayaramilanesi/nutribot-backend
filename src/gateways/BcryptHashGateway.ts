import { HashGateway } from "./HashGateway";
import bcrypt from "bcrypt";
  
export class BcryptHashGateway implements HashGateway {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}