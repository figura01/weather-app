import React from 'react';

import Details from './Details';
import Home from './Home';

import LinkRetour from './LinkRetour';

import { Route, Switch, Link } from 'react-router-dom';
import './App.css';


export const Navbar = () => (
  <nav className="navbar navbar-light bg-primary sticky-top">
    <Link to="/" className="brand-link">
      <span className="navbar-brand text-justify">
        My Meto App
      </span>
    </Link>
  </nav>
);



const Footer = () => (
  <footer className="footer bg-dark">
    <div className="container">
      <p className="fooer-text">
        <span className="text-muted">
          Weather data from <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">Openweathermap</a>
        </span>
      </p>
    </div>
  </footer>
);

class App extends React.Component{
  // https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={YOUR API KEY}
  //
  constructor(props) {
    super(props);
    this.state = {
      baseURL: 'http://api.openweathermap.org/data/2.5/weather?',
      APIkey: '22965172e422542ecf5caf7d4b0c9d1f',
      query: '',
      forecast: {},
      isError: false,
      showDetails: false,
    }
  }

  componentDidMount() {
    // this.query();
  }

  query = () => {
    let url = this.state.baseURL+"q="+this.state.query+"&&lang=fr" + "&&appid="+this.state.APIkey;
    fetch(url).then((response) => {
       if(response.ok){
         console.log('response', response);
         return response.json();
       }
    })
    .then(data => {
      console.log('data', data);
      let weather = data.weather[0];
      let description = weather.description;
      let main = data.main;
      let temp = main.temp;
      let id = data.id;
      let icon = weather.icon;
      let sys = data.sys;
      let countryCode = sys.country.toLowerCase();
      let city = data.name;

      let coord = data.coord;

      let forecast = {
        temp: temp,
        description: description,
        icon: icon,
        code: countryCode,
        city: city,
        coord: coord,
        id: id,
      }
      console.log(forecast);
      this.setState({
        forecast,
        query: '',
        isError:false,
      })
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        isError:true,
        errorMsg: 'Ville non trouvé'
      })
    })
  };

  handlerChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
      query: e.target.value,
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    this.query();
    this.setState({
      query: '',
    })
  }

  toggleShowDetails = () => {
    const { showDetails } = this.state;
    this.setState({
      showDetails: !showDetails,
    })
  }


  render() {
    const { isError, forecast, showDetails } = this.state
    console.log('forecast: ', forecast.id );
    console.log()

    return (
      <div className="App">
       
        <Navbar />
        <LinkRetour onToggleShowDetails={this.toggleShowDetails} showDetails={showDetails}/>
        <div id="current" className="wrapper">
          {/* 
          <SearchBar change={this.handlerChange} query={this.state.query} submit={this.handlerSubmit}/>
          {isError && (
            <div className="text-danger">Ville non trouver {this.state.errorMsg}</div>
          )}
          */}
        </div>
       
        

        <Switch>
          {/* 
          {forecast.id !== undefined && (
            <Route path="/" exact >
              <Main forecast={forecast}/>
              {forecast.id &&(
                <BtnShowDetail 
                  forecast={forecast}
                  onToggleShowDetail={this.toggleShowDetail}
                  showDetails={showDetails}
                />
              )}
            </Route>
            
          )}
          <SearchBar change={this.handlerChange} query={this.state.query} submit={this.handlerSubmit}/>
          */}
          <Route path="/" exact>
            <Home 
              change={this.handlerChange} 
              query={this.state.query} 
              submit={this.handlerSubmit} 
              forecast={forecast}
              onToggleShowDetails={this.toggleShowDetails}
              error={isError}
            />
          </Route>

          <Route path="/details/:id" component={Details} exact/>
          <Route path="/*">
            <div>Page non trouvé</div>
          </Route>
        </Switch>

        <Footer />
      </div>
    );
  } 
}

export default App;
