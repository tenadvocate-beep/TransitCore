document.addEventListener("DOMContentLoaded",()=>{

    const btn = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("theme") || "dark";

    document.body.classList.add(savedTheme);


    if(!btn) return;


    updateThemeText();


    btn.onclick = function(e){

        e.stopPropagation();


        document.body.classList.toggle("dark");

        document.body.classList.toggle("light");


        const mode = document.body.classList.contains("dark")
        ? "dark"
        : "light";


        localStorage.setItem("theme", mode);


        updateThemeText();

    };


});


function updateThemeText(){

    const btn=document.getElementById("themeToggle");

    if(!btn) return;


    if(document.body.classList.contains("dark")){

        btn.innerHTML="☀️ Light Mode";

    }else{

        btn.innerHTML="🌙 Dark Mode";

    }

}