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
		if(winutil.isBrowser(w) && winutil.isFocused(w))
		{
			ub = w.document.getElementById("urlbar");
			if(ub == null)
				continue;

			newloc = "";
			cb = clipboard.get();

			if(ub.focused)
				if(ub.selectionEnd - ub.selectionStart > 0)
				{
					newloc =
						  ub.value.slice(0, ub.selectionStart)
						+ cb
						+ ub.value.slice(ub.selectionEnd);
				}
				else
					newloc =
						  ub.value.slice(0, ub.selectionStart)
						+ cb
						+ ub.value.slice(ub.selectionStart);
			else
				newloc = cb;

			ub.value = newloc;

			var gb;
			if((gb = w.document.getElementById("urlbar-go-button")) != undefined && gb != null) // Omnibar addon compat.
				return gb.click();
			if((gb = w.document.getElementById("go-button")) != undefined && gb != null)
				return gb.click();

			break;
		}
}
