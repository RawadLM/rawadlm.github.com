$(document).ready(function(){ 
    $('.carousel__inner').slick(
        {   dots: false,
            speed: 1200,                                   /* функция для слайда stick */
            adaptiveHeight: false,
            variableWidth: true,
        
            prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>', /* тут указаны пути и бозначение кнопок */
            nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
            responsive: [
                {
                    breakpoint: 992, /* разрешение для адаптации */
                    settings: {
                        dots: false,
                        arrows: false,
                        autoplay: true
                        }
                }
                
            ]     
        });
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this) /* ссылается на тот элэмэнт который мы нажали */
            .addClass('catalog__tab_active') /* если нажали на класс который не был активен,нам надо добавить ему класс активности active */
            .siblings()/* означает все табы на которые мы не нажали нужно удалить этот класс если он там присуствует*/
            .removeClass('catalog__tab_active')
            .closest('div.container')/* я должен найти ближайщий элэмэнт */
            .find('div.catalog__content')/* внутри него мне надо найти контент=> */
            .removeClass('catalog__content_active')/* у тех элэмэнтов которых нашли будем удалять класс актив */
            .eq($(this).index())/* получает тот номер элэмэнта на который мы нажали и при такой команде если скажем номер 2 то я буду получать контент под номером два */
            .addClass('catalog__content_active');
        });
        $('.catalog-item_link').each(function(i) {
            $(this).on('click',function(e){
                e.prevendefault();
                $('catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
        function toggleSlide(item) {
            $(item).each(function(i) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                })
            });
        };
    
        toggleSlide('.catalog-item__link');
        toggleSlide('.catalog-item__back');

        //modal

        $('[data-model=consultation]').on('click', function() {
            $('.overlay, #consultation').fadeIn('slow');
         });
        $('.modal__close').on('click', function (){
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        });

        $('.button_mini').each(function(i) {
            $(this).on('click', function() {
                $('#order .modal__descr').text(
                    $('.catalog-item__subtitle').eq(i).text())
                    $('.overlay, #order').fadeIn('slow');
            })
            })
            function validateForms(form){
                $(form).validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        phone: "required",
                        email: {
                            required: true,
                            email: true
                        }
                    },
                    messages: {
                        name: {
                            required: "Пожалуйста, введите свое имя",
                            minlength: jQuery.validator.format("Введите {0} символа!")
                          },
                        phone: "Пожалуйста, введите свой номер телефона",
                        email: {
                          required: "Пожалуйста, введите свою почту",
                          email: "Неправильно введен адрес почты"
                        }
                    }
                });
            };

            function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");


            /* когда все формы подтверждаются они отправляются */
    $('form').submit(function(e) {
        e.preventDefault();/* отменить стандартное поведение браузера */
        if(!$(this).valid()) {
            return; /* если форма не прошла валидацию то прекратим функцию т е ничего не сделаем */
        }
        $.ajax({/* для отправки данных на сервер */
            type: "POST",/* отправить данные в сервер */
            url: "mailer/smart.php",/* какой файл будет обрабатывать данные */
            data: $(this).serialize()/*  */
        }).done(function(){/* если все отправилось все ок то.. */
            $(this).find("input").val("");/* находим инпут и стераем данные */
            $('#consultation, #order').fadeOut();/* эти модальные окна после отправки мне не нужны и их закрываем */
            $('.overlay, #thanks').fadeIn('slow');/* после мне нужно модальное окно thanks и чтобы он появился медленно */

            $('form').trigger('reset');/* все мои формы толжни очиститься */
        });
                return false;   
    });

    /* page up and smooth scroll */

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    
    new WOW().init(); /* wow animation */   
});





























    /* /* const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false
      });
    document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
    })
    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
    }); */