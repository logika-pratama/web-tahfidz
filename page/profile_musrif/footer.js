function loadProfile(){
    rss = getData();
    setTimeout(function(){
        if(rss.telp_m != null){
            var date    = new Date(rss.tgl_lahir_m),
            yr      = date.getFullYear(),
            month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
            day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
            date = yr + '-' + month + '-' + day;
            
            $('[name="nama_musrif"]').val(rss.nama_musrif);
            $('[name="tgl_lahir"]').val(date);
            let tlp = rss.telp_m;
            let result = tlp.replace("+62","");
            $('[name="telp"]').val(result);
            $('[name="alamat"]').val(rss.alamat_m);
            $('[name="gol_darah"]').val(rss.gol_darah_m);
            $('[name="hafalan"]').val(rss.hafalan);
            $('[name="instansi"]').val(rss.instansi);
            $('[name="pendidikan"]').val(rss.pendidikan);
        }
    }, 1000);
}

function update_musrif(){
    $.ajax({
        url : BASEURL+'users/update_musrif',
        type: "POST",
        data: $('.form-profile-musrif').serialize(),
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
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