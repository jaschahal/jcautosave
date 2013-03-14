/*Copyright 2012 Jaspreet Chahal
 http://jaspreetchahal.org/

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Donations are welcome! or a purchase is appreciated if you are using it commercially
 */
jQuery.fn.jcautosave = function(settings){
    function sendData(root,settings,prevData) {
        var nodeID = root.prop("id");
        var elName = root.prop("name");
        var data = null;
        if(root.prop("innerHTML"))
            data = jQuery.extend({content:root.text(),nodeID:nodeID,elName:elName},root.data());
        else
            data = jQuery.extend({content:root.val(),nodeID:nodeID,elName:elName},root.data());
        var url = root.data("url") ? root.data("url") : settings.url;

        if(prevData != data.content || !settings.sendUpdatesWhenDataChangeIsDetected){
            jQuery.ajax({
                url:url,
                data:data,
                beforeSend:function(){
                    if(settings.before){
                        settings.before(data,root);
                    }
                },
                success:function(data){
                    settings.success(data,root);
                    if(settings.after){
                        settings.after.call(data,root);
                    }
                },
                error:function(error){
                    settings.error(error,root);
                    if(settings.after){
                        settings.after.call(data,root);
                    }
                }
            });
        }
        return data.content;
    }
    this.each(function(){
        settings = jQuery.extend({
            url:"",
            sendAutoSaveOn:"event", // event || interval
            interval:5000, // default is 10 seconds
            event: "keyup",
            sendUpdatesWhenDataChangeIsDetected:true,
            success: function(){},
            error  : function(){},
            before : function(){},
            after : function(){}
        },settings);
        var timer = null;
        var root = jQuery(this);
        var prevData = "";
        var event = root.data("event") || settings.event;
        var rawData = root.data();

        if(settings.sendAutoSaveOn == "event") {
            root.on(event,function(){
                prevData = sendData(root,settings,prevData);});
        }
        else {
            clearInterval(timer);
            timer = setInterval(function(){prevData = sendData(root,settings,prevData);},settings.interval);
        }
    });
}

