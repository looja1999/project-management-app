import NextAuth, { NextAuthOptions} from 'next-auth'; 
import { connectDb } from '../../../lib/db';  
import { verifyPassword } from '../../../lib/auth'; 
import Providers from 'next-auth/providers'

export default NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
   Providers.Credentials({
    async authorize(credentials){
      const client = await connectDb(); 

      const usersCollection = client.db().collection("users");

      const user = await usersCollection.findOne({
        email: credentials.email, 
      }); 

      if(!user){
        throw new Error("No user found")
      };

      const verifiedPassword = await verifyPassword(credentials.password, user.password);

      if(!verifiedPassword){
        throw new Error("Password does not match"); 
      }

      client.close(); 

      return {
        email: user.email
      }
      
    }
   })
  ] 
}); 