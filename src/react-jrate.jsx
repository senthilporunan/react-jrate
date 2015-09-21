
import React from 'react'
import RatingConstants from '../lib/constants/RatingConstants.js'
import Utils from '../lib/common/Utils.js'
import Shape from '../lib/common/Shape.js'
import RatingUtils from '../lib/common/RatingUtils.js'

var settings = {};
export default class ReactRating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			destroy: false
		}
		this.settings = Utils.extend(RatingConstants, this.props.settings);
		this.drawShape = this.drawShape.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		let settings = this.settings;
		for (let idx = 0; idx < this.settings.count; idx++) {
			document.getElementById(this.props.id).replaceChild(
				React.findDOMNode(document.getElementById(this.props.id + '_grad' + (idx))),
				RatingUtils.showNormalRating(React.findDOMNode(document.getElementById(this.props.id + '_grad' + (idx))), settings));
		}

		RatingUtils.showRating(document, this.props.id, settings);
	}

	componentDidUpdate() {
		console.log('Inside componentDidUpdate11');
	}

	drawShape() {
		let shape = [];
		for (let idx = 0; idx < this.settings.count; idx++) {
			shape.push(<Shape settings={this.settings} id={this.props.id} idx={idx} 
				style={RatingUtils.formStyles(this.settings, idx)}/>);	
		}
	
		return shape;
	}

	render() {
		console.log('render()');
		var styles = {
			whiteSpace: 'nowrap',
			cursor: 'pointer'
		};

		return (<div style={styles}>{this.drawShape()}
						
				</div>
			);
	}
}