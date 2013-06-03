var { Hotkey } = require("sdk/hotkeys");
var winutil = require("window/utils");
var clipboard = require("sdk/clipboard");
  
var png = Hotkey
({
  combo: "accel-b",
  onPress: function()
    {
      pngmain();
    }
});

function pngmain()
{
    for each (var w in winutil.windows())
		if(winutil.isBrowser(w))
		{
			ub = w.document.getElementById("urlbar");
			newloc = "";
			cb = clipboard.get();

			if(ub.focused)
				newloc = ub.value + cb;
			else
				newloc = cb;

			ub.value = newloc;

			var evt = winutil.getFocusedWindow().document.createEvent("KeyEvents");
			evt.initKeyEvent("keypress", true, false,
				null,
				false, false, false, false,
				13,
				0);
			ub.focus();
			ub.dispatchEvent(evt);

			break;
		}
}
