/**
 * @author Christoffer
 */

/* Functions to check login session */

window.onload = function(){
    if(document.getElementById("header").style.display == "none")
    {
        document.getElementById("header").style.display == "block";
    }
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
    var password = document.getElementById("password").value;
    
    $.ajax({
        type: "POST",
        url: "php/functions.php",
        data: {loginusername:loginusername, loginpassword:loginpassword}
        }).done(function(data){
            alert(data);
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
    var username = document.getElementById("registername").value;
    var password = document.getElementById("registerpassword").value;
    
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
    
    alert("TEST");
    
    /*TODO: Fix this, dunno what is the issue at the moment, no post to functions.php though.. */
    $.ajax({
       type: "POST",
       url: "php/functions.php",
       data: {title:title, blogpost:blogpost}
       }).done(function(data){
           alert(data);
    });
});