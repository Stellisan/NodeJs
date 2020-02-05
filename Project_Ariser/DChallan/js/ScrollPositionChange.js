window.onscroll = function(){ reducetopoffset() };

var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function reducetopoffset()
{
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
}