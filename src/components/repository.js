import React from 'react';

class Repositories extends React.Component {

	render() {
		return (
			<div className="card"> 
				<div className="card-body">
					<a href={this.props.repo.html_url} target="_blank" rel="noopener noreferrer">{this.props.repo.name}</a>
					{this.props.repo.fork &&
					<button type="submit" className="btn btn-forked">Forked</button>}
					<div className="description">{this.props.repo.description}</div>
				</div>
				<div className="stars">
					<p>Stars:</p>
					<h4>{this.props.repo.stargazers_count}</h4>
				</div>
				<div className="license">
					<p>License:</p>
					<h4>{!!this.props.repo.license ? this.props.repo.license.name : '-'}</h4>
				</div>
			</div>
		)};
}

export default Repositories;