!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("ecl",function(e){function t(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}function n(e,t){return t.startOfLine?(e.skipToEnd(),"meta"):!1}function r(e,t){var n=e.next();if(g[n]){var r=g[n](e,t);if(r!==!1)return r}if('"'==n||"'"==n)return t.tokenize=o(n),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return c=n,null;if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if("/"==n){if(e.eat("*"))return t.tokenize=i,i(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(v.test(n))return e.eatWhile(v),"operator";e.eatWhile(/[\w\$_]/);var a=e.current().toLowerCase();if(d.propertyIsEnumerable(a))return y.propertyIsEnumerable(a)&&(c="newstatement"),"keyword";if(p.propertyIsEnumerable(a))return y.propertyIsEnumerable(a)&&(c="newstatement"),"variable";if(f.propertyIsEnumerable(a))return y.propertyIsEnumerable(a)&&(c="newstatement"),"variable-2";if(m.propertyIsEnumerable(a))return y.propertyIsEnumerable(a)&&(c="newstatement"),"variable-3";if(h.propertyIsEnumerable(a))return y.propertyIsEnumerable(a)&&(c="newstatement"),"builtin";for(var l=a.length-1;l>=0&&(!isNaN(a[l])||"_"==a[l]);)--l;if(l>0){var s=a.substr(0,l+1);if(m.propertyIsEnumerable(s))return y.propertyIsEnumerable(s)&&(c="newstatement"),"variable-3"}return b.propertyIsEnumerable(a)?"atom":null}function o(e){return function(t,n){for(var o,i=!1,a=!1;null!=(o=t.next());){if(o==e&&!i){a=!0;break}i=!i&&"\\"==o}return!a&&i||(n.tokenize=r),"string"}}function i(e,t){for(var n,o=!1;n=e.next();){if("/"==n&&o){t.tokenize=r;break}o="*"==n}return"comment"}function a(e,t,n,r,o){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=o}function l(e,t,n){return e.context=new a(e.indented,t,n,null,e.context)}function s(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}var c,u=e.indentUnit,d=t("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode"),p=t("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait"),f=t("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath"),m=t("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode"),h=t("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when"),y=t("catch class do else finally for if switch try while"),b=t("true false null"),g={"#":n},v=/[+\-*&%=<>!?|\/]/;return{startState:function(e){return{tokenize:null,context:new a((e||0)-u,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;c=null;var o=(t.tokenize||r)(e,t);if("comment"==o||"meta"==o)return o;if(null==n.align&&(n.align=!0),";"!=c&&":"!=c||"statement"!=n.type)if("{"==c)l(t,e.column(),"}");else if("["==c)l(t,e.column(),"]");else if("("==c)l(t,e.column(),")");else if("}"==c){for(;"statement"==n.type;)n=s(t);for("}"==n.type&&(n=s(t));"statement"==n.type;)n=s(t)}else c==n.type?s(t):("}"==n.type||"top"==n.type||"statement"==n.type&&"newstatement"==c)&&l(t,e.column(),"statement");else s(t);return t.startOfLine=!1,o},indent:function(e,t){if(e.tokenize!=r&&null!=e.tokenize)return 0;var n=e.context,o=t&&t.charAt(0);"statement"==n.type&&"}"==o&&(n=n.prev);var i=o==n.type;return"statement"==n.type?n.indented+("{"==o?0:u):n.align?n.column+(i?0:1):n.indented+(i?0:u)},electricChars:"{}"}}),e.defineMIME("text/x-ecl","ecl")});