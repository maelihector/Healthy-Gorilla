$(document).ready(function () {

  var formLogin = $('#login-form');
  var formRegister = $('#register-form');
  var modalAnimateTime = 300;
  var divForms = $('#div-forms');
  var formLost = $('#lost-form');

  $('#login_register_btn').click(function () {
    modalAnimate(formLogin, formRegister);
  });
  $('#register_login_btn').click(function () {
    modalAnimate(formRegister, formLogin);
  });
  $('#login_lost_btn').click(function () {
    modalAnimate(formLogin, formLost);
  });
  $('#lost_login_btn').click(function () {
    modalAnimate(formLost, formLogin);
  });
  $('#lost_register_btn').click(function () {
    modalAnimate(formLost, formRegister);
  });
  $('#register_lost_btn').click(function () {
    modalAnimate(formRegister, formLost);
  });

  function modalAnimate(oldForm, newForm) {
    var oldH = oldForm.height();
    var newH = newForm.height();
    divForms.css("height", oldH);
    oldForm.fadeToggle(modalAnimateTime, function () {
      divForms.animate({
        height: newH
      }, modalAnimateTime, function () {
        newForm.fadeToggle(modalAnimateTime);
      });
    });
  }

});