$(function(){
    $('.addCDP').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/cpds/add');
    });
    $('.deleteCDP').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/cpds/delete');
    });
    $('.editCDP').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/cpds/edit');
    });
    $('.addInterest').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/interests/add');
    });
    $('.deleteInterest').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/interests/delete');
    });
    $('.editInterest').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/interests/edit');
    });
    $('.loginBtn').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/users/login');
    });
    $('#loanCalculate').on('click',function(event){
        event.preventDefault();
        requestAsync($(this).closest('form'),'/loans/calculate','.result');
    });
    function requestAsync(query,action,target){
        $.ajax({
            type: 'POST',
            data: query.serialize(),
            url: action,
            dataType: "html",
            success: function(data) {
                $(target).html(data);
            }
        });
    }
});