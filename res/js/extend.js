
define(["jquery"],function($){
//	==== String Extend ====
	$.extend(String.prototype,{
		empty: function () { return this == null || this == '' || this.length == 0; },
		encode: function () { return encodeURIComponent(this); },
		decode: function () { return decodeURIComponent(this); },
		stripTags: function () { return this.replace(/<\/?[^>]+>/gi, ''); },
		extractScripts: function () { return (this.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img')) || []); },
		evalScripts: function () { $(this.extractScripts()).each(function (i, v) { eval(v.substring(v.indexOf('>') + 1, v.lastIndexOf('<'))); }); },
		strip: function () { return this.replace(/^\s+/, '').replace(/\s+$/, ''); },
		stripScripts: function () { return this.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), ''); },
		trim: function () { return $.trim(this); },
		replaceAll: function (rgExp, replaceText) { var tmpStr = this; while (tmpStr.indexOf(rgExp) != -1) tmpStr = tmpStr.replace(rgExp, replaceText); return tmpStr; },
		toArray: function (s) { if (s) return this.split(s); var arr = []; for (var i = 0; i < this.length; i++) arr.push(this.substring(i, i + 1)); return arr; },
		toInt: function (val) { if (arguments.length == 0) val = 0; if (!this.isNumber()) { return val; } return Number(this); },
		toFloat: function (val) { var a = this; if (arguments.length == 0) val = 0; if (!a.replace('.', '').isNumber()) { return val; } return parseFloat(this); },
		isNumber: function () { return /^[0-9]+$/.test(this); },
		hasChinese: function () { return escape(this).indexOf("%u") != -1; },
		repChinese: function () { var a = this; $(['０', '１', '２', '３', '４', '５', '６', '７', '８', '９']).each(function (i, v) { a = a.replaceAll(v, i); }); return a; },
		isIDCard: function () { return /^(\d{15}|\d{18}|\d{17}(X|x))$/.test(this); },
		isEmail: function () { if (this == null || this.length == 0) return false; var pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; return pattern.test(this); },
		len: function () { return this.replace(/[^\x00-\xff]/g, "**").length; },
		cnLength: function () {
			var escStr = escape(this);
			var numI = 0;
			var escStrlen = escStr.length;
			for (i = 0; i < escStrlen; i++) {
				if (escStr.charAt(i) == '%') {
					if (escStr.charAt(++i) == 'u') {
						numI++;
					}
				}
			}
			return this.length + numI;
		}
	});
	
	//==== Date Extend ====
	/**
	* 对Date的扩展，将 Date 转化为指定格式的String
	* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
	* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	* eg:
	* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
	* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
	* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
	* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	*/
  $.extend(Date.prototype, {
		toDate: function (s) { var t = this; if (!s) s = new Text(); s._(t.getFullYear()); s._('-'); if (t.getMonth() + 1 < 10) s._('0'); s._(t.getMonth() + 1); s._('-'); if (t.getDate() < 10) s._('0'); s._(t.getDate()); return s.ts(); },
		toTime: function (s) { var t = this; if (!s) s = new Text(); if (t.getHours() < 10) s._('0'); s._(t.getHours()); s._(':'); if (t.getMinutes() < 10) s._('0'); s._(t.getMinutes()); s._(':'); if (t.getSeconds() < 10) s._('0'); s._(t.getSeconds()); return s.ts(); },
		toDatetime: function () { var t = this, s = new Text(); t.toDate(s); s._(' '); t.toTime(s); return s.ts(); },
    pattern : function(fmt){
			var o = {
				"M+" : this.getMonth()+1, //月份
				"d+" : this.getDate(), //日
				"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
				"H+" : this.getHours(), //小时
				"m+" : this.getMinutes(), //分
				"s+" : this.getSeconds(), //秒
				"q+" : Math.floor((this.getMonth()+3)/3), //季度
				"S" : this.getMilliseconds() //毫秒
			};
			var week = {"0" : "\u65e5","1" : "\u4e00","2" : "\u4e8c","3" : "\u4e09","4" : "\u56db","5" : "\u4e94","6" : "\u516d"};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
			}
			if(/(E+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
			}
			for(var k in o){
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				}
			}
			return fmt;
		}
	});
   //==== Array Extend ====
	$.extend(Array.prototype, {
		indexOf   : function(val){var pos=-1;$(this).each(function(i,v){if(v==val){pos=i;return;}});return pos;},
		del       : function(value){var pos = this.indexOf(value);if(pos==-1)return;this.splice(pos,1);return this;},
		max       : function(){var max;$(this).each(function(i,v){v = Number(v);max = i==0?v:(v>max?v:max);});	return max;},
		min       : function(){var min;$(this).each(function(i,v){v = Number(v);min = i==0?v:(v<min?v:min);});	return min;},
		hasRepeat : function(){var b = {};var a = this;for(var i=0,l=a.length; i<l&&!b[a[i]];b[a[i++]]=1);return i<l;	},
		clone     : function(){var a=[];for(var i=0;i<this.length;i++)a[i] = this[i];return a;},
		del       : function(value,isPos){var pos=!isPos?this.indexOf(value):value;if(pos==-1)return;this.splice(pos,1);return this;},
		inArray : function(a,arr){
			for(var i=0;i<arr.length;i++)
				if(a==arr[i])
					return true;
			return false;
		},
		random : function(o){
			o = $.extend({
				len    : 1,//号码长度
				repeat : false,//是否可以重复
				sort   : false,//是否需要排序
				zero   : false//是否需要补0
			},o);
			var s=this,a=[],no;
			var r = function(){return s[Math.round(Math.random()*(s.length-1))];}
			while(a.length!=o.len){
				no = r();
				if(!o.repeat && a.indexOf(no)!=-1)continue;
				a.push(no);
			}
			if(o.sort)
				a = a.sort(function(a,b){return a-b;});
			if(o.zero)
				a = $.toNumber(a);
			return a;
		}
	});
  return $;
});
