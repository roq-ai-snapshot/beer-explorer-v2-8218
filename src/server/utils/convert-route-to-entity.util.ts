const mapping: Record<string, string> = {
  accounts: 'account',
  beers: 'beer',
  locations: 'location',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
