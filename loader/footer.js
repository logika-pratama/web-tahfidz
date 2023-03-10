function login2(){
    $.ajax({
        url : BASEURL+'users/login',
        type: "POST",
        data: $('.form-login').serialize(),
        headers: {
            "Authorization": "Basic " + btoa(USERNAME + ":" + PWD)
        },
    success: function(data){
        setCookie('token', data.token, 30);
        $.notify({
            icon: 'flaticon-success',
            title: 'Sukses',
            message: data.message,
        },{
            type: 'success',
            placement: {
                from: "top",
                align: "right"
            },
            time: 100,
        });
    },
    error: function (xhr, status, error){
        $.notify({
            icon: 'flaticon-error',
            title: 'Gagal',
            message: xhr.responseJSON.message,
        },{
            type: 'danger',
            placement: {
                from: "top",
                align: "right"
            },
            time: 100,
        });
    }
    });
}

function register2(){
    $.ajax({
        url : BASEURL+'users/tambah',
        type: "POST",
        data: $('.form-register').serialize(),
        headers: {
            "Authorization": "Basic " + btoa(USERNAME + ":" + PWD)
        },
    success: function(data){
        setCookie('token', data.token, 1);
        $.notify({
            icon: 'flaticon-success',
            title: 'Sukses',
            message: data.message,
        },{
            type: 'success',
            placement: {
                from: "top",
                align: "right"
            },
            time: 100,
        });
    },
    error: function (xhr, status, error){
        $.notify({
            icon: 'flaticon-error',
            title: 'Gagal',
            message: xhr.responseJSON.message,
        },{
            type: 'danger',
            placement: {
                from: "top",
                align: "right"
            },
            time: 100,
        });
    }
    });
}