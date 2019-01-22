const alignFooter = function(){
    let tp = $(window).height();
    tp -= $("#ta-profile-container").outerHeight(true);
    tp -= $("#footer").outerHeight();
    tp -= $("#nav").innerHeight();
    tp = Math.max(50,tp);
    $("#footer").css('top', tp);
}

export const alignFooterMixin = {
    updated(){
        $(document).ready(function(){
            alignFooter();
            $(window).resize(alignFooter);
        })
    },
}