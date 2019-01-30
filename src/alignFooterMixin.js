const alignFooter = function(){
    let tp = $(window).height();
    tp -= $("#app").height();
    tp -= $("#nav").outerHeight(true);
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