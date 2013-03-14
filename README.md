jcautosave by http://jaspreetchahal.org/
==========

A simple jQuery AutoSave Plugin for Form Fields Or ContentEditable Containers

<h2>Example Markup</h2>
<pre><code>
&lt;div contenteditable="true" id="autosave" style="width:250px;height: 250px; padding: 5px; border: 1px solid #EEEEEE;border-radius: 10px" data-url="example.html" data-event="keyup">&lt;/div>

&lt;div id="message" style="width:250px">&lt;/div>

&lt;input id="name"  data-url="example.html" data-event="change" >

&lt;div id="message-name" style="width:250px">&lt;/div>

</code></pre>

<h2>Example Usage</h2>
<pre><code>
$("#autosave").jcautosave({
        sendAutoSaveOn:"interval",
        interval:10000, // 10 seconds
        before:function(data,element){
            $("#message").html("Saving..");
        },
        success:function(data,element){
            $("#message").html("Saved");
        },
        error:function(error,element){
            $("#message").html("Error");
        }
    });
// autosave above will send data to the specified url take from "data-url" attribute in the div#autosave
    $("#name").jcautosave({

        before:function(data,element){
            $("#message-name").html("Saving..");
        },
        success:function(data,element){
            $("#message-name").html("Saved");
        },
        error:function(error,element){
            $("#message-name").html("Error");
        }
    });
// autosave above will be triggered on "change" event to the specified url take from "data-url" attribute in the input#name	
</code></pre>


<h2>Options</h2>

<p>You can pass any of these options to the .jcautosave() function:</p>

<table>
<tbody><tr>
<th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  <tr>
    <td>sendAutoSaveOn</td>
    <td>enum</td>
    <td>event</td>
    <td><strong><em>event || interval</em></strong><br />
      based on this setting you must also supply a value for <strong>event || interval</strong> property, In case the value is set to <em><strong>interval </strong></em>A post if made every <strong>interval</strong> milliseconds else it is fired on an event.</td>
  </tr>
  <tr>
<td> url</td>
      <td>string</td>
      <td>null</td>
      <td>Url use to post ajax data. You can also use data-url in the input/div tag itself to sepecify the target URL.</td>
    </tr>
<tr>
<td>event</td>
      <td>string</td>
      <td>change</td>
      <td>Event that causes the plugin to send data to your url. See <a href="http://api.jquery.com/on/">jQuery.bind</a> for options.</td>
    </tr>
<tr>
<td>interval</td>
      <td>int</td>
      <td>5000</td>
      <td>This specify the interval just in case selected auto save mechanism is <strong>interval</strong></td>
    </tr>
<tr>
<td>success</td>
      <td>function</td>
      <td>function(data,$jqueryEl){}</td>
      <td>Once Ajax call is successfully completed</td>
    </tr>
<tr>
<td>error</td>
      <td>function</td>
      <td>function(error,$jqueryEl){}</td>
      <td>Callback function in case there is an error</td>
    </tr>
<tr>
<td>before</td>
      <td>function</td>
      <td>function(data,$jqueryEl){}</td>
      <td>Callback function on &quot;beforeSend&quot;</td>
    </tr>
<tr>
  <td>after</td>
  <td>function</td>
  <td>function(data,$jqueryEl){}</td>
  <td>Callback function to cleanup anything and is triggered after success/error</td>
</tr>
<tr>
  <td>sendUpdatesWhenDataChangeIsDetected</td>
  <td>bool</td>
  <td>true</td>
  <td>This settings tries to check if there is any data change only then send the ajax post else any of ajax related logic will not fire</td>
</tr>
</tbody>
</table>

Get more information and bug reporting at http://jaspreetchahal.org/jcautosave-a-simple-jquery-plugin-to-autosave-data-on-contenteditable-containers-or-form-fields