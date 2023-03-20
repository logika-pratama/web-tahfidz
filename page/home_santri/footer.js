
function getDashboard(){
    $('.calendar').empty();
    setTimeout(function(){
        let c = $('.calendar');
        let calendar = new Calendar(c);
    },1000);
}

function showdetail(){
    day = event.currentTarget.dataset.day;
    month = event.currentTarget.dataset.month;
    year = event.currentTarget.dataset.year;
    $('.showMutabaah').modal('show');
    $('.title-mutabaah-detail').text(day+'/'+month+'/'+year);

    $('.list-mutabaah-detail').html('');
    $.ajax({
        url : BASEURL+'m_mutabaah/mutabaah_list_detail/'+day+'/'+month+'/'+year,
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
            if(rss[i]['nilai'] == null){
                var btns = '<a href="javascript:void(0)" class="btn btn-danger btn-sm"><i class="fa fa-times"></i></a>';
            } else {
                var btns = '<a href="javascript:void(0)" class="btn btn-success btn-sm"><i class="fa fa-check"></i></a>';
            }
            if(check.indexOf(rss[i]['mutabaah_kategori']) == -1){
                $('.list-mutabaah-detail').append('<tr>\
                    <td colspan="2">\
                        <label class="font-weight-bold">'+rss[i]['mutabaah_kategori']+'</label>\
                    </td>\
                </tr>\
                ');
                $('.list-mutabaah-detail').append('<tr>\
                    <td>'+rss[i]['master_mutabaah']+'</td>\
                    <td>'+btns+'</td>\
                </tr>\
                ');
                check.push(rss[i]['mutabaah_kategori']);
            } else {
                $('.list-mutabaah-detail').append('<tr>\
                    <td>'+rss[i]['master_mutabaah']+'</td>\
                    <td>'+btns+'</td>\
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
