var BASEURL = 'http://192.168.100.183:3000/';
// var BASEURL ='http://151.106.112.34:3012/';
var USERNAME ='4b9gbm2py3r3f83';
var PWD = '9dpfdr3f83'; 


$('.load-content').hide();
var halaqah;
var kelas;
var santri;
var paging;
let maxsurah;

function getData(){
    var rss;
    if(getCookie('token') != ""){
        $.ajax({
            url : BASEURL+'users/getData',
            type: "GET",
            async: false,  
            headers: {
                "Authorization": "Bearer " + getCookie('token')
            },
        success: function(data){
            rss = data.data[0];
        },
        error: function (xhr, status, error){
            rss = xhr.responseJSON;
            setCookie('token','',0);
            setCookie('aktifasi','',0);
        }
        });
    }
    return rss;
}


$( document ).ready(function() {
    paging = getUrl();
    if(getCookie('token') != ""){
        getMenu();
    }
});

function getUrl(){
    var row = window.location.href;
    var result = row.split('?');
    if(result[1] == undefined){
        paging = 'home';
    } else {
        paging = result[1];
    }
    return paging;
}

function getUrlId(){
    var row = window.location.href;
    var result = row.split('?');
    if(result[2] == undefined){
        paging = 'home';
    } else {
        paging = result[2];
    }
    return paging;
}

setInterval(function (){
    if(getCookie('token') != ""){
        if(getCookie('aktifasi') == 1){
            page = $('[name="paging"]').val();
            if(page != getUrl()){
                $('.changepage').load('page/'+getUrl()+'/content.html');
                $('[name="paging"]').val(getUrl());
                loadData(getUrl());
            }
            $('.modul_login').hide();
            $('.modul').show();
            $('.aktifasi').hide();
            $('.register').hide();
        }else if(getCookie('aktifasi') == 2){
            $('.modul_login').hide();
            $('.modul').hide();
            $('.aktifasi').hide();
            $('.register').show();
        } else {
            var check = getData();
            if(check.status_user == 'aktif'){
                setCookie('aktifasi',2,30);
            }
            $('.modul_login').hide();
            $('.modul').hide();
            $('.aktifasi').show();
            $('.register').hide();
        }
    } else {
        $('.modul_login').show();
        $('.modul').hide();
        $('.aktifasi').hide();
        $('.register').hide();
    }
}, 500);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout_sess(){
    setCookie('token','',0);
    setCookie('aktifasi','',0);
    $('#pills-login-tab').addClass('active');
    $('#pills-login').addClass('show active');
    $('#pills-register-tab').removeClass('active');
    $('#pills-register').removeClass('show active');

    $.notify({
        icon: 'flaticon-success',
        title: 'Sukses',
        message: 'Anda Berhasil Logout',
    },{
        type: 'success',
        placement: {
            from: "top",
            align: "right"
        },
        time: 100,
    });
}


function changePage(char){
    id = event.currentTarget.dataset.id;
    name_page = event.currentTarget.dataset.name;
    $('[name="id_page"]').val(id);
    $('[name="name_page"]').val(name_page);
    $('html').removeClass('nav_open');
    window.history.pushState({}, '', 'index.html?'+char+'?'+id);
    loadData(char)
}   

function loadData(char){
    setTimeout(function(){
    if(char == 'santri_mutabaah'){
        loadSantri();
        loadMutabaah();
    } else if(char == 'santri_tahfidz') {
        loadtahfidz();
        loadSantriTahfidz();
        surah_list();
    } else if(char == 'home_musrif'){
        getListHome();
    } else if(char == 'profile_musrif'){
        loadProfile();
    }
    },1000)
}