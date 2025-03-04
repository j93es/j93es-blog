import { Request, Response, NextFunction } from "express";
import { eTag, lastmod } from "../config";

class HeaderSetter {
  setHeader = (req: Request, res: Response, next: NextFunction) => {
    // Set cache headers
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("ETag", eTag);
    res.setHeader("Last-Modified", lastmod);

    // Set security headers
    const cspValue = [
      "default-src 'none'",
      "base-uri 'self'",
      "connect-src 'self' cloudflareinsights.com",
      "font-src 'self' cdnjs.cloudflare.com",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "img-src 'self'",
      "script-src 'self' static.cloudflareinsights.com",
      "style-src 'self' cdnjs.cloudflare.com",
      "manifest-src 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");
    res.setHeader("Content-Security-Policy", cspValue);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "deny");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "accelerometer=(),autoplay=(),camera=(),fullscreen=(self),geolocation=(),gyroscope=(),midi=(),microphone=(),magnetometer=(),payment=(),xr-spatial-tracking=()"
    );
    res.setHeader("X-XSS-Protection", "0");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );

    next();
  };
}

export const headerSetter = new HeaderSetter();
