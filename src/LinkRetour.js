import React from 'react';
import { Link } from 'react-router-dom';

const LinkRetour = ({showDetails, onToggleShowDetails}) => (
    <div className="btn-retour sticky-top">
      {showDetails && (
        <Link to="/" className="link-retour" onClick={(e) => {onToggleShowDetails(e)}} >
          Retour 
        </Link>
      )}
    </div>
)

export default LinkRetour;

