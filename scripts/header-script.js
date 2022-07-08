window.onload = function(){

    let logo = document.getElementById("logo");
    let appname = document.getElementById("appname");
    let menuHeader = document.getElementById("menuHeader");
        
    let logoExpanded = false;

    menuHeader.addEventListener("mouseover", showPointerCursor, false);

    menuHeader.onclick = function() {
        if (!logoExpanded) {
            appname.style.transform = "translate(0px, -100px)";
            menuHeader.style.height = "150px";
            logo.style.transform = "scale(2.5)";
            logo.style.transform += "translate(20px, 0px)";
            logo.style.filter = "brightness(2)";
            logo.style.filter = "drop-shadow(0 0 8px #FFF553)";
            logoExpanded = true;
        }
        else{
            appname.style.transform = "translate(0px, 0px)";
            menuHeader.style.height = "75px";
            logo.style.transform = "scale(1)";
            logo.style.transform += "translate(0px, 0px)";
            logo.style.filter = "brightness(1)";
            logoExpanded = false;
        }
    }

    function showPointerCursor() {
        menuHeader.style.cursor = "pointer";
    }
}