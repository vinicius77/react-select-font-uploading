import React, { useState, useEffect, useRef } from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';
import { fontOptions } from '../docs/data';
import { loadFontPreview, fontFileReader } from '../utils/utils';
import FileUpload from './FileUpload';
import OptionsList from './OptionsList';

const colourStyles = {
	control: (styles) => ({ ...styles, backgroundColor: 'white' }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color);
		const fontFamily = data.value;
		return {
			...styles,
			fontFamily,
			backgroundColor: isDisabled
				? null
				: isSelected
				? data.color
				: isFocused
				? color.alpha(0.1).css()
				: null,
			color: isDisabled
				? '#ccc'
				: isSelected
				? chroma.contrast(color, 'white') > 2
					? 'white'
					: 'black'
				: data.color,
			cursor: isDisabled ? 'not-allowed' : 'default',

			':active': {
				...styles[':active'],
				backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
			},
		};
	},
	input: (styles) => styles,
	placeholder: (styles) => styles,
	singleValue: (styles) => styles,
};

const Dropdown = () => {
	const [defValue, setDefValue] = useState({
		value: 'Select',
		label: 'Select',
	});
	const [options, setOptions] = useState([]);
	const [font, setFont] = useState({});
	const inputFileRef = useRef();

	const reset = () => {
		inputFileRef.current.value = '';
	};

	const handleSelectFont = (e) => {
		const font = e.target.files[0];
		const fontName = font.name.split('.')[0];

		fontFileReader(font, (src) => {
			setFont({
				label: fontName,
				value: fontName,
				color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
				servedSrc: src,
			});

			const { value, servedSrc } = font;
			loadFontPreview(value, servedSrc);
		});
	};

	useEffect(() => {
		let timeOut;
		if (font) {
			setOptions([...options, font]);
			setDefValue(font);
			timeOut = setTimeout(() => {
				reset();
			}, 2000);
		}
		return () => clearInterval(timeOut);
	}, [font]);

	useEffect(() => {
		if (fontOptions.length) {
			setOptions(fontOptions);
		}
	}, []);

	return (
		<div>
			<h2>React Select + Font File Upload</h2>
			<Select
				value={options.filter((option) => option.value === defValue.value)}
				label="Single Font"
				//onChange={(e) => setDefValue(e)}
				options={options}
				styles={colourStyles}
			/>
			{options && <OptionsList options={options} onClick={setDefValue} />}
			<FileUpload onChange={handleSelectFont} inputFileRef={inputFileRef} onClick={reset} />
		</div>
	);
};

export default Dropdown;
