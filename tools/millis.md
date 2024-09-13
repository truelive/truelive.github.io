---
title:  "millis tools"
layout: default
---
 <style>
  label {
    display: inline-block;
    width: 200px;
  }
</style>
<script>
  $(function () {
    const MILLIS_IN_MIN = 60 * 1000;
    const MILLIS_IN_HOUR = 60 * MILLIS_IN_MIN;
    const MILLIS_IN_DAY = 24 * MILLIS_IN_HOUR;
    const millis_map = new Map()
    millis_map.set("nanos", 1 / 1000000)
    millis_map.set("millis", 1)
    millis_map.set("seconds", 1000)
    millis_map.set("minutes", MILLIS_IN_MIN)
    millis_map.set("hours", MILLIS_IN_HOUR)
    millis_map.set("days", MILLIS_IN_DAY)
    millis_map.set("weeks", 7 * MILLIS_IN_DAY)
    updateTimestamps = function (val, caller) {
      for (let [key, value] of millis_map.entries()) {
        let id = "#timestamp_" + key
        if ($(id).length) {
          if (id == caller) continue;
          $(id).val(val / value)
        }
      }
      $('#timestamp_result').html(`
              <p><strong>Timestamp:</strong> ${(new Date(val)).toISOString()}</p>
          `);

    }
    updateInput = function (val, id, caller) {
      if (id == caller) return;
      $("#" + id).val((val / millis_map.get(id)).toFixed(4))
    }
    update_millis = function (millis, caller) {
      let ms = parseInt(millis);
      if (isNaN(ms) || ms < 0) {
        $('#result').text("Please enter a valid number for milliseconds.");
        return;
      }
      updateHumanReadable(ms)
      for (let [key, value] of millis_map.entries()) {
        updateInput(ms, key, caller)
      }
    }
    $("#datepicker").datepicker();
    $("#datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
    $("#datepicker").on("change", function () {
      let nn = Date.now();
      nn = nn - nn % MILLIS_IN_DAY
      let ms_diff = Date.parse(this.value) - nn;
      if (Math.abs(ms_diff) > 0) {
        $("#days_diff")[0].textContent = Math.floor(ms_diff / MILLIS_IN_DAY);
      } else {
        $("#days_diff")[0].textContent = 0;
      }
    });
    $(Array.from(millis_map.keys()).map((x) => "#" + x).join(", ")).on("input", function () {
      update_millis($(this).val() * millis_map.get($(this).attr("id")), $(this).attr("id"))
    });
    let init_time = new Date(Date.now()).getTime()
    updateTimestamps(init_time, "timestamp_seconds")
    $("#timestamp_seconds").val(init_time)
    $("#timestamp_seconds, #timestamp_millis, #timestamp_nanos").on("input", function () {
      let id = $(this).attr("id")
      let scale = Array.from(millis_map.keys()).filter(k => id.includes(k)).reduce((r, k) => k, "millis")
      updateTimestamps($(this).val() * millis_map.get(scale), $(this).attr("id"))
    });

    function updateHumanReadable(milliseconds) {
      let humanReadable = `${Math.floor(milliseconds / (1000 * 60 * 60 * 24))} days, ${Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours, ${Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))} minutes, ${Math.floor((milliseconds % (1000 * 60)) / 1000)} seconds`;

      $('#result').html(`
              <p><strong>Duration:</strong> ${humanReadable}</p>
          `);
    }
  });
</script>
<input type="text" id="datepicker">
<br>
Diff from now <label id="days_diff"></label>
<br>
<br>
<label for="nanos">Nanos </label><input type="number" id="nanos" pattern="[0-9]*"> <br>
<label for="millis">Millis </label><input type="number" id="millis" pattern="[0-9]*"> <br>
<label for="seconds">Seconds </label><input type="number" id="seconds" pattern="[0-9]*"> <br>
<label for="minutes">Minutes </label><input type="number" id="minutes" pattern="[0-9]*"> <br>
<label for="hours">Hours </label><input type="number" id="hours" pattern="[0-9]*"> <br>
<label for="days">Days </label><input type="number" id="days"> <br>
<label for="weeks">Weeks </label><input type="number" id="weeks"> <br>
<div id="result"></div>
<label for="timestamp_seconds">Unix Timestamp </label><input type="number" id="timestamp_seconds"> <br>
<label for="timestamp_millis">Unix Timestamp Millis</label><input type="number" id="timestamp_millis"> <br>
<label for="timestamp_nanos">Unix Timestamp Nano</label><input type="number" id="timestamp_nanos"> <br>
<div id="timestamp_result"></div>