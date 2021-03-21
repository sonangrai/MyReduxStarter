import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../Redux/reducers/movieReducers";
import { logout } from "../Redux/reducers/authReducers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Home = ({ auth, getAllMovie, movies, logout }) => {
  //Calling the getAllMovie to populate the Movies in the state
  useEffect(() => {
    getAllMovie();
  }, [getAllMovie]);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      Here Movie
      {movies.gettingAllMoviesSuccess ? (
        <div className="loader">Loading</div>
      ) : (
        <>
          {movies.map((mov, i) => (
            <div className="item" key={mov._id}>
              <h2>MovieName: {mov.name}</h2>
              <p>Synopsis :{mov.synopsis}</p>
            </div>
          ))}
        </>
      )}
      {auth.isAuthenticated && (
        <Link className="btn" onClick={logout} to="/login">
          Logout
        </Link>
      )}
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object,
  getAllMovie: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  movies: state.movie.movies,
});

const mapDispatchToProps = {
  getAllMovie,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
