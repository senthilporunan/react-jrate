
import React from 'react'
import ReactRating from '../lib/react-jrate.js'

var newSettings = {
	width: 70,
	height: 70, 
	shape: 'BASKET'
};

var id = document.getElementById('jrate');
setTimeout(function() {
	
//	React.render(<ReactRating settings={newSettings} id="jrate"/>,document.getElementById('jrate'));

	React.render(<ReactRating settings={newSettings} id="jrate"/>,document.getElementById('jrate'));
}, 2000);