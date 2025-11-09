
import type { NextRequest } from 'next/server';
import { fetchProducts } from './actions';

export default async function loader(request: NextRequest) {
  const initial = await fetchProducts({ page: 1, limit: 12, shuffle: true });

  const url = request.nextUrl;
  url.searchParams.set('initialProducts', JSON.stringify(initial));
  return Response.redirect(url);
}
