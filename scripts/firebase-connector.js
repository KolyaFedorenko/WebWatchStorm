import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-analytics.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBq5ny6wmV1Mef-M3yS5tNL3Zf5CXYUtcY",
    authDomain: "distribution-bc332.firebaseapp.com",
    databaseURL: "https://distribution-bc332-default-rtdb.firebaseio.com",
    projectId: "distribution-bc332",
    storageBucket: "distribution-bc332.appspot.com",
    messagingSenderId: "460016977857",
    appId: "1:460016977857:web:0a96dba347f3d61f111140",
    measurementId: "G-0Q6PE8G26E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

const moviesList = document.getElementById("moviesList");

function getLatestVersion(){
    const dbRef = ref(db);
    get(child(dbRef, "WatchStorm/KolyaFedorenko/Movies/")).then((snapshot) => {
        let movies = snapshot.val();
        for (let movie in movies) {
            let movieItem = 
            `
            <div class="movie-item">
                <div class="login100-form validate-form">
                    <div class="movie-header">
                        <img class="movie-image" src="${movies[movie].imagePath}">
                        <div class="movie-title-and-year">
                            <span class="movie-title">${movies[movie].title}</span>
                            <span class="movie-year">${movies[movie].year}</span>
                        </div>
                        <div class="description movie-container">
                            <span class="default-text">${movies[movie].description}</span>
                        </div>
                        <div class="ratings movie-container" style="padding-top: 15px; padding-bottom: 15px;">
                            <div class="visual rating-container">
                                <span class="default-text">
                                    Visual Rating:
                                </span>
                                <progress value="${movies[movie].visualRating}" max="100"></progress>
                                <span class="default-text">
                                    ${movies[movie].visualRating}%
                                </span>
                            </div>
                            <div class="cast rating-container" style="margin-top: 5px; width: 103%;">
                                <span class="default-text">
                                    Cast Rating:
                                </span>
                                <progress value="${movies[movie].castRating}" max="100"></progress>
                                <span class="default-text">
                                    ${movies[movie].castRating}%
                                </span>
                            </div>
                            <div class="plot rating-container" style="margin-top: 5px; width: 104%;">
                                <span class="default-text">
                                    Plot Rating:
                                </span>
                                <progress value="${movies[movie].plotRating}" max="100"></progress>
                                <span class="default-text">
                                    ${movies[movie].plotRating}%
                                </span>
                            </div>
                        </div>
                        <div class="average-ratings movie-container" style="padding-top: 15px; padding-bottom: 15px;">
                            <div class="your-average-rating rating-container">
                                <span class="default-text">
                                    Your Average Rating:
                                </span>
                                <progress value="${movies[movie].compositeRating}" max="100" style="width: 39%;"></progress>
                                <span class="default-text">
                                    ${movies[movie].compositeRating}%
                                </span>
                            </div>
                            <div class="audience-average-rating rating-container">
                                <span class="default-text" style="margin-top: 5px;">
                                    Audience Average Rating:
                                </span>
                                <progress value="${movies[movie].usersAverageRating}" max="100" style="width: 30.5%;"></progress>
                                <span class="default-text">
                                    ${movies[movie].usersAverageRating}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            moviesList.innerHTML += movieItem;
            console.log(movies[movie].title);
        }
    })
}

window.onload = function(){
    getLatestVersion();
}
