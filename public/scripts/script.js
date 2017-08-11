

// $(document).ready(function() {
//     try{
//         alert("Hi!!!");
//     }catch(e)
//     {
//         alert("Error");
//     }
// });

// toggle edit comment form
$(".edit-comment").click(function(){
    $("#edit-form").removeClass("edit-form");
});

$("#cancel").click(function(){
    $("#edit-form").addClass("edit-form");
});

// //count like
// $("#heart").click(function(){
//     $(".heart.icon").toggleClass("red");
// });

//close flash message
$("#message").on("click",".close",function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
    });
});

//side-menu config
// $(".vertical.menu").on("click",".item", function(){
//     $(".item").removeClass("active");
//     $(this).addClass("active");
// });

// $(".vertical.menu .item:first-child").click(function(){
//     $(".user-info").css("display", "none");
//     $("#about-me").fadeIn(300, function(){
//         $(this).css("display", "inline-block");
//     });
// });
// $(".vertical.menu .item:nth-child(2)").click(function(){
//     $(".user-info").css("display", "none");
//     $("#blog").fadeIn(300, function(){
//         $(this).css("display", "inline-block");
//     });
// });
// $(".vertical.menu .item.third-element").click(function(){
//     $(".user-info").css("display", "none");
//     $("#feed").fadeIn(300, function(){
//         $(this).css("display", "inline-block");
//     });
// });
// $(".vertical.menu .item:nth-child(4)").click(function(){
//     $(".user-info").css("display", "none");
//     $("#mess").fadeIn(300, function(){
//         $(this).css("display", "inline-block");
//     });
// });
// $(".vertical.menu .item:last-child").click(function(){
//     $(".user-info").css("display", "none");
//     $("#following").fadeIn(300, function(){
//         $(this).css("display", "inline-block");
//     });
// });

//show change avatar button
$(".left-side .image").dimmer({
    on: 'hover'
  })
;

$(".center .button").click(function(){
    $(this).css("display", "none");
    $(".ui.icon.input").css("display", "inline-block");
});

//toggle following button
// $(".description button").click(function(){
//     $(this).attr('id', ($(this).attr('id') === 'deactive' ? 'active' : 'deactive'));
//     if($(this).text()==="Following"){
//         $(this).html("<i class='user icon'></i>Followed");
//     }else{
//          $(this).html("<i class='add user icon'></i>Following");
//     }
// });

//toggle sidebar when breakdown
$(".sidebar.icon").click(function(){
    if(!($(".ui.vertical.menu.nav").hasClass("open"))){
        $(".ui.vertical.menu.nav").addClass("open");
        $(".ui.vertical.menu.nav").css("transform", "translate(0, 0)");
        $(".left.floated.segment").css("opacity", "0.5");
    }else{
        $(".ui.vertical.menu.nav").removeClass("open");
        $(".ui.vertical.menu.nav").css("transform", "translate(-280px, 0)");
        $(".left.floated.segment").css("opacity", "1");
    }
});

// $(".caret.down.icon").click(function(){
//     if(!($(".floated.right.segment").hasClass("open"))){
//         $(".floated.right.segment").addClass("open");
//         $(".floated.right.segment").css("display", "inline-block");
//     }else{
//         $(".floated.right.segment").removeClass("open");
//         $(".floated.right.segment").css("display", "none");
//     }
// });

// $(".caret.down.icon").click(function(){
//     if(!($(".floated.right.segment").hasClass("open"))){
//         $(".floated.right.segment").fadeIn(200, function(){
//             $(this).addClass("open");
//             $(this).css("display", "inline-block");
//         });
//     }else{
//         $(".floated.right.segment").fadeOut(200, function(){
//             $(this).removeClass("open");
//             $(this).css("display", "none");
//         });
//     }
// });

$("body").click(function(e){
    if(e.target.id !== "right-bar-icon"){
        if($(".floated.right.segment").hasClass("open")){
            $(".floated.right.segment").removeClass("open");
            $(".floated.right.segment").css("width", "0");
            $(".floated.right.segment").css("padding", "0");
            $(".left.floated.segment").css("opacity", "1");
        }
    }
    if(e.target.id !== "left-bar-icon" && e.target.id !== "input"){
        // console.log(e.target);
        if($(".ui.vertical.menu.nav").hasClass("open")){
            $(".ui.vertical.menu.nav").removeClass("open");
            $(".ui.vertical.menu.nav").css("transform", "translate(-280px, 0)");
            $(".left.floated.segment").css("opacity", "1");
        }
    }
});

$(".caret.down.icon").click(function(){
    if(!($(".floated.right.segment").hasClass("open"))){
        $(".floated.right.segment").addClass("open");
        $(".floated.right.segment").css("width", "300px");
        $(".floated.right.segment").css("padding", "20px");
        $(".left.floated.segment").css("opacity", "0.5");
    }else{
        $(".floated.right.segment").removeClass("open");
        $(".floated.right.segment").css("width", "0");
        $(".floated.right.segment").css("padding", "0");
        $(".left.floated.segment").css("opacity", "1");
    }
});

$(window).on('resize', function() {
    if($(window).width() > 992) {
        $(".floated.right.segment").css("width", "30%");
        $(".floated.right.segment").css("padding", "20px");
        $(".floated.right.segment").css("padding-left", "20px");
        $(".floated.right.segment").css("padding-right", "10px");
        $(".left.floated.segment").css("opacity", "1");
    }
    // }else{
    //     $(".floated.right.segment").css("width", "0");
    //     $(".floated.right.segment").css("padding", "0");
    // }
});


