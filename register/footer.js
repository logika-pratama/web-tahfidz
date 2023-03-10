function register_santri(){
    $.ajax({
        url : BASEURL+'users/tambah_santri',
        type: "POST",
        data: $('.form-santri').serialize(),
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        setCookie('token', data.token, 3600);
        setCookie('aktifasi', 1, 360);
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

function register_musrif(){
    $.ajax({
        url : BASEURL+'users/tambah_musrif',
        type: "POST",
        data: $('.form-musrif').serialize(),
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        setCookie('token', data.token, 3600);
        setCookie('aktifasi', 1, 360);
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