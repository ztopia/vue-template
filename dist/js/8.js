webpackJsonp([8],{205:function(t,e,n){"use strict";function o(t){a||n(263)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(265),i=n.n(s),r=n(266),a=!1,u=n(5),d=o,c=u(i.a,r.a,!1,d,"data-v-9a065408",null);c.options.__file="src\\components\\goods\\pictureAndText.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),e.default=c.exports},207:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={apihost:"http://vue.studyit.io/"}},263:function(t,e,n){var o=n(264);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(6)("cb41b03c",o,!1)},264:function(t,e,n){e=t.exports=n(3)(void 0),e.push([t.i,"\n.titleStyle[data-v-9a065408], .contentStyle[data-v-9a065408]{\n    padding: 5px;\n}\nh4[data-v-9a065408]{\n    color: #0094ff;\n    font-size: 16px;\n    border-bottom: 1px solid rgba(92, 92, 92, 0.3);\n    padding-bottom: 5px;\n}\n",""])},265:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(207),s=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default={data:function(){return{pictureAndTextInfo:{}}},created:function(){console.log(this.$route),this.getPictureAndTextInfoData()},methods:{getPictureAndTextInfoData:function(){var t=this,e=s.default.apihost+"api/goods/getdesc/"+this.$route.params.goodsId;this.$http.get(e).then(function(e){t.pictureAndTextInfo=e.body.message[0]})}}}},266:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"titleStyle"},[n("h4",[t._v(t._s(t.pictureAndTextInfo.title))])]),t._v(" "),n("div",{staticClass:"contentStyle"},[n("p",{domProps:{innerHTML:t._s(t.pictureAndTextInfo.content)}})])])},s=[];o._withStripped=!0;var i={render:o,staticRenderFns:s};e.a=i}});