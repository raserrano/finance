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