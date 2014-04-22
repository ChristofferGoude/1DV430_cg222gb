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
        alert("Test av regformulär!");
    });
});
