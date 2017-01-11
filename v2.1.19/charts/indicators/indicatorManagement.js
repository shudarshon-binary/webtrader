define(["websockets/binary_websockets","common/rivetsExtra","lodash"],function(a,b,c){function d(){return h?Promise.resolve():new Promise(function(a){require(["text!charts/indicators/indicatorManagement.html"],function(b){e(b).then(a)})})}function e(a){return new Promise(function(b){a=$(a).i18n();var d={title:"Add/remove indicators".i18n(),modal:!0,destroy:function(){i&&i.unbind(),i=null,h.dialog("destroy").remove(),h=null},open:function(){}};d=isAffiliates()?c.extend(d,{resizable:!1,width:Math.min(480,$(window).width()-10),height:400,ignoreTileAction:!0,maximizable:!1,minimizable:!1,collapsable:!1}):c.extend(d,{width:700}),require(["windows/windows"],function(c){h=c.createBlankWindow(a,d),f(a),b()})})}function f(a){j={dialog:{title:"Add/remove indicators".i18n(),container_id:"",is_tick_chart:!1},indicators:{search:"",array:[],current:[],favorites:[]}},j.indicators.clear_search=function(){j.indicators.search=""},j.indicators.add=function(a){var b=a.id;require(["charts/indicators/"+b+"/"+b],function(a){a.open(j.dialog.container_id)}),h.dialog("close")},j.indicators.edit=function(a){var b=a.id;require(["charts/indicators/"+b+"/"+b],function(b){b.open(j.dialog.container_id,function(){j.indicators.remove(a)})}),h.dialog("close")},j.indicators.remove=function(a){var b=j.indicators.current.indexOf(a);-1!==b&&j.indicators.current.splice(b,1);var c=$(j.dialog.container_id).highcharts();c.series.forEach(function(b){b.options.isInstrument&&b.removeIndicator(a.series_ids)})},j.indicators.favorite=function(a){if(a.is_favorite){a.is_favorite=!1;var b=j.indicators.favorites.indexOf(a);j.indicators.favorites.splice(b,1)}else a.is_favorite=!0,j.indicators.favorites.push(a);var c=j.indicators.favorites.map(function(a){return a.id});local_storage.set("indicator-management-favorite-ids",JSON.stringify(c))},i=b.bind(a[0],j)}function g(a){require(["text!charts/indicators/indicators.json"],function(b){var d=JSON.parse(b),e=local_storage.get("indicator-management-favorite-ids")||[];d=c.filter(d,function(a){return a.is_favorite=-1!==e.indexOf(a.id),!(a.isTickChartNotAllowed&&j.dialog.is_tick_chart)});var f=[];d.forEach(function(b){a.forEach(function(a){a[b.id]&&a[b.id].forEach(function(a){var d=c.cloneDeep(b),e=b.long_display_name!==a.toString();d.name=b.long_display_name,d.shortName=e?a.toString():"",d.showEdit=b.editable,d.series_ids=a.getIDs(),f.push(d)})})}),j.categories=c(d).map("category").flatten().uniq().value(),j.indicators.favorites=c.filter(d,"is_favorite"),j.indicators.array=d,j.indicators.current=f})}require(["text!charts/indicators/indicatorManagement.html","css!charts/indicators/indicatorManagement.css","text!charts/indicators/indicators.json"]);var h=null,i=null,j={};b.formatters["indicators-filter"]=function(a,b,c){return c=c&&c.toLowerCase(),a&&a.filter(function(a){return-1!==a.category.indexOf(b)&&-1!==a.long_display_name.toLowerCase().indexOf(c)}).sort(function(a,b){return a.long_display_name<b.long_display_name?-1:a.long_display_name>b.long_display_name?1:0})},b.formatters["indicators-favorites-filter"]=function(a,b){return b=b&&b.toLowerCase(),a&&a.filter(function(a){return-1!==a.long_display_name.toLowerCase().indexOf(b)}).sort(function(a,b){return a.long_display_name<b.long_display_name?-1:a.long_display_name>b.long_display_name?1:0})},b.formatters["indicators-categories"]=function(a,b){b=b&&b.toLowerCase();var d=a&&a.filter(function(a){return-1!==a.long_display_name.toLowerCase().indexOf(b)});return d&&c(d).map("category").flatten().uniq().value()};var k=!0;return{openDialog:function(a,b){d().then(function(){j.dialog.title="Add/remove indicators".i18n()+(b?" - "+b:""),j.dialog.container_id=a,j.indicators.current=$(a).data("indicators-current")||[];var d=$(a).data("timePeriod");j.dialog.is_tick_chart=isTick(d);var e=$(a).highcharts().series;e=c.filter(e,"options.isInstrument"),g(e);k||isAffiliates();h.dialog("open"),k=!1})["catch"](void 0)}}});