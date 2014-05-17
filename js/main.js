$(function() {


    $.register = function(){
        var registrationIsValid= true;
        var registerData = new Object();
        registerData['username'] = $('#inputUsername').val();
        registerData['email'] = $('#inputEmail').val();
        registerData['password'] = $('#inputPassword').val();
        registerData['passwordConfirm'] = $('#inputPasswordConfirm').val();

        //TODO
		//UnitTests
        var emailpattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

        if(!emailpattern.test(registerData['email'])){
            registrationIsValid = false;
            $('#inputEmail').parent().parent().addClass("has-error");
        }else{
            $('#inputEmail').parent().parent().removeClass("has-error");
        }

        if(registerData['password']!=registerData['passwordConfirm'] || registerData['password']==""){
            registrationIsValid = false;
            $('#inputPassword,#inputPasswordConfirm').parent().parent().addClass("has-error");
        }else{
            $('#inputPassword,#inputPasswordConfirm').parent().parent().removeClass("has-error");
        }

        if(registerData['username']==""){
            registrationIsValid = false;
            $('#inputUsername').parent().parent().addClass("has-error");
        }else{
            $('#inputUsername').parent().parent().removeClass("has-error");
        }

		var registerDataWrapper = new Object();
		registerDataWrapper['users'] = new Array();
		registerDataWrapper['users'][0] = registerData;

		if(registrationIsValid){
            $.postRegister(registerDataWrapper,
                function(data){
                    $('#myModal').modal('hide');
                    $('#myModalConfirm').modal('show');
                    $('#myModal input').val('');
                },function(){

                    $('#inputUsername').parent().parent().addClass("has-error");
                });
        }
        console.log(registerData);
    }

});


