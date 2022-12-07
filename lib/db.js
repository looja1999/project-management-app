import { MongoClient } from 'mongodb'; 

export async function connectDb() { 
  const client = await MongoClient.connect("mongodb+srv://looja:9808724068Loo!@upm.4m2adw2.mongodb.net/unidb?retryWrites=true&w=majority");
  
  return client 
}

