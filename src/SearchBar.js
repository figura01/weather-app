import React from 'react';

const SearchBar = ({query, change, submit}) => {
    // console.log(change)
    console.log(change, query, submit)
    return (
      <nav className="navbar-fixed-top">
        <div className="container margin-left">
          <form 
            className="card my-6 mx-auto"
            onSubmit={(e) => {submit(e)}}
          >
            <div className="card-body row no-gutters align-item-center">
              <div className="col">
                <input
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Serach..."
                  value={query}
                  onChange={(e) => {change(e)}}
                />
              </div>
            </div>
          </form>
        </div>
      </nav>
    );
  };

  export default SearchBar;