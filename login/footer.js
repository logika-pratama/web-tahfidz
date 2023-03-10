function login(){
    $.ajax({
        url : BASEURL+'users/login',
        type: "POST",
        data: $('.form-login').serialize(),
        headers: {
            "Authorization": "Basic " + btoa(USERNAME + ":" + PWD)
        },
    success: function(data){
        setCookie('token', data.token, 3600);
        setCookie('aktifasi', data.aktifasi, 3600);
        getMenu();
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

function register(){
    $.ajax({
        url : BASEURL+'users/tambah',
        type: "POST",
        data: $('.form-register').serialize(),
        headers: {
            "Authorization": "Basic " + btoa(USERNAME + ":" + PWD)
        },
    success: function(data){
        setCookie('token', data.token, 3600);
        setCookie('aktifasi', 0, 5);
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

function getMenu(){
    var check = getData();
    if(check.status_user == 'aktif'){
        $('.table-mutabaah').html('');
        $('.table-tahfidz').html('');
        if(check.hakakses_user == 'musrif'){
            $('.submenu-user').load('sidebar/mutabaah_sidebar.html');
            setTimeout(function(){
                $('.p_name').text(check.nama_musrif);
                $('.p_status').text(check.hakakses_user);
                    $.ajax({
                        url : BASEURL+'halaqah_santri/listmusrif',
                        type: "GET",
                        async: false,  
                        headers: {
                            "Authorization": "Bearer " + getCookie('token')
                        },
                    success: function(data){

                        halaqah = data.data;
                        var i;
                        var no = 1;
                        for (i = 0; i < halaqah.length; ++i) {
                            $('.sub-mutabaah').append('<li><a href="javascript:void(0)"  data-id="'+halaqah[i]['id_halaqah_santri']+'" data-name="'+halaqah[i]['halaqah']+'" onclick="changePage('+"'santri_mutabaah'"+')"><span class="sub-item">'+halaqah[i]['halaqah']+'</span></a></li>');
                            $('.sub-tahfidz').append('<li><a href="javascript:void(0)" data-id="'+halaqah[i]['id_halaqah_santri']+'" data-name="'+halaqah[i]['halaqah']+'" onclick="changePage('+"'santri_tahfidz'"+')"><span class="sub-item">'+halaqah[i]['halaqah']+'</span></a></li>');
                            ++no;
                        }
                    },
                    error: function (xhr, status, error){
                        rss = xhr.responseJSON;
                    }
                });

            }, 1000);
        } else if(check.hakakses_user == 'santri'){
            $('.submenu-user').load('sidebar/santri.html');
            setTimeout(function(){
            }, 1000);
        }
    } 
}