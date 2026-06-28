import{c as r}from"./createLucideIcon.p-vPGtMN.js";import{c as o}from"./react.BOkoJbwI.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],x=r("pause",u);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",key:"15892j"}],["path",{d:"M3 20V4",key:"1ptbpl"}]],m=r("skip-back",l);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],T=r("skip-forward",d);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],M=r("volume-2",k);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],w=r("volume-x",y),f=o((a,i)=>({currentTrack:null,isPlaying:!1,playlist:[],currentIndex:0,currentTime:0,duration:0,volume:.75,isMuted:!1,seekVersion:0,seekTime:0,setPlaylist:e=>a({playlist:e}),playTrack:e=>{const{playlist:t}=i();let n=t.findIndex(c=>c.id===e.id),s=t;n===-1&&(s=[...t,e],n=s.length-1),a({currentTrack:e,isPlaying:!0,playlist:s,currentIndex:n,currentTime:0,duration:0})},pauseTrack:()=>a({isPlaying:!1}),resumeTrack:()=>a({isPlaying:!0}),nextTrack:()=>{const{playlist:e,currentIndex:t}=i();if(e.length>0&&t<e.length-1){const n=t+1;a({currentIndex:n,currentTrack:e[n],isPlaying:!0,currentTime:0,duration:0})}},prevTrack:()=>{const{playlist:e,currentIndex:t}=i();if(e.length>0&&t>0){const n=t-1;a({currentIndex:n,currentTrack:e[n],isPlaying:!0,currentTime:0,duration:0})}},setCurrentTime:e=>a({currentTime:e}),setDuration:e=>a({duration:e}),setVolume:e=>a({volume:Math.min(1,Math.max(0,e))}),setMuted:e=>a({isMuted:e}),requestSeek:e=>a(t=>({seekVersion:t.seekVersion+1,seekTime:Math.max(0,e),currentTime:Math.max(0,e)}))}));export{x as P,m as S,w as V,T as a,M as b,f as u};
