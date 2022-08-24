import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import createToken from '../interfaces/jwtInterface';

export default class JwtService {
  createToken = (data: createToken) => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(data, secret);
    return token;
  };

  validateToken = (token: string): jwt.JwtPayload => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const validation = jwt.verify(token, secret);
    return validation as jwt.JwtPayload;
  };
}
