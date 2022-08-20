---
title:  "millis tools"
layout: default
---
  <script>
  $( function() {
    const MILLIS_IN_MIN = 60*1000;
    const MILLIS_IN_HOUR = 60*MILLIS_IN_MIN;
    const MILLIS_IN_DAY = 24*MILLIS_IN_HOUR;
    $( "#datepicker" ).datepicker();
    $( "#datepicker" ).datepicker("option", "dateFormat", "yy-mm-dd");
    $( "#datepicker" ).on("change", function(){
      let nn = Date.now();
      nn = nn - nn % MILLIS_IN_DAY
      let ms_diff = Date.parse(this.value) - nn;
      if (Math.abs(ms_diff) > 0) {
        $("#days_diff")[0].textContent = Math.floor( ms_diff / MILLIS_IN_DAY);
      } else {
        $("#days_diff")[0].textContent = 0
      }
      
    });
    $( "#millis" ).on("input", function(){
      $( "#days" ).val($("#millis").val()/MILLIS_IN_DAY)
    });

    $( "#days" ).on("input", function(){
      $( "#millis" ).val($("#days").val()*MILLIS_IN_DAY)
    });
  } );
  </script>
<input type="text" id="datepicker">
<br>
Days diff <label id="days_diff"></label>
<br>
<br>
<label for="millis">Millis </label><input type="number" id="millis" pattern="[0-9]*"> = 
<label for="days">Days </label><input type="number" id="days"> 