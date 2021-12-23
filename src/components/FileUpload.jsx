import React from 'react';

const FileUpload = ({ inputFileRef, onClick, onChange }) => {
	return (
		<input
			type="file"
			name="image-upload-input"
			id="image-upload-input"
			onChange={onChange}
			accept=".ttf, .otf, .woff"
			ref={inputFileRef}
			onClick={onClick}
		/>
	);
};

export default FileUpload;
