window.log = function(){
  log.history = log.history || [];
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

/*
 * JQuery plugin "eventbrite". A widget that allows simple placement of eventbrite data on your page.
 *
 */
(function($){
  $.fn.eventbrite_attendees = function(config) {
    var defaults = {
      /* your eventbrite app_key is REQUIRED */
      app_key: undefined,
      /* the event id is REQUIRED */
      event_id: undefined,
      /* the css class of the UL container */
      container_class: 'attendee_list',
      /*the callback called when attendees comeback*/
      callback: function(){}
    };

    var options = $.extend({}, defaults, config);
        
    if (!options.app_key) {
      throw new Error('app_key is required');
    }
    if (!options.event_id) {
      throw new Error('event_id is required');
    }

    //use YQL to get the data cross-domain
    $.ajax({
      url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%22https%3A%2F%2Fwww.eventbrite.com%2Fjson%2Fevent_list_attendees%3Fapp_key%3D"+options.app_key+"%26id%3D"+options.event_id+"%22&format=json",
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'callback',
      context: this,
      success: function(json) {
        this.each(function() {
          var el = $(this);
          el.prepend('<ul class="'+options.container_class+'">');
          var list = el.find('ul').first();
          for (var x=0; x < json.query.results.json.attendees.length; x++) {
            var a = json.query.results.json.attendees[x].attendee;
            var name = a.first_name+'&nbsp;'+a.last_name+" ";
            var html=format_attendee(name,a.website);
            list.append(html);
          }
        });
      }
    });

    return this;
  };
})(jQuery);

format_attendee=function(name,website){
    if (website) {
      var text = '<a href="'+website+'">'+name+'</a>';
    }else{
      var text=name;
    }
    return '<li class="color'+parseInt(Math.random()*4)+'">'+text+' </li>';
};
