import { Request, Response, NextFunction } from "express";
import { eTag, lastModified } from "../config";

class HeaderSetter {
  setHeader = (req: Request, res: Response, next: NextFunction) => {
    // Set cache headers
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("ETag", eTag);
    res.setHeader("Last-Modified", lastModified);

    // Set security headers
    res.set(
      "Content-Security-Policy",
      "default-src 'none'; base-uri 'self'; connect-src 'self' cloudflareinsights.com; font-src 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self'; script-src 'self' static.cloudflareinsights.com; style-src 'self'; manifest-src 'self'; object-src 'none'; upgrade-insecure-requests;"
    );
    res.set("X-Content-Type-Options", "nosniff");
    res.set("X-Frame-Options", "deny");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.set(
      "Permissions-Policy",
      "accelerometer=(),autoplay=(),camera=(),fullscreen=(self),geolocation=(),gyroscope=(),midi=(),microphone=(),magnetometer=(),payment=(),xr-spatial-tracking=()"
    );
    res.set("X-XSS-Protection", "0");
    res.set("Cross-Origin-Resource-Policy", "same-origin");
    res.set("Cross-Origin-Opener-Policy", "same-origin");
    res.set("Cross-Origin-Embedder-Policy", "require-corp");
    res.set("X-Permitted-Cross-Domain-Policies", "none");
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    next();
  };
}

export const headerSetter = new HeaderSetter();
