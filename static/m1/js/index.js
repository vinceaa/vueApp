jQuery(document).ready(function(){

    $(".markdown-text > textarea").markdown({
        target_form   : ".markdown"
    });

    $(".markdown-text > textarea").on("keyup", function() {
        $(this).markdown({
            target_form   : ".markdown"
        });
    });

    $(".close").on("click", function() {
        $(this).closest('footer').fadeOut();
    });

});