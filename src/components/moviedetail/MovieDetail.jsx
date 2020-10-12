import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
  fetchSimilarMovie,
  // fetchMovieReview,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal, } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./MovieDetail.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';



export function MovieDetail({ match }) {
  let params = match.params;

  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [OverviewIsOpen, setOverviewIsOpen] = useState(true);
  const [CharactersIsOpen, setCharactersIsOpen] = useState(false);
  const [ReviewIsOpen, setReviewIsOpen] = useState(false);

  
  

  // const [review, setReview] = useState([]);
  let [rating, setRating] = React.useState([
    {
      email: "John Doe ",
      text: "Nice Film!! ",
      rate: 3
    },
    {
      email: "Ujang ",
      text: "Good lah pokoknye!! ",
      rate: 5
    },
  ])
  let [forms, setForms] = React.useState({
    email: {
      value: "",
      errMsg: ""
    },
    text: {
      value: "",
      errMsg: ""
    },
    rate: {
      value: "",
      errMsg: ""
    }
    
  })
 
  

  const onChange = (e) => {
    // In untuk meng clone state
    let newForm = { ...forms }
    // Disarankan untuk pake Deep Clone dari Lodash
    // let newForm = deppClone(forms) -> contoh

    if (e.target.id === "email") {
      const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let valid = emailRegx.test(e.target.value)

      if (!valid) {
        newForm.email.errMsg = "Email is not valid"
      } else {
        newForm.email.errMsg = ""
      }

      newForm.email.value = e.target.value;
    } else {
      newForm[e.target.id].value = e.target.value;
    }

    setForms(newForm)
  }

  const onSubmit = () => {
    let newForm = { ...forms }
    let formKeys = Object.keys(forms)

    // Validasi value empty
    // Ini gunanya buat masukin error message
    for (let i = 0; i < formKeys.length; i++) {
      let key = formKeys[i]
      let obj = forms[key]
      if (obj.value === "") {
        newForm[key].errMsg = "This field cannot be empty"
      } else {
        newForm[key].errMsg = ""
      }
    }

    // Yang ini gunanya buat ngecek ada error atau engga
    let formIsInvalid = false;
    for (let i = 0; i < formKeys.length; i++) {
      let key = formKeys[i]
      let obj = forms[key]
      if (obj.errMsg) {
        formIsInvalid = true;
        break;
      }
    }

    setForms(newForm)

    if (formIsInvalid) return;

    // Bikin object untuk di dalam array rating
    let ratingObj = {
      email: newForm.email.value,
      text: newForm.text.value,
      rate: newForm.rate.value
    }

    let newRating = [...rating]
    newRating.push(ratingObj)

    // Set state nya rating
    setRating(newRating)
    // Reset Form ke object awal
    setForms({
      email: {
        value: "",
        errMsg: ""
      },
      text: {
        value: "",
        errMsg: ""
      },
      rate: {
        value: "",
        errMsg: ""
      }
    })
  }
  // const load = () =>{
  //   if(JSON.parse(localStorage.getItem('rate'))){
  //     this.setState({[forms]:JSON.parse(localStorage.getItem('rate'))});
  //   }};
  //   const update =()=>{
  //     localStorage.setItem('rate', JSON.stringify[forms]);
  //   };

  useEffect(() => {
    
    const fetchAPI = async () => {
      // setReview(await fetchMovieReview(params.id));

      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };
    
    fetchAPI();
    
  }, [params.id], window.localStorage.setItem('rating',rating));

  genres = detail.genres;
  console.log(OverviewIsOpen);

  const MoviePalyerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePalyerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePalyerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#007bff", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
        <p style={{ color: "#007bff", fontWeight: "bolder" }}>RATING</p>
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>


        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#007bff", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#007bff", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#007bff", fontWeight: "bolder" }}>BUDGET</p>
          <p style={{ color: "#f4c10f" }}>{detail.budget}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#007bff", fontWeight: "bolder" }}>HOMEPAGE</p>
          <p style={{ color: "#f4c10f" }}>{detail.homepage}</p>
        </div>
      </div>


      <div className="btnMovie">
        <button
          onClick={() => { setOverviewIsOpen(true); setCharactersIsOpen(false); setReviewIsOpen(false) }} >Overview</button>
        <button onClick={() => { setCharactersIsOpen(true); setOverviewIsOpen(false); setReviewIsOpen(false) }}>Characters</button>
        <button onClick={() => { setReviewIsOpen(true); setCharactersIsOpen(false); setOverviewIsOpen(false) }}>Review</button>
      </div>

      {OverviewIsOpen ? <div className="row mt-3"
      >
        <div>
          <div className="col">
            <div className="mt-3" style={{ color: "#007bff", fontWeight: "bolder" }}>
              <p >OVERVIEW</p>
              {detail.overview}
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p style={{ color: "#007bff", fontWeight: "bolder" }}>
              SIMILAR MOVIES
          </p>
          </div>
        </div>
        <div className="row mt-3">{similarMovieList}</div>
      </div>
        : null}

      {CharactersIsOpen ?
      <div>
        <div className="row mt-3" >
          <div className="col">
            <p style={{ color: "#007bff", fontWeight: "bolder" }}>CASTS</p>
          </div>
        </div>
        <div className="row mt-3">{castList}</div>
      </div>
        : null}

      {ReviewIsOpen ? <div className="row mt-3"
      >
        <div>
          <div className="col">
            <div className="mt-3" style={{ color: "#007bff", fontWeight: "bolder" }}>
              <p >REVIEW</p>
              <div className="reviewInput">
                <div >
                <button  id="rate" value="1" onClick={onChange}>1</button>
                <button  id="rate" value="2" onClick={onChange}>2</button>
                <button  id="rate" value="3" onClick={onChange}>3</button>
                <button  id="rate" value="4" onClick={onChange}>4</button>
                <button  id="rate" value="5" onClick={onChange}>5</button>
                </div>
                
                
                <input type="email" id="email" placeholder="Type Your Name Here..." value={forms.email.value} onChange={onChange} />
                <div>
                <input type="text" id="text" placeholder="Type Your Review Here..." value={forms.text.value} onChange={onChange} />
                <button onClick={onSubmit}>Submit</button>
                </div>
                
              </div>

              {/* {detail.overview} */}
              {/* <div className="row mt-3">{review}</div> */}
              {rating ? rating.map(item => {
                let rate = []
                let tracker = item.rate;
                for (let i = 0; i < item.rate; i++) {
                  if (tracker < 1 && tracker > 0) {
                    // Untuk desimal
                    rate.push(0)
                  } else {
                    // Untuk bilangan bulat
                    rate.push(1)
                  }
                  tracker--;
                }

                return (
                  <React.Fragment>
                    <div className="reviewBox">
                      <div className="stars">
                      {rate.map(item => item === 1 ? <FaStar /> : <FaStarHalfAlt />)}
                      </div>
                    
                      <h4>{item.email}</h4>
                      <p>{item.text}</p>
                      
                    </div>
                    
                  </React.Fragment>
                )
              }) : null}
            </div>

          </div>
        </div>
      </div>
        : null}




      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>


    </div>
  );
}
