import passport from 'passport';
import { prisma } from '../config/prisma';
import googleStrategy from '../strategies/auth/google.strategy';
import discordStrategy from '../strategies/auth/discord.strategy';
import localStrategy from '../strategies/auth/local.strategy';
import googleServiceStrategy from '../strategies/services/google.service.strategy';
import discordServiceStrategy from '../strategies/services/discord.service.strategy';
import spotifyServiceStrategy from '../strategies/services/spotify.service.strategy';
import twitterServiceStrategy from '../strategies/services/twitter.service.strategy';
import facebookServiceStrategy from '../strategies/services/facebook.service.strategy';

passport.use('google', googleStrategy);
passport.use('discord', discordStrategy);
passport.use('local', localStrategy);

passport.use('google-link', googleServiceStrategy);
passport.use('discord-link', discordServiceStrategy);
passport.use('spotify-link', spotifyServiceStrategy);
passport.use('twitter-link', twitterServiceStrategy);
passport.use('facebook-link', facebookServiceStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
