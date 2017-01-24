$(function(){
    $('#addCDP').click(function(e){
        e.preventDefault();
        request($('#add_cdp'),'add');
    });
    $('#deleteCDP').click(function(e){
        e.preventDefault();
        request($('#update'),'delete');
    });
    $('#editCDP').click(function(e){
        e.preventDefault();
        request($('#update'),'edit');
    });
    function request(form,action){
        // var query=$(form).serialize();
        console.log(JSON.stringify(form.serialize()));
        // $.ajax({
        //     type: 'POST',
        //     data: query,
        //     contentType: 'application/json',
        //     url: '/cdps/'+action,            
        //     success: function(data) {
        //         console.log(JSON.stringify(data));
        //     }
        // });
    }
    // $('#select_link').click(function(e){
    //     e.preventDefault();
    //     console.log('select_link clicked');
    //     var data = {};
    //     data.title = "title";
    //     data.message = "message";

    //     $.ajax({
    //         type: 'POST',
    //         data: JSON.stringify(data),
    //         contentType: 'application/json',
    //         url: 'http://localhost:3000/endpoint',            
    //         success: function(data) {
    //             console.log('success');
    //             console.log(JSON.stringify(data));
    //         }
    //     });
    // });
});