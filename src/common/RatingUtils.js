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

		for (let idx = 0; idx < settings.count; idx++) {
			let grads = $$.getElementById(propsId + '_grad' + idx);
			document.getElementById(propsId).replaceChild(
				React.findDOMNode(document.getElementById(propsId + '_grad' + (idx))),
				RatingUtils.showNormalRating(React.findDOMNode(document.getElementById(propsId + '_grad' + idx)), settings));
		}

		let singleValue = (settings.max - settings.min) / settings.count;
        rating = (rating - settings.min) / singleValue;
        var fillColor = settings.startColor;

        if (settings.reverse) {
        	for (let idx = 0; idx < rating; idx++) {
        		let j = settings.count - 1 - idx;
        		let grad = $$.getElementById(propsId + '_grad' + (j));
		    	
		    	if (grad !== null) {
		    		grad.getElementsByTagName('stop')[0].setAttribute('offset', '100%');
			    	grad.getElementsByTagName('stop')[0].setAttribute("stop-color", fillColor);
			    	if (parseInt(rating) !== rating) {
			    		let k = Math.ceil(settings.count - rating) - 1;
			    		let grad = $$.getElementById(propsId + '_grad' + k);
			    		grad.getElementsByTagName('stop')[0].setAttribute('offset', 100 - (rating * 10 % 10) * 10 + '%');
			    		grad.getElementsByTagName('stop')[0].setAttribute("stop-color", settings.backgroundColor);
			    		grad.getElementsByTagName('stop')[1].setAttribute('offset', 100 - (rating * 10 % 10) * 10 + '%');
			    		grad.getElementsByTagName('stop')[1].setAttribute("stop-color", fillColor);
			    	}
			    	if (utils.isDefined(endColorCoords)) {
			            fillColor = utils.formulateNewColor(settings, idx);
			        }
		    	}
        	}
        } else {

		    for (let idx = 0; idx < rating; idx++) {
		    	let grad = $$.getElementById(propsId + '_grad' + (idx));

		    	if (grad !== null) {
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
		}
	},
	formStyles(settings, idx) {
		let divStyles = [];
		let styles = settings.horizontal ? divStyles.push('display:inline-block;margin-right:' + settings.shapeGap + ';') : 
						divStyles.push('display:block;margin-bottom:' + settings.shapeGap + ';');
		let swh = 'scaleX(' + (1 + settings.widthGrowth * idx) + ')';

		styles = settings.widthGrowth ? divStyles.push('transform: ' + swh + ';-webkit-transform: '+ swh +
			';-moz-transform: '+ swh + ';-o-transform: '+ swh + ';-ms-transform: '+ swh + ';'):null;
		swh = 'scaleY(' + (1 + settings.heightGrowth * idx) + ')';
		styles = settings.heightGrowth ? divStyles.push('transform: ' + swh + ';-webkit-transform: '+ swh +
			';-moz-transform: '+ swh + ';-o-transform: '+ swh + ';-ms-transform: '+ swh + ';'):null;

		return divStyles;
	},
	onEnterOrClickEvent($$, propsId, settings, ith, event, update=false) {
		if (settings.readOnly) return;

		let svg = $$.getElementsByTagName('svg')[ith];
		let partial = 0;

		if (settings.horizontal) {
			partial = (event.pageX - svg.offsetLeft) / svg.width.baseVal.value;
		} else {
			partial = (event.pageY - svg.offsetTop) / svg.height.baseVal.value;
		}

		let count = (settings.max - settings.min) / settings.count;
		partial = (settings.reverse) ? partial : 1 - partial;

        let rating = ((settings.reverse ? (settings.max - settings.min - ith) : ith+1) - partial) * count;
        rating = settings.min + Number(utils.workOutPrecision(settings.precision, rating));	

        if (rating < settings.minSelected) rating = settings.minSelected;
        if (rating <= settings.max && rating >= settings.min) {
            	
            RatingUtils.showRating($$, propsId, settings, rating);
        	if (update) settings.rating = rating;
        
        }
	}

}


export default RatingUtils