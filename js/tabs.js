$('ul.catalog_-tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)/* ссылается на тот элэмэнт который мы нажали */
    /* если нажали на класс который не был активен,нам надо добавить ему класс активности active */
      .addClass('catalog__tab_active')
      .siblings(/* означает все табы на которые мы не нажали нужно удалить этот класс если он там присуствует*/).removeClass('catalog__tab_active')
      /* я должен найти ближайщий элэмэнт */
      .closest('div.container')
      /* внутри него мне надо найти контент=> */
      .find('div.catalog__content')/* у тех элэмэнтов которых нашли будем удалять класс актив */.removeClass('catalog__content_active')
      /* получает тот номер элэмэнта на который мы нажали и при такой команде если скажем номер 2 то я буду получать контент под номером два */
      .eq($(this).index()).addClass('catalog__content_active');
  });
  