import * as jwt from 'jsonwebtoken';
import createToken from '../interfaces/jwtInterface';

export default class JwtService {
  createToken = (data: createToken) => {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(data, secret);
    return token;
  };
}
