import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'http://openweathermap.org/img/wn/'
        }
    };

    format() {
        const options =  {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date().toLocaleDateString([], options);
    }
    
    render() {
        const { forecast } = this.props;
        console.log('forecast in main: ', forecast);
        return (
            <div>
                <h1 className="location">
                    {forecast.city}
                </h1>
                <h2 className="dtae">{this.format()}</h2>
                <div className="weather-icon">
                    <div className="sunny">
                        <img src={this.state.baseURL + forecast.icon + "@2x.png"} alt={forecast.description} />
                    </div>
                </div>

                <p className="temp">{(forecast.temp - 273.15).toFixed(0)}°</p>
                <p className="conditions">{forecast.description}</p>

            </div>
        )
    };
};