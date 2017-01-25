$(function(){
    function addCDP(){
        console.log('Add AJAX');
        event.preventDefault();
        requestAsync($('#add_cdp'),'add');
    };
    function deleteCDP(){
        console.log('Delete AJAX');
        event.preventDefault();
        requestAsync($('#update'),'delete');
    };
    function editCDP(){
        console.log('Edit AJAX');
        event.preventDefault();
        requestAsync($('#update'),'edit');
    };
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