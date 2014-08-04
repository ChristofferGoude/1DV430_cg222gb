/**
 * @author Christoffer
 */

/* Functions happening on page load */
/* Controls collection of all blogposts and comments */
/* Also contains functions for adding comments through dynamic textareas */

window.onload = function(){
    $.ajax({
        type: "GET",
        url: "php/functions.php",
        data: {onload:"onload"}
        }).done(function(data){
            if(data != false){
                checkAdminStatus();
                
                document.getElementById("header").style.display = "none";
                document.getElementById("loggedinheader").style.display = "block";

                $(".loggedinheader").append("Välkommen " + data);
            }
    });
    
    $.ajax({
        type: "GET",
        url: "php/functions.php",
        datatype:"json",
        data: {getblogposts:"getblogposts"}
        }).done(function(data){
            blogposts = JSON.parse(data);
            
            for(i = 0; i < Object.keys(blogposts).length; i++){          
                $(document).on("click", "." + blogposts[i].BlogpostID ,function() {              
                    var blogpostID = $(this).attr("class");
                    var comment = $("#comment.comment" + blogpostID).val();
                    
                    addNewComment(blogpostID, comment);
                });

                $("#blogposts").prepend("<div><h2 class='headline'> " + 
                                        blogposts[i].Title + 
                                        "</h2><p>" + 
                                        blogposts[i].Blogpost + 
                                        "</p></div>" +
                                        "<form action=''>" +
                                            "<label for='comment'>Lägg till kommentar</label>" +
                                            "<textarea id='comment' class='comment" + blogposts[i].BlogpostID + "'></textarea>" +
                                            "<button type='submit' id='submitcomment' class='" + blogposts[i].BlogpostID + "'>Kommentera</button>" +
                                        "</form>" + 
                                        "<div id='comments' class='comments" + blogposts[i].BlogpostID + "'<p>Kommentarer:</p></div>");
                                        
            	
                $.ajax({
			        type: "GET",
			        url: "php/functions.php",
			        datatype:"json",
			        data: {getcomments:blogposts[i].BlogpostID}
			        }).done(function(data){
			            comments = JSON.parse(data);
			            
			            for(i = 0; i < Object.keys(comments).length; i++){
			            	$("#comments.comments" + comments[i].BlogpostID).after("<h5>" + comments[i].User + "</h5>" +
	            	                                                "<p>" + comments[i].Comment + "</p>");
			            }
			    });
            }
    });
};

/* Functions for login */

$("#login").click(function() {   
    if(document.getElementById("loginform").style.display == "block")
    {
        $("#loginform").slideUp("slow");
        
    }
    else{
        $("#loginform").slideDown("slow");
    }
});

$("#submitlogin").click(function() {
    var loginusername = document.getElementById("name").value;
    var loginpassword = document.getElementById("password").value;
    
    $.ajax({
        type: "POST",
        url: "php/functions.php",
        data: {loginusername:loginusername, loginpassword:loginpassword}
        }).done(function(data){
            if(data == false){
                showAlert("Denna användare hittades inte!");
            }
            else{
                $("#loginform").slideUp("slow");
                
                checkAdminStatus();
                document.getElementById("header").style.display = "none";
                document.getElementById("loggedinheader").style.display = "block";                
                
                $(".loggedinheader").html("Välkommen " + data);
            }
    });
});

function checkLoginStatus(){
    $.ajax({
        type: "GET",
        url: "php/functions.php",
        data: {checkloginstatus:"checkloginstatus"}
        }).done(function(data){
            if(data != false){
                document.getElementsByClassName("comment").disabled = false;
            }
            else if(data == false){
                document.getElementsByClassName("comment").disabled = true;
            }
    });
}

function checkAdminStatus(){
    $.ajax({
        type: "GET",
        url: "php/functions.php",
        data: {checkadminstatus:"checkadminstatus"}
        }).done(function(data){
            if(data != false){
                document.getElementById("admin").style.display = "block";
            }
            else if(data == false){
                document.getElementById("admin").style.display = "none";
            }
    });
}

/* Functions for logout */

$("#logout").click(function() {   
        $.ajax({
        type: "GET",
        url: "php/functions.php",
        data: {logout:"logout"}
        }).done(function(data){
            if(data != false){
                document.getElementById("admin").style.display = "none";
                document.getElementById("loggedinheader").style.display = "none";
                document.getElementById("header").style.display = "block";

                $(".loggedinheader").empty();
            }
    });
});

/* Functions for registring */

$("#register").click(function() {   
    if(document.getElementById("registerform").style.display == "block")
    {
        $("#registerform").slideUp("slow");
        document.getElementById("registername").value = "";
        document.getElementById("registerpassword").value = "";
    }
    else{
        $("#registerform").slideDown("slow");
    }
});

$("#submitregister").click(function() {  
    var registerusername = document.getElementById("registername").value;
    var registerpassword = document.getElementById("registerpassword").value;
    
    $.ajax({
        type: "POST",
        url: "php/functions.php",
        data: {registerusername:registerusername, registerpassword:registerpassword}
        }).done(function(data){
            showAlert(data);
    });
});

/* Functions for new blog post */

$("#admin").click(function(){
    if(document.getElementById("admininterface").style.display == "block")
    {
        $("#admininterface").slideUp("slow");
    }
    else
    {
        $("#admininterface").slideDown("slow");
    }
});

$(".back").click(function(){
    $("#admininterface").slideUp("slow");
});

$("#submitblogpost").click(function() {
    var title = document.getElementById("title").value;
    var blogpost = document.getElementById("blogpost").value;
    
    $.ajax({
       type: "POST",
       url: "php/functions.php",
       data: {title:title, blogpost:blogpost}
       }).done(function(data){     
            showAlert(data);
                      
            document.getElementById("title").value = "";
            document.getElementById("blogpost").value = "";
            
            $("#admininterface").slideUp("slow");
            setTimeout(function(){
                location.reload();             
            }, 3000);
            
    });
});

/* Function for adding new comment */

function addNewComment(blogpostID, comment){
    $.ajax({
        type: "POST",
        url: "php/functions.php",
        data: {blogpostID:blogpostID, comment:comment}
        }).done(function(data){
            showAlert(data);
            
            setTimeout(function(){
                location.reload();             
            }, 3000);
    });
}

/* Function for showing alerts */

function showAlert(message){
    var alerts = $("#alerts");    
    
    alerts.empty();
    alerts.append(message);
    alerts.slideDown();
    alerts.delay(1500).slideUp();
}















