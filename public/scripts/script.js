

// $(document).ready(function() {
//     try{
//         alert("Hi!!!");
//     }catch(e)
//     {
//         alert("Error");
//     }
// });

$('.ui.comments').on('click', '.edit-comment', function() {
	$(this).parent().siblings('#edit-form').removeClass("edit-form");
});

$('.ui.comments').on('click', '#cancel', function() {
	$(this).parent('#edit-form').addClass("edit-form");
});


//close flash message
$("#message").on("click",".close",function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
    });
});

//user menu config
$(".vertical.menu").on("click",".item", function(){
    $(".item").removeClass("active");
    $(this).addClass("active");
});

$("#follower-btn").click(function(){
   $(".item").removeClass("active"); 
});

$(".vertical.menu .item:first-child").click(function(){
    $(".user-info").css("display", "none");
    $("#about-me").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".vertical.menu .item:nth-child(2)").click(function(){
    $(".user-info").css("display", "none");
    $("#blog").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".vertical.menu .item.third-element").click(function(){
    $(".user-info").css("display", "none");
    $("#feed").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".vertical.menu .item:nth-child(4)").click(function(){
    $(".user-info").css("display", "none");
    $("#mess").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".vertical.menu .item:last-child").click(function(){
    $(".user-info").css("display", "none");
    $("#following").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});

$(".extra.content").on("click", "#follower-btn", function(){
    $(this).parent().parent().siblings(".user-info").css("display", "none");
    $(this).parent().parent().siblings("#follower").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
//user menu config small screen
$(".ui.fluid.item.menu").on("click",".item", function(){
    $(".item").removeClass("change-color");
    $(this).addClass("change-color");
});
$("#follower-btn").click(function(){
   $(".item").removeClass("change-color"); 
});
$(".ui.fluid.item.menu .item:first-child").click(function(){
    $(".user-info").css("display", "none");
    $("#about-me").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".ui.fluid.item.menu .item:nth-child(2)").click(function(){
    $(".user-info").css("display", "none");
    $("#blog").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".ui.fluid.item.menu .item.third-element").click(function(){
    $(".user-info").css("display", "none");
    $("#feed").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".ui.fluid.item.menu .item:nth-child(4)").click(function(){
    $(".user-info").css("display", "none");
    $("#mess").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});
$(".ui.fluid.item.menu .item:last-child").click(function(){
    $(".user-info").css("display", "none");
    $("#following").fadeIn(300, function(){
        $(this).css("display", "inline-block");
    });
});

//show change avatar button
$(".left-side .image").dimmer({
    on: 'hover'
  })
;

$(".center .button").click(function(){
    $(this).css("display", "none");
    $(".ui.icon.input").css("display", "inline-block");
});

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
});

//create comment
$("#add-comment-form").submit(function(e){
    e.preventDefault();
    var comment = $(this).serialize();
    var actionUrl = $(this).attr("action");
    $.post(actionUrl, comment, function(data){
        var date;
        var currentTime = new Date();
        var createdTime = new Date(data.created);
        if(createdTime.getMonth() === currentTime.getMonth()){ 
            if(createdTime.getDate() === currentTime.getDate()){ 
                date = "Today at "+ createdTime.getHours() +":"+ createdTime.getMinutes();
            }else if(currentTime.getDate() - createdTime.getDate() === 1){ 
                date = "Yesterday at " + createdTime.getHours()+3 +":" + createdTime.getMinutes();
            }else if(currentTime.getDate() - createdTime.getDate() < 8){ 
                date = currentTime.getDate() - createdTime.getDate() + " days ago";
            }
        }else{
                date = createdTime.getDate()+"/"+ createdTime.getMonth()+1+"/"+ createdTime.getFullYear();
        }
        $(".ui.comments").append(
        `
        <div class="comment">
          <a class="avatar">
            <img src="${data.author.avatar}">
          </a>
          <div class="content">
            <a class="author">${data.author.username}</a>
            <div class="metadata">
              <span class="date">
                ${date}
              </span>
            </div>
            <div class="text">
                ${data.text}
            </div>
            <div class="actions">
              <a class="reply edit-comment">Edit</a>
              <a class="reply">
                <form id="del-comment-form" action="${actionUrl}/${data._id}?_method=DELETE" method="POST">
                  <button type="submit" id="del-comment">Delete</button>
                </form>
              </a>
            </div>
            <form id="edit-form" class="ui reply form edit-form" action="/blogs/${data._id}/comments/${data._id}?_method=PUT" method="POST">
              <div id="edit-comment-field" class="field">
                <input type="text" name="comment[text]" placeholder="Edit comment" value="${data.text}" required>
              </div>
              <button class="ui secondary button right-btn" style="background: #b6e565;">Edit</button>
              <a id="cancel" class="ui secondary button right-btn" style="background: #ff5b5b;">Cancel</a>
            </form>
          </div>
        </div>
        `
        )
        $("#add-comment-form").find("#form-input").val("");
    });
});

//edit comment
$(".ui.comments").on("submit", "#edit-form", function(e){
    e.preventDefault();
    var comment = $(this).serialize();
    var actionUrl = $(this).attr("action");
    var $originalComment = $(this).parent().parent();
    console.log($originalComment);
    $.ajax({
        url: actionUrl,
        data: comment,
        type: "PUT",
        originalItem: $originalComment, 
        success: function(data){
            var date;
            var currentTime = new Date();
            var createdTime = new Date(data.created);
            if(createdTime.getMonth() === currentTime.getMonth()){ 
                if(createdTime.getDate() === currentTime.getDate()){ 
                    date = "Today at "+ createdTime.getHours() +":"+ createdTime.getMinutes();
                }else if(currentTime.getDate() - createdTime.getDate() === 1){ 
                    date = "Yesterday at " + createdTime.getHours()+3 +":" + createdTime.getMinutes();
                }else if(currentTime.getDate() - createdTime.getDate() < 8){ 
                    date = currentTime.getDate() - createdTime.getDate() + " days ago";
                }
            }else{
                    date = createdTime.getDate()+"/"+ createdTime.getMonth()+1+"/"+ createdTime.getFullYear();
            }
            this.originalItem.html(
            `
              <a class="avatar">
                <img src="${data.author.avatar}">
              </a>
              <div class="content">
                <a class="author">${data.author.username}</a>
                <div class="metadata">
                  <span class="date">
                    ${date}
                  </span>
                </div>
                <div class="text">
                    ${data.text}
                </div>
                <div class="actions">
                  <a class="reply edit-comment">Edit</a>
                  <a class="reply">
                    <form id="del-comment-form" action="${actionUrl}?_method=DELETE" method="POST">
                      <button type="submit" id="del-comment">Delete</button>
                    </form>
                  </a>
                </div>
                <form id="edit-form" class="ui reply form edit-form" action="${actionUrl}?_method=PUT" method="POST">
                  <div id="edit-comment-field" class="field">
                    <input type="text" name="comment[text]" placeholder="Edit comment" value="${data.text}" required>
                  </div>
                  <button class="ui secondary button right-btn" style="background: #b6e565;">Edit</button>
                  <a id="cancel" class="ui secondary button right-btn" style="background: #ff5b5b;">Cancel</a>
                </form>
              </div>
            `    
            );
        }
    });
});

//delete comment
$(".ui.comments").on("submit", "#del-comment-form", function(e){
     e.preventDefault();
    var confirmResponse = confirm('Are you sure?');
    if(confirmResponse) {
		var actionUrl = $(this).attr('action');
		var $itemToDelete = $(this).closest('.comment');
		$.ajax({
			url: actionUrl,
			type: 'DELETE',
			itemToDelete: $itemToDelete,
			success: function(data) {
				this.itemToDelete.remove();
			}
		});
	} else {
		$(this).find('button').blur();
	}
});

//add like
$(".like-div").on("submit", ".add-like-form", function(e){
    e.preventDefault();
    var like = $(this).serialize();
    console.log(like);
    var actionUrl = $(this).attr("action");
    var $originalLike = $(this).parent(".like-div");
    $.ajax({
        url: actionUrl,
        data: like,
        type: "PUT",
        originalItem: $originalLike, 
        success: function(data){
            console.log(data);
            console.log("like: " + data.likes);
            this.originalItem.html(
            `
                <form class="minus-like-form" action="${actionUrl.replace("addlike", "minuslike")}" method="POST">
                  <input type="number" name="blog[likes]" value="${data.likes-1}" style="display:none;">
                  <span id="like">${data.likes} Like</span>
                  <button id="heart"><i id="heart-icon" class="heart icon red"></i></button>
                </form>
            `    
            );
        }
    });
});

//minus like
$(".like-div").on("submit", ".minus-like-form", function(e){
    e.preventDefault();
    var like = $(this).serialize();
    console.log(like);
    var actionUrl = $(this).attr("action");
    var $originalLike = $(this).parent(".like-div");
    $.ajax({
        url: actionUrl,
        data: like,
        type: "PUT",
        originalItem: $originalLike, 
        success: function(data){
            console.log(data);
            console.log(data.likes);
            this.originalItem.html(
            `
                <form class="add-like-form" action="${actionUrl.replace("minuslike", "addlike")}" method="POST">
                  <input type="number" name="blog[likes]" value="${data.likes+1}" style="display:none;">
                  <span id="like">${data.likes} Like</span>
                  <button id="heart"><i id="heart-icon" class="heart icon"></i></button>
                </form>
            `    
            );
        }
    });
});

//delete feeds
$(".ui.feed").on("submit", ".del-feed-form", function(e){
    e.preventDefault();
	var actionUrl = $(this).attr('action');
	var $itemToDelete = $(this).closest('.event');
    var $itemToFixRightMenu = $(this).closest(".event").parent().parent().siblings(".ui.card.left-side").children(".vertical.menu").children(".item.third-element");
    var $itemToFixRightMenuSmallScreen = $(this).closest(".event").parent().parent().siblings(".ui.fluid.item.menu").children(".item.third-element");
	var $itemToFixTopMenu = $(this).closest(".event").parent().parent().parent().parent().siblings(".ui.menu").children().children(".right.menu").children("#user-item").children("span");
	var $itemToFixTopMenuSmallScreen = $(this).closest(".event").parent().parent().parent().parent().siblings(".ui.vertical.menu.nav").children(".item.user").children("span");
	$.ajax({
		url: actionUrl,
		type: 'PUT',
		itemToChange: [$itemToDelete, $itemToFixRightMenu, $itemToFixRightMenuSmallScreen, $itemToFixTopMenu, $itemToFixTopMenuSmallScreen],
		success: function(data) {
			this.itemToChange[0].remove();
			this.itemToChange[1].html(
			`
			New Feed<span class="ui blue circular label">${data.feeds.length}</span>
			`    
			);
			this.itemToChange[2].html(
			`
			New Feed<i class="ui blue circular label">${data.feeds.length}</i>
			`    
			);
			if(data.feeds.length>0){
			    this.itemToChange[3].html(
			    `
			        ${data.feeds.length}
			    `
			    );
			    this.itemToChange[4].html(
			    `
			        ${data.feeds.length}
			    `
			    )
			}else{
			    this.itemToChange[3].remove();
			    this.itemToChange[4].remove();
			}
		}
	});
});

//edit image
$(".ui.dimmer").on("submit", "#edit-img-form", function(e){
    e.preventDefault();
    var img = $(this).serialize();
    var actionUrl = $(this).attr("action");
    var $originalItemRightMenu = $(this).parent().parent().parent().parent().siblings(".user-avatar-div");
    var $originalItemTopMenu = $(this).parent().parent().parent().parent().parent().parent().parent().parent().siblings(".ui.menu").children().children(".right.menu").children("#user-item").children("#top-ava")[0];
    var $originalItemTopMenuSmallScreen = $(this).parent().parent().parent().parent().parent().parent().parent().parent().siblings(".ui.vertical.menu.nav").children(".item.user").children("#top-ava")[0];
    $.ajax({
        url: actionUrl,
        data: img,
        type: 'PUT',
        originalItem: [$originalItemRightMenu, $originalItemTopMenu, $originalItemTopMenuSmallScreen],
        success: function(data){
            console.log(data);
            this.originalItem[0].html(
            `
                <img id="user-avatar" src="${data.avatar}">
            `    
            );
            this.originalItem[1].src = data.avatar;
            this.originalItem[2].src = data.avatar;
        }
    });
});

//following
$(".description").on("submit", "#follow-form", function(e){
    e.preventDefault();
    var $data = $(this).serialize();
    var actionUrl = $(this).attr("action");
    var $originalBtn = $(this).parent();
    console.log($originalBtn);
    var $originalNum = $(this).parent().parent().parent().siblings(".extra.content");
    console.log($originalNum);
    var $originalFollower = $(this).parent().parent().parent().parent().siblings("#follower").children();
    console.log($originalFollower);
    $.ajax({
        url: actionUrl,
        data: $data,
        type: 'PUT',
        originalItem: [$originalBtn, $originalNum, $originalFollower],
        success: function(data){
            console.log(data);
            this.originalItem[0].html(
            `
                <form id="unfollow-form" action="${actionUrl.replace("follow", "unfollow")}" method="POST">
                  <button id="active" class="ui button"><i class='user icon'></i>Followed</button>
                </form>
            `    
            );
            this.originalItem[1].html(
            `
                <a id="follower-btn">
                  <i class="user icon"></i>
                  ${data.follower.length} Followers
                </a>
            `    
            );
            var str;
            var index = data.follower.length-1;
            
            if(data.following.indexOf(data.follower[index])){
                str="Following"
            }else{
                str=""
            }
            if(data.follower.length-1===0){
                this.originalItem[2].html("");
            }
            this.originalItem[2].append(
            `
                <div class="card">
                  <div></div>
                  <img src="${data.follower[index].avatar}">
                  <div class="content">
                    <div class="header center"><a href="/users/${data.follower[index].id}">${data.follower[index].username}</a></div>
                    <div class="meta center">
                        ${str}
                    </div>
                  </div>
                  <div class="extra content">
                    <span class="right floated">
                       ${data.follower[index].blogs} Blogs
                    </span>
                    <span>
                      <i class="user icon"></i>
                        ${data.follower[index].follower} Followers
                    </span>
                  </div>
                </div>
            `    
            );
        }
    });
});

//unfolowing
$(".description").on("submit", "#unfollow-form", function(e){
    e.preventDefault();
    var $data = $(this).serialize();
    var actionUrl = $(this).attr("action");
    var $originalBtn = $(this).parent();
    var $originalNum = $(this).parent().parent().parent().siblings(".extra.content");
    var $originalFollower = $(this).parent().parent().parent().parent().siblings("#follower").children();
    $.ajax({
        url: actionUrl,
        data: $data,
        type: 'PUT',
        originalItem: [$originalBtn, $originalNum, $originalFollower],
        success: function(data){
            console.log(data);
            this.originalItem[0].html(
            `
                <form id="follow-form" action="${actionUrl.replace("unfollow", "follow")}" method="POST">
                  <button id="deactive" class="ui button"><i class='add user icon'></i>Following</button>
                </form>
            `    
            );
            this.originalItem[1].html(
            `
                <a id="follower-btn">
                  <i class="user icon"></i>
                  ${data.follower.length} Followers
                </a>
            `    
            );
            var index;
            this.originalItem[2].each(function(){
                var a = $(this).children().children().children(".header.center");
                var isFollower = [a.length];
                for(var i=0; i<a.length; i++){
                    isFollower[i] = false;
                }
                data.follower.forEach(function(follower){
                    console.log("x " + follower.username);
                    a.each(function(index){
                        console.log($(this).text());
                        if($(this).text() === follower.username){
                            isFollower[index]=true;
                        }
                    });
                });
                for(var i=0; i<a.length; i++){
                    if(isFollower[i]===false){
                        index = i+1;
                    }
                }
            });
            this.originalItem[2].children(".card:nth-child("+index.toString()+")").remove();
        }
    });
});