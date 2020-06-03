import React from 'react';
import { Link, Redirect, } from 'react-router-dom';


export default class Details extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            baseURL: 'http://api.openweathermap.org/data/2.5/weather?',
            baseUrlIcon: 'http://openweathermap.org/img/wn/',
            query: this.props.match.params.id,
            APIkey: '22965172e422542ecf5caf7d4b0c9d1f',
            currentForecast: this.props.forecast,
            dataLoaded: false,
        }
    };
   
    componentDidMount() {
        console.log('props: ', this.props);
        let url = this.state.baseURL + "id=" + this.state.query + "&appid=" + this.state.APIkey;
        fetch(url).then(response => {
            if(response.ok){
                // console.log('response', response);
                return response.json();
            }else{
                // console.log('response ok: ', response.ok)
                return window.location = "/not-found"
            }
        })
        .then(data => {
            let coord = data.coord;
            console.log(coord)
            let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&lang=fr&appid=${this.state.APIkey}`;
            fetch(url2)
            .then(response => {
                console.log('response2: ', response);
                if(response.ok){
                    console.log('response', response);
                    return response.json();
                }
            })
            .then(data => {
                console.log('data2', data)
                let tabDayTemp = [];

                let daily = data.daily;
                let current = data.current;

                daily.map((day) => {
                    console.log(day.temp);
                    let dayTime = day.dt;
                    let dayTemp = day.temp.day;
                    let icon = day.weather[0].icon;
                    let description = day.weather[0].description;
                    let main = day.weather[0].main;

                    //let dte = new Date(dayTime);
                    //console.log(dte);
                    let currentDay = this.convertDateFormat(dayTime, dayTemp);
                    //const options =  {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    //let utcLocal = dateObj.toLocaleString('fr-FR', options);
                    //console.log('utcLoccal', utcLocal);
                    //let utcString = dateObj.toUTCString(); 
                    //console.log(utcString);
                    currentDay.icon = icon;
                    currentDay.description = description;
                    currentDay.main = main;
                    console.log('currentDay', currentDay, icon, description, main);
                    tabDayTemp.push(currentDay);
                    return tabDayTemp
                })
                console.log(tabDayTemp);
                this.setState({
                    days: tabDayTemp,
                    dataLoaded: true,
                })
            });
        }).catch(err => console.log(err))
        // https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={YOUR API KEY}
    }

    convertDateFormat(dayTime, dayTemp) {
        const options =  {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let dateObj = new Date(dayTime * 1000);
        
        let utcLocal = dateObj.toLocaleString('fr-FR', options);
        let tabDate = utcLocal.split(' ');
        console.log(tabDate);
        let day = {
            dayName: tabDate[0],
            dayNumber: tabDate[1],
            month: tabDate[2],
            year: tabDate[3],
            temp: (dayTemp - 273.15).toFixed(0),
        };

        return day;
    }

    render() {
        const {dataLoaded, days} = this.state;
        return (
            <div id="details">
                <h2 className="title">Prévision</h2>
                { dataLoaded && (
                    <div>
                        { dataLoaded && days !== 'undefinded' && (
                            <div className="container previsions">
                                <div className="row">
                                {days.map((elt) => {
                                    console.log(elt.dayName);
                                    let urlIcon = this.state.baseUrlIcon + elt.icon + "@2x.png"; 
                                    return (
                                        <div className="previsions-item col">
                                            <p className="previsions-item-strName">{elt.dayName}</p>
                                            <p className="previsions-item-day">{elt.dayNumber} {elt.month}</p>
                                            <img src={urlIcon} alt={elt.description}/>
                                            <p className="previsions-item-temp">{elt.temp}°</p>
                                            <p className="previsions-item-description">{elt.description}</p>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
};