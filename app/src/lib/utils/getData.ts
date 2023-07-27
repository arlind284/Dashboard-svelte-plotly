import Cookies from 'js-cookie';

const getData = async ( method = "GET", url: string, data: any ) => {
	// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjN9.PZLMJBT9OIVG2qgp9hQr685oVYFgRgWpcSPmNcw6y7M';
	const token: string | undefined = Cookies.get('access_token');

	const options: RequestInit = {
		method: method,
		headers: {
			"Content-Type": "application/json",
			// Authorization: `Bearer ${token}`
		},
		// credentials: "same-origin",
		// mode: 'cors',
		// referrerPolicy: "no-referrer"
	};

	if( token ){
		options.headers.Authorization = `Bearer ${token}`;
	}
	if( data ){
		options.body = JSON.stringify( data );
	}

	return await fetch( url, options )
  	.then(response => response.json() )
  	.then(data => {
			// console.log( 'getData', data );
			return data;
  	})
		.catch(error => {
    	console.log(error);
    	return [];
  	});
}

export default getData;