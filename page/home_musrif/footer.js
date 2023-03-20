function getListHome(){
    var check = getData();
    if(check.status_user == 'aktif'){
        $('.table-mutabaah').html('');
        $('.table-tahfidz').html('');
        if(check.hakakses_user == 'musrif'){
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
                            $('.table-mutabaah').append('<tr><td>'+no+'</td><td><a href="javascript:void(0)"  data-id="'+halaqah[i]['id_halaqah_santri']+'" data-name="'+halaqah[i]['halaqah']+'" onclick="changePage('+"'santri_mutabaah'"+')"><span class="sub-item font-weight-bold">'+halaqah[i]['halaqah']+'</span></a></td><td style="width:5%"><a href="javascript:void(0)" data-id="'+halaqah[i]['id_halaqah_santri']+'" data-name="'+halaqah[i]['halaqah']+'" onclick="changePage('+"'santri_mutabaah'"+')" class="btn btn-sm btn-info"><i class="fas fa-arrow-right"></i></a></td></tr>');
                            $('.table-tahfidz').append('<tr><td>'+no+'</td><td><a href="javascript:void(0)" data-id="'+halaqah[i]['id_halaqah_santri']+'" data-name="'+halaqah[i]['halaqah']+'" onclick="changePage('+"'santri_tahfidz'"+')"><span class="sub-item font-weight-bold">'+halaqah[i]['halaqah']+'</span></a></td><td style="width:5%"><a href="javascript:void(0)" class="btn btn-sm btn-info" data-id="'+halaqah[i]['id_halaqah_santri']+'" data-name="'+halaqah[i]['halaqah']+'" onclick="changePage('+"'santri_tahfidz'"+')"><i class="fas fa-arrow-right"></i></a></td></tr>');
                            ++no;
                        }
                    },
                    error: function (xhr, status, error){
                        rss = xhr.responseJSON;
                    }
                });
        }
    } 
}