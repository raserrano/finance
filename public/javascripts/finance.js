$(function(){
    $('.addCDP').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'add');
    });
    $('.deleteCDP').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'delete');
    });
    $('.editCDP').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'edit');
    });
    function requestAsync(query,action){
        console.log(query.serialize());
        // var chartData;
        // $(function(){
        //   $.AJAX({
        //     url: 'http://localhost:3300/fuelPrices',
        //     type: 'GET',
        //     success : function(data) {
        //       chartData = data;
        //       console.log(data);
        //     }
        //   });
        // });
        $.ajax({
            type: 'POST',
            data: query.serialize(),
            url: '/cdps/'+action,            
            success: function(data) {
                console.log('Funciono');
            }
        });
    }
});