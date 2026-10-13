/**
 * Resolves static asset paths with Next.js basePath support for GitHub Pages
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  
  // Return absolute URLs, external links, or data URIs directly
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("//")
  ) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // If already prefixed with basePath, don't duplicate
  if (basePath && normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}
