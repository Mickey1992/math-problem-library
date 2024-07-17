export function blobToUrl(arrayBuffer: ArrayBuffer) {
	const blob = new Blob([arrayBuffer]);
	const url = URL.createObjectURL(blob);

	return url;
}
