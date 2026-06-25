
window.addEventListener("load", function(){
  const loader = document.getElementById("ym-preloader");
  if(loader){
    setTimeout(function(){
      loader.classList.add("ym-loader-done");
      setTimeout(function(){ loader.remove(); }, 800);
    }, 2800);
  }
});
