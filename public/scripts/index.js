var Content = React.createClass({
  getInitialState: function() {
    return{locations: [], query: "", searchBy: "" }
  },
  setLocations: function(obj) {
    this.setState({locations: obj.loc})
  },
  setSearchOption: function(obj) {
    this.setState({searchBy: obj.searchBy})
  },
  getLocations: function(data) {
    this.setState({query: data.query}, function() {
      $.ajax({
        url: "http://localhost:9292/api/v1/properties/search?" + this.state.searchBy + "=" + this.state.query,
        type: 'get',
        dataType: 'json',
        success: function(data) {
          this.setLocations({loc: data})
        }.bind(this)
      });
    });
  },
  render: function() {
    return (
      <div>
        <h1>hello world</h1>
        <SearchOptions handleSearchOption={this.setSearchOption} />
        <SearchBar handleQuery={this.getLocations}/>
        <Thumbnail locations={this.state.locations} />
      </div>
    )
  }
});

var SearchBar = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var query = React.findDOMNode(this.refs.query).value.trim();
    this.props.handleQuery({query: query})
  },
  render: function() {
    return (
      <form id='search' className="input-group" onSubmit={this.handleSubmit}>
        <input type="text" className="form-control" placeholder="Search for..." ref='query'/>
        <span className="input-group-btn">
          <button className="btn btn-primary" type="submit" value='Post'>Search</button>
        </span>
      </form>
    )
  }
});

var SearchOptions = React.createClass({
  handleCityClick: function(event) {
    event.preventDefault();
    this.props.handleSearchOption({searchBy: "city"})
  },
  handleAddressClick: function(event) {
    event.preventDefault();
    this.props.handleSearchOption({searchBy: "address"})
  },
  handlePizzeriaClick: function(event) {
    event.preventDefault();
    this.props.handleSearchOption({searchBy: "pizzeria"})
  },
  render: function() {
    return (
      <div className="buttons">
        <button className="btn btn-primary" type="submit" value='Post' onClick={this.handleCityClick}>City</button>
        <button className="btn btn-primary" type="submit" value='Post' onClick={this.handleAddressClick}>Address</button>
        <button className="btn btn-primary" type="submit" value='Post' onClick={this.handlePizzeriaClick}>Pizzeria</button>
      </div>
    )
  }
});

var Thumbnail = React.createClass({
  render: function() {
    var pizzerias = this.props.locations.map(function(location, index) {
      return (
        <div className='thumbnail'>
          <div className='caption'>
            <h3>{location.properties.pizzeria}</h3>
            <p>{location.properties.address}</p>
            <p>{location.properties.website}</p>
          </div>
        </div>
      )
    });
    return (
      <div className='col-md-4'>
        {pizzerias}
      </div>
    )
  }
});

React.render(
  <Content/>,document.getElementById('content')
)
