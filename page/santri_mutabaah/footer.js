function search_mutabaah(){
    $('.info-santri-mutabaah').hide();
    var txt = $('[name="search_santri_mutabaah"]').val().toLowerCase();
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

function addMutabaah(){
    label = event.currentTarget.dataset.label;
    id = event.currentTarget.dataset.id;
    $('.form-mutabaah')[0].reset();
    $('[name="kode_user"]').val(id);

    $.ajax({
        url : BASEURL+'mutabaah/detail/'+id,
        type: "GET",
        async: false,  
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        rss = data.data;
        var i;
        for (i = 0; i < rss.length; ++i) {
            $('.m'+rss[i]['id_master_mutabaah']).prop('checked', true);
        }

    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
    
    $('.title-mutabaah').text(label);
    $('.addMutabaah').modal('show');
}

function saveMutabaah(){
    $.ajax({
        url : BASEURL+'mutabaah/add',
        type: "POST",
        data: $('.form-mutabaah').serialize(),
        headers: {
            "Authorization": "Bearer " + getCookie('token')
        },
    success: function(data){
        loadSantri();
        $('.addMutabaah').modal('hide');
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
        $('.addMutabaah').modal('hide');
        loadSantri();
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

function loadSantri(){
    $('.sm-list').html('');
    $.ajax({
        url : BASEURL+'halaqah_santri/detailSantri/'+getUrlId(),
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
            $('.sm-list').append('<div class="item-list info-santri-mutabaah sm'+z+'">\
                <div class="avatar">\
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="..." class="avatar-img rounded-circle">\
                </div>\
                <div class="info-user ml-3">\
                    <div class="username">'+rss[i]['nama_santri']+'</div>\
                    <input type="hidden" name="sm-search" value="'+rss[i]['nama_santri']+'">\
                    <div class="status">'+rss[i]['kode_user']+'</div>\
                </div>\
                <a href="javascript:void(0)" onclick="addMutabaah()" data-label="'+rss[i]['nama_santri']+' ('+rss[i]['kode_user']+')" data-id="'+rss[i]['kode_user']+'" class="btn btn-'+color+' btn-round btn-xs">\
                    <i class="fa fa-'+icon+'"></i>\
                </a>\
            </div>').show('slow');;
            ++z;
        }

    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}


function loadMutabaah(){
    $('.list-mutabaah').html('');
    $.ajax({
        url : BASEURL+'m_mutabaah/mutabaah_list',
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
            if(check.indexOf(rss[i]['mutabaah_kategori']) == -1){
                $('.list-mutabaah').append('<tr>\
                    <td colspan="2">\
                        <label class="font-weight-bold">'+rss[i]['mutabaah_kategori']+'</label>\
                    </td>\
                </tr>\
                ');
                $('.list-mutabaah').append('<tr>\
                    <td>'+rss[i]['master_mutabaah']+'</td>\
                    <td><input type="checkbox" value="'+rss[i]['id_master_mutabaah']+'" name="nilai" class="check-mutabaah form-check-input m'+rss[i]['id_master_mutabaah']+'"/></td>\
                </tr>\
                ');
                check.push(rss[i]['mutabaah_kategori']);
            } else {
                $('.list-mutabaah').append('<tr>\
                    <td>'+rss[i]['master_mutabaah']+'</td>\
                    <td><input type="checkbox" value="'+rss[i]['id_master_mutabaah']+'" name="nilai" class="check-mutabaah form-check-input m'+rss[i]['id_master_mutabaah']+'"/></td>\
                </tr>\
                ');
            ++z;
            }
        }

    },
    error: function (xhr, status, error){
        rss = xhr.responseJSON;
    }
    });
}


function checkAllMutabaah(){
    status = $('.checkAllMutabaah').is(":checked");
    if (status == 'true') {
        $('.check-mutabaah').prop('checked', true);
    } else {
        $('.check-mutabaah').prop('checked', false);
    }
}