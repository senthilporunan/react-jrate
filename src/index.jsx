
import React from 'react'
import ReactRating from '../lib/react-jrate.js'

var newSettings = {
	count: 5,
	shape: 'STAR',
	rating: 3.5,
	width: '70',
	height: '70',
	backgroundColor: 'green',
	strokeWidth: '5px'
};
var id = document.getElementById('jrate');
setTimeout(function() {
	
	React.render(<ReactRating settings={newSettings} id="jrate"/>,document.getElementById('jrate'));

}, 2000);