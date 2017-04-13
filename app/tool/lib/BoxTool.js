/**
 * Created by girl on 16/6/3.
 */
import jQuery from 'jquery';
/**
 * 弹窗蒙版功能
 */
jQuery.layer =(obj)=>{
    let isIE = (document.all) ? true : false,
        isIE6 = isIE && !window.XMLHttpRequest,
        position = !isIE6 ? "fixed" : "absolute",
        containerBox = jQuery(obj);
    containerBox.css({"z-index":"9999","display":"block","position":position ,"top":"50%","left":"50%","margin-top": -(containerBox.height()/2)+ "px","margin-left": -(containerBox.width()/2) + "px"});
    let layer=jQuery("#layer");
    layer.css({"width":"100%","height":"100%","position":position,"top":"0px","left":"0px","background-color":"#000","z-index":"9998","opacity":"0.6"});
    //jQuery("body").append(layer);
    const layer_iestyle=()=>{
      const maxWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px",
            maxHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
        layer.css({"width" : maxWidth , "height" : maxHeight });
    }
    const containerBox_iestyle=()=>{
        const marginTop = jQuery(document).scrollTop - containerBox.height()/ 2 + "px",
              marginLeft = jQuery(document).scrollLeft - containerBox.width()/ 2 + "px";
        containerBox.css({"margin-top" : marginTop , "margin-left" : marginLeft });
    }
    if(isIE){
        layer.css("filter","alpha(opacity=60)");
    }
    if(isIE6){
        layer_iestyle();
        containerBox_iestyle();
    }
    jQuery("window").resize(function(){
        layer_iestyle();
    });

    //layer.click(()=>{
    //    containerBox.hide();
    //    layer.remove();
    //});

    //jQuery(".b_close").click(()=>{
    //    containerBox.hide();
    //    layer.remove();
    //});
};


