function search_tahfidz(){
    $('.info-santri-tahfidz').hide();
    var txt = $('[name="search_santri_tahfidz"]').val().toLowerCase();
    var dataArray = $(".searching").serializeArray();
    var x = 1;
    $(dataArray).each(function(i, field){
            str = field.value.toLowerCase();
            if(str.includes(txt) == true){
                $('.sm'+x).show();
            };
            ++x;
      }); 
}

function addtahfidz(){
    label = event.currentTarget.dataset.label;
    id = event.currentTarget.dataset.id;
    id_halaqah_santri = event.currentTarget.id_halaqah_santri;
    
    todaydate = new Date();
    var dd = todaydate .getDate();
    var mm = todaydate .getMonth()+1;
    var yyyy = todaydate .getFullYear();
    if(dd<10){  dd='0'+dd } 
    if(mm<10){  mm='0'+mm } 
    var date = dd+'-'+mm+'-'+yyyy;

    $('.form-tahfidz')[0].reset();
    $('[name="kode_user"]').val(id);
    $('[name="id_halaqah_santri"]').val(id_halaqah_santri);

    $('.t-santri').val(label);
    $('.t-tanggal').val(date);
    $('.addtahfidz').modal('show');

    $.ajax({
        url : BASEURL+'tahfidz/getLast/'+id,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        if(data.data[0]['surah_from'] == null){
            $('.hafalan-terakhir').hide();
        } else {

            timers = new Date(data.data[0]['tgl_tahfidz']);
            var jam = timers.getHours();
            var menit = timers.getMinutes();
            var timer = jam+':'+menit;

            $('.hafalan-terakhir').show();
            var title = data.data[0]['tipe_tahfidz']+" "+timer;
            $('.tahfidz-title').text(title);
            if(data.data[0]['surah_to'] == null){
                $('.last-surah').hide();
                var fsurah = data.data[0]['surah_from']+" ayat "+data.data[0]['ayat_from_first']+" - "+data.data[0]['ayat_from_last'];
                $('.first-surah').text(fsurah);
            } else {
                var fsurah = data.data[0]['surah_from']+" ayat "+data.data[0]['ayat_from_first']+" - "+data.data[0]['ayat_from_last'];
                $('.first-surah').text(fsurah);
            
                var lsurah = data.data[0]['surah_to']+" ayat "+data.data[0]['ayat_to_first']+" - "+data.data[0]['ayat_to_last'];
                $('.last-surah').text(lsurah);
                $('.last-surah').show();
            }
        }
    },error: function (xhr, status, error){
        $('.hafalan-terakhir').hide();
    }
    });
}

