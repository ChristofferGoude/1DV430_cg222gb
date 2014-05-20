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
                document.getElementById("header").style.display = "none";
                document.getElementById("loggedinheader").style.display = "block";

                $(".loggedinheader").html("<p>Välkommen " + data + "</p>");
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
                document.getElementById("header").style.display = "none";
                document.getElementById("loggedinheader").style.display = "block";
                
                $(".loggedinheader").html("<p>Välkommen " + data + "</p>");
            }
    });
});

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

$("#submitblogpost").click(function() {
    var title = document.getElementById("title").value;
    var blogpost = document.getElementById("blogpost").value;
    
    /*TODO: Fix this, dunno what is the issue at the moment, no post to functions.php though.. */
    $.ajax({
       type: "POST",
       url: "php/functions.php",
       data: {title:title, blogpost:blogpost}
       }).done(function(data){
           alert(data);
    });
});