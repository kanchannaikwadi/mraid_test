
<div id="adContainer" style="width:320px;margin:0px;padding:0px;background-color:#ffffff;">
	<div id="normal" style="display:none;width:320px;height:50px;margin:auto;position:relative;top:0px;left:0px;">
		<img width="320" height="50" src="http://admarvel.s3.amazonaws.com/demo/mraid/320x50_click_to_expand.png" onclick="javascript:expand();"/>
	</div>
	
	<div id="expanded" style="display:none;width:320px;height:250px;margin:auto;position:relative;top:0px;left:0px;">
		<img width="320" height="250" style="position:absolute;top:0px;left:0px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/320x250.png" />
		
		<img width="37" height="37" style="position:absolute;top:90px;left:56px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Html_37x37.png" onclick="javascript:openSite('http://www.opera.com');" />
		<img width="37" height="37" style="position:absolute;top:90px;left:113px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Location_37x37.png" onclick="javascript:openSite('https://maps.google.com/maps?q=1875+S+Grant+St,+San+Mateo,+CA&hl=en&sll=46.238212,6.864936&sspn=0.135592,0.222816&oq=1875+S&hnear=1875+S+Grant+St,+San+Mateo,+California+94402&t=m&z=17&iwloc=A')" />
		<img width="37" height="37" style="position:absolute;top:90px;left:170px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Download_37x37.png" onclick="javascript:openSite('https://itunes.apple.com/us/app/opera-mini-web-browser/id363729560?mt=8&ign-mpt=uo%3D4');" />
		<img width="37" height="37" style="position:absolute;top:90px;left:227px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Video_37x37.png" onclick="javascript:playVideo('http://admarvel.s3.amazonaws.com/demo/mraid/OMW_SOUND_VIDEO_RENEW.iPhoneSmall.mp4');" />
	
		<img width="37" height="37" style="position:absolute;top:147px;left:56px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/SMS_37x37.png" onclick="javascript:sendSMS('16502122336');" />
		<img width="37" height="37" style="position:absolute;top:147px;left:113px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Photo_37x37.png" onclick="javascript:storePicture('http://admarvel.s3.amazonaws.com/demo/mraid/320x50.png')" />
		<img width="37" height="37" style="position:absolute;top:147px;left:170px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Calendar_37x37.png" onclick="javascript:createCalendarEvent()" />
		<img width="37" height="37" style="position:absolute;top:147px;left:227px;" src="http://admarvel.s3.amazonaws.com/demo/mraid/Call_37x37.png" onclick="javascript:callNumber('16502122336');" />
	</div>
</div>

<style type="text/css">
body
{
	background-color:#FFFFFF;
}
</style>

<script>
// Expanded Click Action Functions
function openSite(url)
{
	mraid.open(url);
}

function sendSMS(number)
{
	if (!mraid.supports("sms"))
	{
		alert("MRAID says SMS is not supported on this device.");
	}
	else
	{
		mraid.open("sms://" + number);
	}
}

function callNumber(number)
{
	if (!mraid.supports("tel"))
	{
		alert("MRAID says calling is not supported on this device.");
	}
	else
	{
		mraid.open("tel://" + number);
	}
}

function playVideo(url)
{
	mraid.playVideo(url);
}

function storePicture(url)
{
	if (!mraid.supports("storePicture"))
	{
		alert("MRAID says storePicture is not supported on this device.");
	}
	else
	{
		mraid.storePicture(url);
	}
}

function createCalendarEvent()
{
	if (!mraid.supports("calendar"))
	{
		alert("MRAID says calendar is not supported on this device.");
	}
	else
	{
		var calendarObject = {description:"Mayan Apocalypse/End of World", location:"everywhere", start:"2013-12-21T00:00-05:00", end:"2013-12-22T00:00-05:00"};
	
		mraid.createCalendarEvent(calendarObject);
	}
}

// Core Ad Functions
function toggleLayer( fromLayer, toLayer )
{
  var fromElem, toElem, fromElemStyle, toElemStyle;

  fromElem = document.getElementById( fromLayer );
  fromElem.style.display = 'none';

  toElem = document.getElementById( toLayer );
  toElem.style.display = '';
}

function updateAd(state)
{	
	if (state == "expanded")
	{
    	toggleLayer('normal', 'expanded');
	}
	else if (state == "default")
	{
		toggleLayer('expanded', 'normal');
	}
}

function centerAd(width, height)
{
	var sideMargins = 0;
	var topBottomMargins = 0;

	if (mraid.getState() == "expanded")
	{
		sideMargins = (width - 320)/2;
		topBottomMargins = (height - 250)/2;
		
		document.getElementById("adContainer").style.margin = topBottomMargins + "px " + sideMargins + "px " + topBottomMargins + "px " + sideMargins + "px";
	}
	
	document.getElementById("adContainer").style.margin = topBottomMargins + "px " + sideMargins + "px " + topBottomMargins + "px " + sideMargins + "px";	
}

function expand()
{	
	mraid.expand();
}

function collapse()
{			
	mraid.close();
}

function setupViewport(width)
{
	var element = document.querySelector("meta[name=viewport]");
	if (!element)
	{
		element = document.createElement("meta");
		element.name = "viewport";
		element.content = "width=" + width + ", user-scalable=no";
		document.getElementsByTagName('head')[0].appendChild(element);
	}
	else
	{
		element.content = "width=" + width + ", user-scalable=no";
	}
}
setupViewport(320);

function mraidIsReady()
{
	mraid.removeEventListener("ready", mraidIsReady);
	
	showMyAd();
}

function showMyAd()
{
	var el = document.getElementById("normal");
    el.style.display = '';

	mraid.addEventListener("stateChange", updateAd); 
	mraid.addEventListener("sizeChange", centerAd);
}

function doReadyCheck()
{	
	if (mraid.getState() == 'loading') 
	{	
		mraid.addEventListener("ready", mraidIsReady);  
	} 
	else
	{ 	
		showMyAd();      
	}
}

doReadyCheck();
</script>
