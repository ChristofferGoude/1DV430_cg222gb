/**
 * @author Christoffer
 */

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
    alert("Skicka loginformulär!");
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
    data: {username:username, password:password}
    }).done(function(data){
        console.log(data);
    });
});

/* Functions for new blog post */

$("submitblogpost").click(function() {
    var title = document.getElementById("title").value;
    var blogpost = document.getElementById("blogpost").value;
    
    $.ajax({
        type: "POST",
        url: "php/functions.php",
        data: {title:title, blogpost:blogpost}
        }).done(function(data){
            alert(data);
    });
    
});
