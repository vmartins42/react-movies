import { useEffect, useState } from "react";
import Select from "react-select";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import "./App.css";
import {movies$} from "./movies/movies";

function App() {
    let selectRef = null;
    const [movies, setMovies] = useState([]);
    const [baseMovies, setBaseMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [valueChecked, setValueChecked] = useState(12);
    const [showStatus, setShowStatus] = useState(false);
    const [categoryStatus, setCategoryStatus] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    //fill movies, categories ans set checkbox
    const fetchMovies = async () => {
        const moviesArray = await movies$;
        setMovies(moviesArray);
        setBaseMovies(moviesArray);
        fillCategoryArray(moviesArray);
        document.getElementById("12").checked = true;
    };

    //get categories
    const fillCategoryArray = (moviesArray) => {
        let categoriesArray = [];
        for (let movie of moviesArray) {
            categoriesArray = [...categoriesArray,{ value: movie.category, label: movie.category }];
        }
        categoriesArray = categoriesArray.filter(
            (elem, index, self) =>
                self.findIndex((t) => {
                    return t.value === elem.value && t.label === elem.label;
                }) === index
        );
        setCategories(categoriesArray);
    };

    //delete card
    const deleteMovie = (movie) => {
        const updateMoviesArray = movies.filter(
            (movieId) => movieId.id !== movie.id
        );
        const updateBaseMovies = baseMovies.filter(
            (movieId) => movieId.id !== movie.id
        );
        setMovies(updateMoviesArray);
        setBaseMovies(updateBaseMovies);
        fillCategoryArray(updateMoviesArray);
    };

    //sort by category(ies) choose
    const sortMovies = (item) => {
        if (!item[0]) {
            setCategoryStatus(false);
            setMovies(baseMovies);
        } else {
            let filterMovies = baseMovies.filter((e) => item.findIndex((i) => i.value === e.category) !== -1);
            setMovies(filterMovies);
            setCategoryStatus(true);
        }
    };

    //checkbox to show 4-8-12 card
    const handleCheckbox = (e) => {
        let nbSlice = 0;
        let moviesArraySlice = "";
        if (e.target.value !== setValueChecked) {
            document.getElementById(`${valueChecked}`).checked = false;
            document.getElementById(`${e.target.value}`).checked = true;
            setValueChecked(e.target.value);
        }
        if (categoryStatus) {
            nbSlice = e.target.value > movies.length ? movies.length : e.target.value;
            moviesArraySlice = movies.slice(0, nbSlice);
        } else {
            nbSlice = e.target.value > baseMovies.length ? baseMovies.length : e.target.value;
            moviesArraySlice = baseMovies.slice(0, nbSlice);
        }
        if (nbSlice >= baseMovies.length || nbSlice >= movies.length)
            setShowStatus(false);
        else setShowStatus(true);
        setMovies(moviesArraySlice);
    };

    //go back when all movies of category choose are empty
    const handleBackButton = () => {
        setMovies(baseMovies);
        fillCategoryArray(baseMovies);
        selectRef.select.clearValue();
    };

    //add Likes or Dislikes
    const handleLikeDislike = (movie, field) => {
        let id = movie.id - 1
        let newBaseMoviesArray = [...baseMovies]
        let newMoviesArray = [...movies]
        if (field === 'likes'){
            newBaseMoviesArray[id] = {...newBaseMoviesArray[movie.id], likes: newBaseMoviesArray[id].likes +1}
            setBaseMovies(newBaseMoviesArray)
            newMoviesArray[id] = {...newMoviesArray[id], likes: newMoviesArray[id].likes +1}
            setMovies(newMoviesArray)
        }
        else {
            newBaseMoviesArray[id] = {...newBaseMoviesArray[id], dislikes: newBaseMoviesArray[id].dislikes +1}
            setBaseMovies(newBaseMoviesArray)
            newMoviesArray[id] = {...newMoviesArray[id], dislikes: newMoviesArray[id].dislikes +1}
            setMovies(newMoviesArray)
        }
    };

    //show more card when checkox activate
    const showMore = () => {
        let nbSlice = 0;
        let nextArrayShow = "";
        if (categoryStatus) {
            nbSlice = parseInt(valueChecked) < movies.length ? movies.length + parseInt(valueChecked) : movies.length;
            nextArrayShow = movies.slice(0, nbSlice);
        } else {
            nbSlice = parseInt(valueChecked) < baseMovies.length ? movies.length + parseInt(valueChecked) : baseMovies.length;
            nextArrayShow = baseMovies.slice(0, nbSlice);
        }
        setMovies(nextArrayShow);
        if (nbSlice >= baseMovies.length) setShowStatus(false);
        else setShowStatus(true);
    };

    return (
        <div className="App">
            <span className="site-title">ParticeepStream</span>
            <div className="categories-select">
                <Select
                    className="movie-select"
                    ref={(ref) => {
                        selectRef = ref;
                    }}
                    options={categories}
                    isMulti
                    onChange={sortMovies}
                />
                <div className="movie-pages">
                    <p>Element par page :</p>
                    <div>
                        <input id="4" type="checkbox" name="choix1" value="4" onClick={handleCheckbox}/>4
                        <input id="8" type="checkbox" name="choix2" value="8" onClick={handleCheckbox}/>8
                        <input id="12" type="checkbox" name="choix3" value="12" onClick={handleCheckbox}/>12
                    </div>
                </div>
            </div>
            <div className="movie-cards-container">
                {movies.map((movie, index) => {
                    return (
                        <div className="movie-card" key={index}>
                            <img
                                className="movie-card-picture"
                                src={movie.url}
                                alt="img-movie"
                            />
                            <div className="movie-card-description">
                                <span className="movie-card-title">
                                    {movie.title}
                                </span>
                                <span className="movie-card-category">
                                    {movie.category}
                                </span>
                                <span className="movie-card-likes">
                                    Likes: {movie.likes}
                                </span>
                                <div className="movie-card-likes-button-container">
                                    <AiFillLike className="movie-card-likes-button" onClick={() => {handleLikeDislike(movie, "likes")}}/>
                                </div>
                                <span className="movie-card-dislikes">
                                    Dislikes: {movie.dislikes}
                                </span>
                                <div className="movie-card-likes-button-container">
                                    <AiFillDislike className="movie-card-dislikes-button" onClick={() => {handleLikeDislike(movie,"dislikes")}}/>
                                </div>
                                <div className="movie-container-button">
                                    <button className="movie-card-delete-button" onClick={() => {deleteMovie(movie)}}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {movies.length !== 0 ? (
                ""
            ) : (
                <div className="no-movies-container">
                    <span className="no-movies-text">No films in there</span>
                    <div className="no-movies-container-button">
                        <button className="no-movies-back-button" onClick={handleBackButton}>
                            Back
                        </button>
                    </div>
                </div>
            )}
            {!showStatus ? "" : (
                <div className="movie-seemore-container">
                    <span className="movie-seemore" onClick={showMore}>See more ...</span>
                </div>
            )}
        </div>
    );
}

export default App;
