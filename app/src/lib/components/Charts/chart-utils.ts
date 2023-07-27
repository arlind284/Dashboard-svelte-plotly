export const extractColumnToList = ( sampleResponse: (string | number)[][], columni: number ) => {
	const result = [];
	for (let i = columni; i < sampleResponse.length; i++) {
		result.push(sampleResponse[i][columni]);
	}
	return result;
}