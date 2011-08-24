/* Author: Kyle Fritz <kyle.p.fritz@gmail.com>

*/
betascape={
  changeCurrent:function(changeTo){
    $('nav li.current').removeClass('current');
    $('nav li.'+changeTo).addClass('current');
  }
  , getPresenters:function(callback){
    $.getJSON(
      "https://spreadsheets.google.com/feeds/cells/0AvQ7pVUg-X_RdDlYZ0hUNVFOWEItMTBqNGk4YkFuUkE/od6/public/basic?authkey=CN2q874D&alt=json-in-script&callback=?",
      function(data,status){
        var rows=_.groupBy(data.feed.entry,function(e){return e.title.$t.match(/[A-Za-z]+(\d+)/)[1];})
        var presenters=_.map(rows,function(row){
          var presenter={};
          var lectureTypeLookup={i:"Interactive Lounge",l:"Lectures",
                                 w:"Workshops",c:"Conversations",
                                 ccf:"CreateCamp Facilitator"};
          $.each(row,function(colIdx){
            var col=row[colIdx];
            var colLetter=col.title.$t.match(/([A-Za-z]+)\d+/)[1].toLowerCase();
            var content=col.content.$t;
            if(colLetter==="a"){
                presenter.lectureType=lectureTypeLookup[ content.toLowerCase() ];
              }else if(colLetter==="b"){
                presenter.name=content;
              }else if(colLetter==="c"){
                presenter.bio=content;
              }else if(colLetter==="d"){
                //thank-you very much @abachman!
                if (content.trim().length) content= /^https?:\/\//i.test(content) ? content : "http://" + content;
                presenter.website=content;
              }else if(colLetter=="e"){
                presenter.atBetascape=content;
              }else if(colLetter=="f"){
                presenter.twitter=content;
              }else{
                if(typeof(console)!="undefined"){
                  console.log('whats that?',colLetter,content);
                }
            }
          });
          return presenter;
        });
        var headers=presenters.shift();
        callback(presenters);
    });
  }
};
