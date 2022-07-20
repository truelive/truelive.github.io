---
title:  "millis tools"
layout: default
---
  <script>
  $( function() {
    const MILLIS_IN_DAY = 24*60*60*1000;
    $( "#datepicker" ).datepicker();

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
<label for="millis">Millis </label><input type="number" id="millis" pattern="[0-9]*"> = 
<label for="days">Days </label><input type="number" id="days"> 