import React from 'react'

let Utils = {

	isDefined(name) {
   		return typeof name !== "undefined";
    },
	extend: (defaultValues, optionValues) => {
		for (let key in defaultValues) 
			if (optionValues.hasOwnProperty(key)) 
				defaultValues[key] = optionValues[key];
		return defaultValues;
	},
	colorToRGBA: (color) => {
        let cvs, ctx;
        cvs = document.createElement('canvas');
        cvs.height = 1;
        cvs.width = 1;
        ctx = cvs.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
    },
    formulateNewColor: (settings, currentVal) => {
	    let avgFill = [];
	    if (settings.startColor) var startColorCoords = Utils.colorToRGBA(settings.startColor);
		if (settings.endColor) var endColorCoords = Utils.colorToRGBA(settings.endColor);

	    for (let i = 0; i < 3; i++) {
	        let diff = Math.round((startColorCoords[i] - endColorCoords[i]) / settings.count);
	        let newValue = startColorCoords[i] + (diff * (currentVal + 1));
	        if (newValue / 256)
	            avgFill[i] = (startColorCoords[i] - (diff * (currentVal + 1))) % 256;
	        else
	            avgFill[i] = (startColorCoords[i] + (diff * (currentVal + 1))) % 256;
	    }
	    return "rgba(" + avgFill[0] + "," + avgFill[1] + "," + avgFill[2] + "," + settings.opacity + ")";
	},
	workOutPrecision: (precision, num) => {
		let multiplactiveInverse = 1/precision;

		return Math.round(num*multiplactiveInverse)/multiplactiveInverse;
	}
}

export default Utils;