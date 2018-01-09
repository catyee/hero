require( '../../scss/reset-complete.scss' );

let app = {
    init:{}
}

app.init = function () {
    this.bind();
}

app.bind = function () {
    $('#login').click(function () {
        $.cookie('id',null);
        window.location.href = 'login.html';
    })
}

$(function () {
    app.init();
})