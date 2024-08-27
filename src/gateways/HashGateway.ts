export interface HashGateway {
  hash(password: string): Promise<string>;
}  
  