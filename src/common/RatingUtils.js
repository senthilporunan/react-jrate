import React from 'react'
import utils from '../../lib/common/Utils.js'

var startColorCoords, endColorCoords;

let RatingUtils = {

	showNormalRating: (grads, settings) => {

		grads.getElementsByTagName('stop')[0].setAttribute('offset', '0%');
		grads.getElementsByTagName('stop')[0].setAttribute("stop-color", settings.backgroundColor);
		grads.getElementsByTagName('stop')[1].setAttribute('offset', '0%');
		grads.getElementsByTagName('stop')[1].setAttribute("stop-color", settings.backgroundColor);

		return grads;
	},
	showRating: ($$, propsId, settings, rating=settings.rating) => {

		if (settings.startColor) startColorCoords = utils.colorToRGBA(settings.startColor);
		if (settings.endColor) endColorCoords = utils.colorToRGBA(settings.endColor);

		let singleValue = (settings.max - settings.min) / settings.count;
        rating = (rating - settings.min) / singleValue;
        var fillColor = settings.startColor;

        for (let idx = 0; idx < rating; idx++) {
        	console.log('Fill COlor: ', fillColor);
        	let grad = $$.getElementById(propsId + '_grad' + (idx));
        	console.dir(grad);
        	if (grad !== null) {
        		console.log('grad inside');
		    	grad.getElementsByTagName('stop')[0].setAttribute('offset', '100%');
		    	grad.getElementsByTagName('stop')[0].setAttribute("stop-color", fillColor);
		    	if (rating * 10 % 10 > 0) {
		    		let grad = $$.getElementById(propsId + '_grad' + (Math.ceil(rating) - 1));
		    		grad.getElementsByTagName('stop')[0].setAttribute('offset',(rating * 10 % 10) * 10 + '%');
		    		grad.getElementsByTagName('stop')[0].setAttribute("stop-color", fillColor);
		    	}
		    	if (utils.isDefined(endColorCoords)) {
		            fillColor = utils.formulateNewColor(settings, idx);
		        }
		    }
        }
	},
	formStyles(settings, idx) {
		let divStyles = [];
		let styles = settings.horizontal ? divStyles.push('display:inline-block;margin-right:' + settings.shapeGap + ';') : 
						divStyles.push('display:\'block\';margin-bottom:' + settings.shapeGap + ';');
		let swh = 'scaleX(' + (1 + settings.widthGrowth * idx) + ')';

		styles = settings.widthGrowth ? divStyles.push('transform: ' + swh + ';-webkit-transform: '+ swh +
			';-moz-transform: '+ swh + ';-o-transform: '+ swh + ';-ms-transform: '+ swh + ';'):null;
		swh = 'scaleY(' + (1 + settings.heightGrowth * idx) + ')';
		styles = settings.heightGrowth ? divStyles.push('transform: ' + swh + ';-webkit-transform: '+ swh +
			';-moz-transform: '+ swh + ';-o-transform: '+ swh + ';-ms-transform: '+ swh + ';'):null;

		return divStyles;
	},
	onEnterOrClickEvent($$, propsId, settings, ith, update=false) {
		console.log('Inside onclick122');
		if (settings.readOnly) return;

		let partial = 0;
		let count = (settings.max - settings.min) / settings.count;
        let rating = ((settings.reverse ? (settings.max - settings.min - ith + 1) : ith) - partial) * count;
        rating = settings.min + Number(utils.workOutPrecision(settings.precision, rating));	

        console.log('propsId: ', propsId);
        if (rating < settings.minSelected) rating = settings.minSelected;
            if (rating <= settings.max && rating >= settings.min) {
            	console.log("Rating: ", rating);
                RatingUtils.showRating($$, propsId, settings, rating);
            if (update) settings.rating = rating;
        }
	}

}


export default RatingUtils