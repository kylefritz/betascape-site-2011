/* Author: Kyle Fritz <kyle.p.fritz@gmail.com>

*/
$(function(){
/*
$('.attendees').eventbrite_attendees({
  app_key: 'C2TEMDHGVVBC7PVYUN',
  //event_id: '943934333' //hackathon
  event_id: '2015326897' //betascape
});
*/

 $.getJSON(
      "https://spreadsheets.google.com/feeds/list/0AiPjpvSodsnLdE5XRUVhQXFPQnZCam1mWWE1cjlXTVE/od6/public/basic?alt=json-in-script&callback=?",
      function(data,status){
        DATA_DUDE=data;
        $.each(data.feed.entry,function(idx,val){
          console.log(val.title.$t, val.content.$t.replace("exhibitorwebsite:",""));
          var name=val.title.$t.replace(" ","&nbsp;");
          var website=val.content.$t.replace("exhibitorwebsite:","");
          var html=format_attendee(name,website);
          $('.presentors').append(html);
        });
      });

});
