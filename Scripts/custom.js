$(document).ready(function(){ 
  
applyOrientation();
custom_dp();

// Flipbtn Dropdown //

jQuery('.blueFlipBtn').click(function() {
   var id = jQuery(this).attr("rel");	
  
	
	
	if(jQuery('#ulaccess_'+id).is(':visible')){
		jQuery('#ulaccess_'+id).css({"display": "none"})

	}else{
		jQuery('#ulaccess_'+id).css({"display": "block"})
		}
});

//

$('.filterBtn').click(function () {
	$('body').toggleClass('filter-dropdown-open')
	$(this).toggleClass('cross-icon')
});


});

//


window.onresize = function (event) {
  applyOrientation();
}


function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
    $("body").addClass("potrait");
    $("body").removeClass("landscape");
  } else {
    $("body").addClass("landscape");
    $("body").removeClass("potrait");
  }
}

// Custom Dropdown //

function custom_dp(){
    $('.cstmDropdown').click(function(){
		jQuery(this).parent().toggleClass('open-select');
    });
    $('.custom-dp ul li a').click(function() {
        var text = $(this).text();
        $(this).parent().parent().parent().parent().find('a:first').html(text);
        $('.cate-sec').removeClass('open-select');
    });
    $("body").mouseup(function(){
        $('.cate-sec').removeClass('open-select');
		//$(".flipBtnMenu ").css({"display": "none"});
    })
} 

//

