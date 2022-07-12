import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-analytics.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
import { getStorage, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-storage.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-storage.js";

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
const storage = getStorage(app);

const dbRef = ref(db);

const moviesList = document.getElementById("moviesList");

function getUserMovies(username){
    get(child(dbRef, "WatchStorm/" + username + "/Movies/")).then((snapshot) => {
        let movies = snapshot.val();
        for (let movie in movies) {
            let movieItem = 
            `
            <div class="movie-item" style="cursor:pointer;">
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

function showAuthorizationDialog(){
	let moviesList = document.getElementById("moviesList");

    moviesList.innerHTML += 
    `
    <div class="movie-item">
        <div id="authorizationForm" class="login100-form validate-form">
            <div style="display: flex; justify-content: center;">
                <img src="images/watchstorm-icon.png" style="width: 30%; height: 30%">
            </div>
            <div style="display: flex; justify-content: center;">
                <header style="color: white; font-weight: 500; font-size: 20px ;margin-top: 10px;">WatchStorm Web</header>
            </div>
            <div style="display: flex; justify-content: center;">
                <div class="description movie-container">
                    <span class="default-text">Welcome to the web version of Watch 
                        Storm! To log in, enter your username and the 6-digit code
                        that you specified in the mobile application to access the
                        web version of WatchStorm. If you haven't specified it yet,
                        go to the settings of the Watch Storm mobile application
                        and click the "Watch Storm Web" section, and then specify
                        and save a 6-digit code to access the web version of
                        WatchStorm, after which you can log in here.</span>
                </div>
            </div>
            <div style="display: flex; justify-content: center;">
                <div class="input-fields-container movie-container" style="margin-top: 10px; padding: 20px;">
                    <div style="display: flex; justify-content: center;">
                        <input id="loginField" class="input-field" placeholder="Your Username">
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px;">
                        <input id="digitCodeField" class="input-field" placeholder="6-digit code">
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px;">
                        <button id="buttonSignIn" class="button-login">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    `

	let loginField = document.getElementById("loginField");
	let digitCodeField = document.getElementById("digitCodeField");
	let buttonSignIn = document.getElementById("buttonSignIn");

	buttonSignIn.onclick = function() {
		let userLogin = loginField.value;
		let userDigitCode = digitCodeField.value;

		get(child(dbRef, `WatchStormWeb/WebCodes/${userLogin}`)).then((snapshot) => {
			let receivedDigitCode = snapshot.val();
			if (userDigitCode == receivedDigitCode) {
				setCookie('username', userLogin, {});
				setCookie('digitCode', userDigitCode, {});
				closeAuthorizationDialog();
				showSidebar();
				updateUserDataInSidebar(userLogin);
				getUserMovies(userLogin);
			} 
			else {
				alert("wrong");
			}
		});
	}
}

function closeAuthorizationDialog() {
	let authorizationForm = document.getElementById("authorizationForm");
	authorizationForm.parentElement.removeChild(authorizationForm);
}

function showSidebar() {
	let sidebar = document.getElementById("sidebar");
	sidebar.style.transform = "translate(0px, 0px)";
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		expires: 'Tue, 19 Jan 2038 03:14:07 GMT',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}  

function authorizeUser() {
	let savedUsername = getCookie("username");
	let savedDigitCode = getCookie("digitCode");

	if(savedUsername != null) {
		get(child(dbRef, `WatchStormWeb/WebCodes/${savedUsername}`)).then((snapshot) => {
			let receivedDigitCode = snapshot.val();
			if (savedDigitCode == receivedDigitCode) {
				showSidebar();
				updateUserDataInSidebar(savedUsername);
				getUserMovies(savedUsername);
			} 
			else {
				showAuthorizationDialog();
			}
		});
	}
	else{
		showAuthorizationDialog();
	}
}

function updateUserDataInSidebar(username) {
	let headersContainer = document.getElementById("headersContainer");

	getDownloadURL(sRef(storage, `${username}/Images/ProfileImage`)).then((url) => {
		headersContainer.innerHTML +=
		`
		<div id="userInfoHeader" class="user-info-header">
			<div class="user-info-container">
				<img id="userProfileImage" src="images/profile-image-placeholder.png" style="max-width: 12%; height: auto; border-radius: 20px ; float: left;">
				<div style="height: 30px; display: flex; align-items: center; width: 20px;">
					<header id="username" style="transition-duration: 1000ms; font-weight: 500; font-size: 14px ; width: 20px; float: left;">${username}</header>
				</div>
			</div>
		</div>
		`

		let userProfileImage = document.getElementById("userProfileImage");
		setTimeout(()=> userProfileImage.src = url, 100);
	});
}

window.onload = function(){
	authorizeUser();
}
