import { redirect } from '@sveltejs/kit';
const protectedRoutes = [ '/', '/status', '/performance' ];
export const handle = async ({ event, request, resolve }) => {
	const token = event.cookies.get('access_token');
	console.log( 'test')
	if ( token || !protectedRoutes.includes( event.url.pathname ) ) {
		return resolve(event);
	}
	if( !token || protectedRoutes.includes( event.url.pathname ) ) {
		throw redirect( 303, '/login');
	}
	return resolve(event);
};