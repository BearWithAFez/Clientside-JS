/**
 * Clientside Scripting - Labo 04 - JQUERY OEFENBLAD
 * @author Dwight Van der Velpen
 *
 **/

;
(function($) {
    'use strict'

    // variables and functions
    // ...

    // wait till the DOM and all resources have loaded
    $(document).ready(function() {
        // everything loaded
        console.log('loaded');

        /***** Serie 1 ****/

        // event handling here
        $('#btnCss1a').on('click', function(e) {
            $('#txtCss1').addClass('error');
        });

        $('#btnCss1b').on('click', function(e) {
            $('#txtCss1').removeClass('error');
        });

        $('#btnCss1c').on('click', function(e) {
            $('#txtCss1').css('color', 'blue');
        });

        $('#btnCss1d').on('click', function(e) {
            $('#txtCss1').css('color', 'green').css('font-style', 'italic');
        });

        $('#btnCss1e').on('click', function(e) {
            console.log($('#txtCss1').css('width'));
        });

        $('#btnCss1f').on('click', function(e) {
            $('#txtCss1').css('width', '600px');
        });

        $('#btnCss1g').on('click', function(e) {
            $('#txtCss1').html('blablabla');
        });

        /***** Serie 2 ****/
        //

        /***** Serie 3 ****/
        $('#btnEvents1a').css('cursor', 'pointer').on('mouseover', function(e) {
            console.log('oefening 3.1 ok');
        });

        $('div#targetEvents1 ul li:nth-child(1) a').on('click', function(e) {
            e.preventDefault();
            console.log('oefening 3.2 ok');
        });

        $('#btnEvents2a').on('click', function(e) {
            $('div#targetEvents1 ul li:nth-child(1) a').off('click');
            $('div#targetEvents1 ul li:nth-child(1) a').on('click', function(e) {
                e.preventDefault();
            });
        });

        $('#tarEvents1').one('focus', function(e) {
            $('#tarEvents1').val('');
        });

        $(document).bind('keydown', 'ctrl+s', function() {
            $('#msgEvents1').html($('#tarEvents1').text());
            return false;
        });

    });
})(jQuery);