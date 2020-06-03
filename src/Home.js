import React from 'react';
import SearchBar from './SearchBar';
import Main from './Main';
import BtnShowDetails from './BtnShowDetails';

const Home = ({change, query, submit, forecast, showDetails, onToggleShowDetails, error }) => {
    console.log('in home: ', onToggleShowDetails)
    return (
        <div id="home">
            <h2 className="title">Rechercher la Méreo de votre ville</h2>
            <SearchBar change={change} query={query} submit={submit}/>
            {error && (
                <p className="text-danger">Vile non trouvée</p>
            )}
            {forecast.id !== undefined && (
                <>
                    
                    <Main forecast={forecast} />
                    <BtnShowDetails showDetails={showDetails} onToggleShowDetails={onToggleShowDetails} forecast={forecast}/>
                </>
            )}
        </div>
    )
}

export default Home;