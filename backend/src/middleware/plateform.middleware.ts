import { RequestHandler } from 'express';

export const detectPlatform: RequestHandler = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';

  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i;
  const isTablet = /Tablet|iPad/i;
  const isDesktop = /Mozilla|Chrome|Safari|Edge|Firefox/i;

  if (isMobile.test(userAgent) || isTablet.test(userAgent)) {
    req.platform = 'mobile';
  } else if (isDesktop.test(userAgent)) {
    req.platform = 'web';
  } else {
    req.platform = 'unknown';
  }

  next();
};
