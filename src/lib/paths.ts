export function url(path = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = import.meta.env.PUBLIC_ASSET_BASE as string | undefined;
  return base ? `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}` : url(path);
}
