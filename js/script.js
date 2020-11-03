$(document).ready(() => {                                         

var tasks = 0;                                                     // stores the nomber of tasks in the list
// $("#removeAll").hide();                                          

/* add task new task hander */
$("#add").on("click", (event) => {                                  
    event.preventDefault();                                       
    event.stopPropagation();                                        
    var val = $("input").val();                                    
    if (val !=="") {                                              
        tasks += 1;                                                
        var elem = $("<li class='list-group-item'>").text(val);     
        $(elem).append("<div class='text-right'><button class='btn btn-danger'> X </button></div></li>");
        $("#mylist").append(elem);                 // append the new task element to mylist element
        //localStorage.setItem('cool-jwt', response.data.accessToken);
        $("input").val("");                                         // clear the input

        /* remove unique task hander */
        $(".text-right").on("click", function(event) {
            event.preventDefault();
            event.stopPropagation()
            tasks -= 1;
            $(this).parent().remove();
        });
        /* show removeAll button when we have more than 3 tasks */
    //     if(tasks > 2)  {
    //         $("#removeAll").show();
    //     }
    //     /* removeAll hander */
    //     $("#removeAll").on("click", (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         $(".disabled").siblings().remove();
    //         tasks = 0;
    //         $("#removeAll").hide();
    //     });
    // }
});
});