function savetahfidz(){
    $.ajax({
        url : BASEURL+'tahfidz/add',
        type: "POST",
        data: $('.form-tahfidz').serialize(),
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        loadSantriTahfidz();
        $('.addtahfidz').modal('hide');
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
        $('.addtahfidz').modal('hide');
        loadSantriTahfidz();
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

function loadSantriTahfidz(){
    $('.sm-list').html('');
    $.ajax({
        url : BASEURL+'tahfidz/detailSantri/'+getUrlId(),
        type: "GET",
        async: false,  
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        rss = data.data;
        var i;
        var z = 1;
        for (i = 0; i < rss.length; ++i) {
            if(rss[i]['TOTAL'] > 0){
                color = 'success';
                icon = 'check';
            } else {
                color = 'primary';
                icon = 'plus';
            }
            $('.sm-list').append('<div class="item-list info-santri-tahfidz sm'+z+'">\
                <div class="avatar">\
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="..." class="avatar-img rounded-circle">\
                </div>\
                <div class="info-user ml-3">\
                    <div class="username">'+rss[i]['nama_santri']+'</div>\
                    <input type="hidden" name="sm-search" value="'+rss[i]['nama_santri']+'">\
                    <div class="status">'+rss[i]['kode_user']+'</div>\
                </div>\
                <a href="javascript:void(0)" onclick="addtahfidz()" data-label="'+rss[i]['nama_santri']+' ('+rss[i]['kode_user']+')" data-id_halaqah_santri="'+rss[i]['id_halaqah_santri']+'" data-id="'+rss[i]['kode_user']+'" class="m-1 btn btn-'+color+' btn-round btn-xs">\
                    <i class="fa fa-'+icon+'"></i>\
                </a>\
                <a href="javascript:void(0)" onclick="detailtahfidz()" data-label="'+rss[i]['nama_santri']+' ('+rss[i]['kode_user']+')" data-id="'+rss[i]['kode_user']+'" data-id_halaqah_santri="'+rss[i]['id_halaqah_santri']+'" class="m-1 btn btn-warning btn-round btn-xs">\
                    <i class="fa fa-eye"></i>\
                </a>\
            </div>');
            ++z;
        }

    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}

function detailtahfidz(){
    $('.showtahfidz').modal('show');
    label = event.currentTarget.dataset.label;
    id = event.currentTarget.dataset.id;

    $('.list-tahfidz').html('');
    $.ajax({
        url : BASEURL+'tahfidz/detail/'+id,
        type: "GET",
        async: false,  
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        rss = data.data;
        check = [];
        var i;
        var z = 1;
        for (i = 0; i < rss.length; ++i) {
            $('.list-tahfidz').append('<tr>\
                <td>'+rss[i]['time']+'</td>\
                <td>'+rss[i]['surat1']+' dari '+rss[i]['ayat_from_first']+' ke '+rss[i]['ayat_from_last']+'</td>\
                <td><a href="javascript:void(0)" onclick="deletetahfidz()" data-id="'+rss[i]['id_tahfidz']+'" class="m-1 btn btn-danger btn-round btn-xs"><i class="fa fa-trash"></i></a></td>\
            </tr>\
            ');
        }
    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}


function loadtahfidz(){
    $('.list-tahfidz').html('');
}

function surah_list(){
    $.ajax({
        url : BASEURL+'surah/list/',
        type: "GET",
        async: false,  
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        rss = data.data;
        var i;
        for (i = 0; i < rss.length; ++i) {
            $('.m-surah').append($('<option>',
            {
               value: rss[i]['id_master_surah'],
               text : rss[i]['surah']
            }));
        }
    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}

function m_surah1(){
    id = $('.m-surah1').val();
    $('.surah1-to').html('');
    $('.surah1-from').html('');
    $.ajax({
        url : BASEURL+'surah/detail/'+id,
        type: "GET",
        async: false,  
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        rss = data.data[0];
        maxsurah = rss['jumlah_ayat'];
        for (i = 0; i < rss['jumlah_ayat']; ++i){
            $('.surah1-to').append($('<option>',
            {
               value: i+1,
               text : i+1
            }));
            $('.surah1-from').append($('<option>',
            {
               value: i+1,
               text : i+1
            }));
        }

        $('.surah1-to').val(rss['jumlah_ayat']).change();
    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}

function m_surah2(){
    id = $('.m-surah2').val();
    $('.surah2-to').html('');
    $('.surah2-from').html('');
    $.ajax({
        url : BASEURL+'surah/detail/'+id,
        type: "GET",
        async: false,  
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        rss = data.data[0];
        for (i = 0; i < rss['jumlah_ayat']; ++i){
            $('.surah2-to').append($('<option>',
            {
               value: i+1,
               text : i+1
            }));
            $('.surah2-from').append($('<option>',
            {
               value: i+1,
               text : i+1
            }));
        }

        $('.surah2-to').val(rss['jumlah_ayat']).change();
    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}

function surahHide(){
    var surahto = $('.surah1-to').val();
    if(maxsurah == surahto){
        $('.toHide').show();
    } else {
        $('.toHide').hide();
    }
}

function deletetahfidz(){
    id = event.currentTarget.dataset.id;
    swal({
        title: 'Peringatan?',
        text: "Apa kamu yaking menghpus data ini!",
        type: 'warning',
        buttons:{
            confirm: {
                text : 'Ya, Hapus!',
                className : 'btn btn-success'
            },
            cancel: {
                visible: true,
                className: 'btn btn-danger'
            }
        }
    }).then((Delete) => {
        $.ajax({
            url : BASEURL+'tahfidz/delete/'+id,
            type: "DELETE",
            async: false,  
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
            $('.showtahfidz').modal('hide');
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
    });
}
