import React from 'react';
import Repositories from './repository'; 

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfStars: "",
      keyword: "",
      licenseType: 'mit',
      isForked: false,
      isLoaded: true,
      errors: {
        numberOfStars: "",
        keyword: "",
      },
      results: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    let errors = this.state.errors

    if (name === 'numberOfStars' && value < 100 ) {
      errors.numberOfStars = "Must be > 100";
    } else {
      errors.numberOfStars = "";
    }

    if (name === 'keyword' && value.length < 3) {
      errors.keyword = "Search text needs to be at least 3 characters";
    } else {
      errors.keyword = "";
    }
    
    this.setState({errors, [name]: value});
    console.log("Change: ", this.state);
  }

  getSearchText(results) {
    return !results ? 
      "Please enter query and click SEARCH button above, results appear here."
      : this.state.results.length === 0 ? "No Results" 
        : "SEARCH results:";
  }
  
  isFormValid() {
    const errors = this.state;
    if (errors.keyword !== "" )
      return "disabled";
    
    return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoaded: false})
    const { numberofStars, keyword, licenseType, isForked } = this.state;
    let BASE_URL = "https://api.github.com/search/repositories?q=";
    const stars = numberofStars !== "" ? `+stars:${numberofStars}` : "";
    const lic = `+license:${licenseType}`;
    const fork = `+fork:${isForked}+sort:stars`;

    console.log("URL: " + BASE_URL + keyword + stars + lic + fork);
    
    try {
      fetch(BASE_URL + encodeURI(keyword) + stars + lic + fork)
        .then(res => res.json())
        .then((data => {
          this.setState({ 
            isLoaded: true,
            results: data.items,
          });
      }));
    }
    catch(error) {
      console.log(error);
    }
  }
 
  render() {
    const { errors, isLoaded, isForked, numberOfStars, keyword, licenseType, results } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="formBox">
            <div className="keyword">
              <label htmlFor="keyword">Text</label>  
              <input 
                type="text" 
                name="keyword" 
                value={keyword}  
                onChange={this.handleChange} 
                placeholder="react" required />
                {errors.keyword !== "" && 
                  <span className='error'>{errors.keyword}</span>}
            </div>
            <div className="stars-input">
              <label htmlFor="numberOfStars">Stars</label>  
              <input 
                type="text" 
                name="numberOfStars" 
                placeholder=">100" 
                value={numberOfStars}
                onChange={this.handleChange} />
                {errors.numberOfStars !== "" && 
                  <span className='error'>{errors.numberOfStars}</span>}
            </div>
            <div className="licenseType">
              <label htmlFor="licenseType">License</label>  
              <select name="licenseType" value={licenseType} onChange={this.handleChange} >
                <option value="mit">MIT</option>
                <option value="isc">ISC</option>
                <option value="apache-2.0">Apache</option>
                <option value="gpl">GPL</option>
              </select>
              <input 
                type="checkbox" 
                name="isForked" 
                value={isForked} 
                onChange={this.handleChange} />
              <label htmlFor="isForked">Include Forked</label>  
            </div>
          {isLoaded ? <button type="submit" className="btn" disabled={this.isFormValid}>Search</button>
          : <i className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>}
        </div>
      </form>
      <hr />
      <div className="results">
        <h3>{this.getSearchText(results)}</h3>
        {!results ?
          <></>
          : results.map((repo) => <Repositories repo={repo} key={repo.id} />)}
      </div>
    </>
    );
  }
}

export default SearchForm;