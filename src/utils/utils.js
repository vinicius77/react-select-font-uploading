// creates a new font face family and adds it to the document fonts
export const loadFontPreview = async (title, servedSrc) => {
	const fontFace = new FontFace(title, `url(${servedSrc})`);
	await fontFace.load();
	document.fonts.add(fontFace);
};

// reads the font file and creates its source
export const fontFileReader = (font, cb = null) => {
	const fileReader = new FileReader();
	fileReader.readAsDataURL(font);
	fileReader.onload = () => {
		if (cb) {
			return cb(fileReader.result);
		}
	};
};
