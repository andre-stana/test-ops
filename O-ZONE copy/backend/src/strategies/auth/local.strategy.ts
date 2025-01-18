import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '@prisma/client';

dotenv.config();

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const isUser: User | null = await prisma.user.findUnique({ where: { email } });
    if (!isUser) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const user: User = isUser;
    if (!user.password) {
      return done(null, false, { message: 'No password set.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
})

export default localStrategy;
