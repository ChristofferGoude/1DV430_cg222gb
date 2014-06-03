/**
 * @author Christoffer
 */

/* Functions to check login session */

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
            console.log(data);
            blogposts = JSON.parse(data);
            
            for(i = 0; i < Object.keys(blogposts).length; i++){
                console.log(blogposts[i].BlogpostID);
                console.log(blogposts[i].Title);
                console.log(blogposts[i].Blogpost);

                $(document).on("click", "." + blogposts[i].BlogpostID ,function() {
                    alert($(this).attr("class"));
                });
                
                $("#blogposts").append("<div class='sixteen columns'><h2 class='headline'> " + 
                                        blogposts[i].Title + 
                                        "</h2><p>" + 
                                        blogposts[i].Blogpost + 
                                        "</p></div>" +
                                        "<form action=''>" +
                                            "<label for='comment'>Lägg till kommentar</label>" +
                                            "<textarea id='comment' class='" + blogposts[i].BlogpostID + "'></textarea>" +
                                            "<button type='submit' id='submitcomment' class='" + blogposts[i].BlogpostID + "'>Kommentera</button>" +
                                        "</form>");
                
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
                alert("Denna användare hittades inte!");
            }
            else{
                $("#loginform").slideUp("slow");
                
                checkAdminStatus();
                document.getElementById("header").style.display = "none";
                document.getElementById("loggedinheader").style.display = "block";                
                
                $(".loggedinheader").html("<p>Välkommen " + data + "</p>");
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
            alert(data);
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
            document.getElementById("title").value = "";
            document.getElementById("blogpost").value = "";
            
            $("#admininterface").slideUp("slow");
            location.reload();
    });
});

/* Function for adding new comment */

$("#blogposts").on("click", function() {
    /*
     * Some testing
     */
    var classname = $("#submitcomment").attr("class");

    /* TODO: 
     * Fix so correct textarea and button is selected when commenting.
     * The id must be extracted from the button in order to place the comment at the corresponding blogpost.
     * Then this info is sent via a POST to functions.php
     */
    var blogpostID = "";
    var comment = "";
    
    $.ajax({
       type: "POST",
       url: "php/functions.php",
       data: {blogpostID:blogpostID, comment:comment}
       }).done(function(data){                
    });
});
