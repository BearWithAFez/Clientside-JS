;
(function($) {
    'use strict'

    $(document).ready(function() {
        // vars
        var $btnFlip;
        var $frontMsg;
        var $frPicCont;
        var $lnkFav;
        var $lnkNxtQuote;
        var $lnkTrash;
        var $dialogDel;

        // Add shortcuts
        $btnFlip = $('.js-flip');
        $frontMsg = $('.front__message').first();
        $frPicCont = $('.front__picture');
        $lnkFav = $('.js-fav');
        $lnkNxtQuote = $('.quote__next');
        $lnkTrash = $('.js-trash');
        $dialogDel = $('#dialog-delete');

        // Sort all cards
        $('.page__main').sortable({
            forceHelperSize: true,
            helper: 'clone',
            stop: function(event, ui) {
                // Get new order
                var ids = [];
                for(var i=0; i < $('.card').length ; i++){
                    ids.push(parseInt($('.card').eq(i).attr('data-contact-id')));
                }
                console.log(ids);

                // Set that in the db
                $.ajax({
                url: 'api.php',
                type: 'GET',
                data: {
                    action: 'changeIds',
                    ids: ids
                },
                success: function(data) {
                    console.log(
                        data
                    );

                },
                error: function(err) {
                    console.log(
                        err
                    );
                }
            });
            }
        });

        // Add to each favorite icon the "toggle fav" event
        $lnkFav.on('click', function(e) {
            var $that = $(this);

            $.ajax({
                url: 'api.php',
                type: 'GET',
                data: {
                    action: 'setfav',
                    id: $that.parents('.card').attr('data-contact-id')
                },
                success: function(data) {
                    console.log(
                        data
                    );

                    // Also switch up the icon
                    $that.children().toggleClass('fa-star-o');
                    $that.children().toggleClass('fa-star');
                },
                error: function(err) {
                    console.log(
                        err
                    );
                }
            });
        });

        // Add to each "next quote" link a event that changes the quote displayed (from api)
        $lnkNxtQuote.on('click', function(e) {
            var $that = $(this);
            var $quote = $that.siblings('.front__quote');

            // Change it
            $.ajax({
                url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous/', // The URL to the API. You can get this in the API page of the API you intend to consume
                type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
                dataType: 'json',
                success: function(data) {
                    $quote.html(data.quote);
                },
                error: function(err) {
                    alert(err);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "MQw3oQSy28mshHZd3NyjQhx5ckLZp1n5bIPjsnQdsamImhxGHt"); // Enter here your Mashape key
                }
            });
        });

        // Add to each trash icon the "delete" event
        $lnkTrash.on('click', function(e) {
            var name = $(this).parents('.front').find('.front__title').html();
            $dialogDel.find('.target').html(name);
            var $that = $(this);

            $dialogDel.dialog({
                resizable: false,
                height: "auto",
                width: "400px",
                modal: true,
                buttons: {
                    "Ja, verwijder": function() {
                        $.ajax({
                            url: 'api.php',
                            type: 'GET',
                            data: {
                                action: 'delete',
                                id: $that.parents('.card').attr('data-contact-id')
                            },
                            success: function(data) {
                                console.log(
                                    data
                                );

                                // Also switch up the icon
                                $that.parents('.card-container').hide('fast');
                            },
                            error: function(err) {
                                console.log(
                                    err
                                );
                            }
                        });
                        $(this).dialog("close");
                    },
                    "Neen, verwijder nier": function() {
                        $(this).dialog("close");
                    }
                }
            });
        });

        // Add to each button the "flip" event
        $btnFlip.on('click', function(e) {
            $(this).parents('.card-container').toggleClass('flip');;
        });

        // Add a slideshow-esque effect to the pictures
        $frPicCont.on('click', function(e) {
            // Get the "pics" selection
            var childs = $(this).parents('.front__picture-container').children();

            // Get current "index", and the "next index"
            var index = childs.index($(this));
            var nxtIndex = (index === childs.length - 1) ? 0 : index + 1;

            // Toggle the visibilty
            childs.eq(index).toggleClass('hidden');
            childs.eq(nxtIndex).toggleClass('hidden');
        });

        // On load show the subtext briefly, and shake it a bit
        setTimeout(function() {
            $frontMsg.fadeToggle('fast');

            // Shake it all about
            setTimeout(function() {
                $frontMsg.effect('shake', {
                    distance: 3,
                    times: 2
                }, 300);
            }, 300);

            // And then hide it!
            setTimeout(function() {
                $frontMsg.fadeToggle('fast');
            }, 1300);
        }, 1000);

    });
})(jQuery);