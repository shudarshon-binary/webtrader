define(["exports","../windows/windows","../websockets/binary_websockets","lodash","../navigation/menu"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.is_empty=a.get_trade_dialogs=a.reopen_trade_dialogs=a.reopen=a.track=void 0;var g=(f(b),f(c)),h=f(d),i=f(e),j=local_storage.get("states")||{},k={},l=g["default"].cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(a){var b=i["default"].extractChartableMarkets(a),c=h["default"](b).map("submarkets").flatten().map("instruments").flatten().map("symbol").value();return c})["catch"](function(a){return[]}),m=function(){return new Promise(function(a){return g["default"].is_authenticated()?a():void g["default"].events.on_till("login",function(){return a(),!0})})},n=function(a,b){var c={assetIndex:"#nav-container .assetIndex",statement:"#nav-container .statement",tradingTimes:"#nav-container .tradingTimes",download:"#nav-container .download",portfolio:"#nav-container .portfolio",profitTable:"#nav-container .profitTable",token:"#nav-container .token-management",deposit:"#nav-container .deposit",withdraw:"#nav-container .withdraw"},d=0,e=function(b,e){if("closed"!==b.position.mode)if(b.is_unique)b.is_authorized?m().then(function(){return $(c[e]).click(),!0}):$(c[e]).click();else if("chartWindow"===e){var f=b.data.instrumentCode;if(a.length>0&&-1===a.indexOf(f))return;b.data.tracker_id=++d,require(["charts/chartWindow"],function(a){b.data.isTrackerInitiated=!0,a.addNewWindow(b.data)})}else"tradeDialog"===e&&m().then(function(){return b.data.tracker_id=++d,g["default"].send({contracts_for:b.data.symbol.symbol}).then(function(a){require(["trade/tradeDialog"],function(c){var d=c.init(b.data.symbol,a.contracts_for,b.data.template,!0);if(b.position.offset){var e=b.position.offset.left,f=b.position.offset.top;d.dialog("widget").animate({left:e+"px",top:f+"px"},1e3,d.trigger.bind(d,"animated")),d.dialog("option","position",{my:e,at:f})}})})["catch"](void 0),!0})};h["default"].forEach(b,function(a,b){h["default"].isArray(a)?a.forEach(function(a){return e(a,b)}):e(a,b)})},o=h["default"].debounce(function(){return local_storage.set("states",j)},50),p=function(a,b,c,d){var e=d.position;e.size&&b.dialog("option","width",e.size.width),e.size&&b.dialog("option","height",e.size.height),c.position.size=e.size,c.position.mode=e.mode,"maximized"===e.mode?setTimeout(function(){b.dialogExtend("maximize"),b.dialog("moveToTop")},10):"minimized"===e.mode&&b.dialogExtend("minimize"),e.offset&&(a.css({left:e.offset.left+"px",top:e.offset.top+"px"}),c.position.offset=e.offset),o()},q=a.track=function(a,b){var c=b.dialog("widget"),d=null,e={module_id:a.module_id,is_unique:a.is_unique,is_authorized:"true"===b.attr("data-authorized"),data:a.data,position:{size:{width:b.dialog("option","width"),height:b.dialog("option","height")},offset:void 0,mode:"normal"}};if(a.is_unique)j[a.module_id]=e,d=k[a.module_id],d&&("closed"===d.position.mode&&(d=null),delete k[a.module_id]);else if(j[a.module_id]=j[a.module_id]||[],j[a.module_id].push(e),k[a.module_id]&&void 0!==e.data.tracker_id){var f=h["default"].findIndex(k[a.module_id],function(a){return a.data.tracker_id===e.data.tracker_id});-1!==f&&(d=k[a.module_id][f],k[a.module_id].splice(f,1),"closed"===d.position.mode&&(d=null))}return o(),c.on("dragstop",function(){e.position.offset=c.offset(),o()}),c.on("animated",function(){e.position.offset=c.offset(),o()}),c.on("resizestop",function(a,b){e.position.size=b.size,e.position.offset=c.offset(),o()}),b.on("dialogextendminimize",function(){e.position.mode="minimized",o()}),b.on("dialogextendmaximize",function(){e.position.mode="maximized",o()}),b.on("dialogextendrestore",function(){e.position.offset=c.offset(),e.position.mode="normal",o()}),b.on("dialogdestroy",function(){if(e.is_unique)delete j[e.module_id];else if(j[e.module_id]){var a=j[e.module_id].indexOf(e);1==j[e.module_id].length?delete j[e.module_id]:j[e.module_id].splice(a,1)}o()}),b.on("dialogclose",function(){e.position.mode="closed",o()}),b.on("dialogopen",function(){e.position.offset=c.offset(),e.position.mode="normal",o(),d&&(p(c,b,e,d),d=null)}),function(a){e.data=a,o()}},r=a.reopen=function(){l.then(function(a){k=j,j={},o(),n(a,k)})},s=a.reopen_trade_dialogs=function(a){l.then(function(b){n(b,{tradeDialog:a})})},t=a.get_trade_dialogs=function(){return h["default"].cloneDeep(j.tradeDialog||[])},u=a.is_empty=function(){var a=h["default"].values(j).filter(function(a){return h["default"].isArray(a)||"closed"!==a.position.mode});return 0===a.length};a["default"]={track:q,reopen:r,reopen_trade_dialogs:s,get_trade_dialogs:t,is_empty:u}});