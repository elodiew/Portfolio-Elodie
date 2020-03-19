$(function () {
    //************* NAV BAR ************//
    $(".navbar a, footer a").on("click", function (event) {

        event.preventDefault();
        var hash = this.hash;

        $('body,html').animate({
            scrollTop: $(hash).offset().top
        }, 900, function () {
            window.location.hash = hash;
        })
    });

    //************* PROGRESS BAR ************//
    $('.progress .progress-bar').css("width",
        function () {
            return $(this).attr("aria-valuenow") + "%";
        }
    )


    //************* TEXT H1 DEFILEMENT BONJOUR ************//
    var textWrapper = document.querySelector('.ml3');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({
            loop: false
        })
        .add({
            targets: '.ml3 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1000,
            delay: (el, i) => 100 * (i + 1)
        })

    /*TEXT H1 DEFILEMENT Je suis dev*/
    var textWrapper2 = document.querySelector('.ml2');
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({
            loop: false
        })
        .add({
            targets: '.ml2 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1000,
            delay: 5000,
            delay: (el, i) => 150 * (i + 1)
        })

    /*CONTACT*/
    $('#contact-form').submit(function (e) {
        e.preventDefault();
        $('.comments').empty();
        var postdata = $('#contact-form').serialize();

        $.ajax({
            type: 'POST',
            url: 'php/contact.php',
            data: postdata,
            dataType: 'json',
            success: function (json) {

                if (json.isSuccess) {
                    $('#contact-form').append("<p class='thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>");
                    $('#contact-form')[0].reset();
                } else {
                    $('#firstname + .comments').html(json.firstnameError);
                    $('#name + .comments').html(json.nameError);
                    $('#email + .comments').html(json.emailError);
                    $('#phone + .comments').html(json.phoneError);
                    $('#message + .comments').html(json.messageError);
                }
            }
        });
    });

});