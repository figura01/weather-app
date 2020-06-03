import React from 'react';
import { Link } from 'react-router-dom';

const BtnShowDetails = ({ showDetails,s, forecast, onToggleShowDetails}) => {
    console.log('in btn: ', onToggleShowDetails);

    const handlerClick = (e) => {
      //console.log(e.target);
      onToggleShowDetails();
    }
  
    return (
      <div>
        {!showDetails && (
  
          <Link
            to={`/details/${forecast.id}`}
            className="btn btn-success"
            onClick={(e) => handlerClick(e) }
          >
            Details
          </Link>
        )}
      </div>
    );
  }
export default BtnShowDetails;