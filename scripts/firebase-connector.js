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
						<div class="ratings movie-container" style="padding-top: 10px; padding-bottom: 10px; display: inline-flex; justify-content: center;">
							<div class="ratings-container" style="width: 30%;">
								<span class="default-text rating-name">
									Visual Rating:
								</span>
								<span class="default-text rating-name">
									Cast Rating:
								</span>
								<span class="default-text rating-name">
									Plot Rating:
								</span>
							</div>
							<div class="ratings-values-container" style="width: 52%; margin-left: 10px;">
								<div style="width: 100%; height: 100%;">
									<progress value="${movies[movie].visualRating}" max="100" style="vertical-align: top; margin-top: 12px"></progress>
									<progress value="${movies[movie].castRating}" max="100" style="margin-top: 15px;"></progress>
									<progress value="${movies[movie].plotRating}" max="100" style="margin-top: 16px;"></progress>
								</div>
							</div>
							<div class="ratings-container" style="width: 10%; margin-left: 20px;">
								<span class="default-text rating-name">
									${movies[movie].visualRating}%
								</span>
								<span class="default-text rating-name">
                                    ${movies[movie].castRating}%
								</span>
								<span class="default-text rating-name">
                                    ${movies[movie].plotRating}%
								</span>
							</div>
						</div>
						<div class="average-ratings movie-container" style="padding-top: 10px; padding-bottom: 10px; display: inline-flex; justify-content: center;">
							<div class="ratings-container" style="width: 53%;">
								<span class="default-text rating-name">
									Your average rating:
								</span>
								<span class="default-text rating-name">
									Audience average rating:
								</span>
							</div>
							<div class="ratings-values-container" style="width: 30%; margin-left: 10px;">
								<div style="width: 100%; height: 100%;">
									<progress value="${movies[movie].compositeRating}" max="100" style="vertical-align: top; margin-top: 12px; width: 100%;"></progress>
									<progress value="${movies[movie].usersAverageRating}" max="100" style="margin-top: 15px; width: 100%;"></progress>
								</div>
							</div>
							<div class="ratings-container" style="width: 10%; margin-left: 20px;">
								<span class="default-text rating-name">
									${movies[movie].compositeRating}%
								</span>
								<span class="default-text rating-name">
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
