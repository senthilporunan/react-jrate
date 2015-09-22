
import React from 'react'
import ReactRating from '../lib/react-jrate.js'

var newSettings = {
	count: 5,
	shape: 'STAR',
	rating: 13.5,
	width: '70',
	height: '70',
	backgroundColor: 'grey',
	strokeWidth: '5px',
	opacity: 1,
	min: 10,
    max: 15,
    minSelected: 12,
    onChange: function() {
    	console.log("OnChange method called");
    },
    onSet: function() {
    	console.log("OnSet method called");
    }
};
var id = document.getElementById('jrate');
setTimeout(function() {
	
	React.render(<ReactRating settings={newSettings} id="jrate"/>,document.getElementById('jrate'));

}, 2000);