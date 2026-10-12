import{c}from"./createLucideIcon.p-vPGtMN.js";import{c as l}from"./react.BOkoJbwI.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",key:"15892j"}],["path",{d:"M3 20V4",key:"1ptbpl"}]],p=c("skip-back",u);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],m=c("skip-forward",o),y=l((r,a)=>({currentTrack:null,isPlaying:!1,playlist:[],currentIndex:0,currentTime:0,duration:0,volume:.75,isMuted:!1,seekVersion:0,seekTime:0,setPlaylist:e=>r({playlist:e}),playTrack:e=>{const{playlist:n}=a();let t=n.findIndex(s=>s.id===e.id),i=n;t===-1&&(i=[...n,e],t=i.length-1),r({currentTrack:e,isPlaying:!0,playlist:i,currentIndex:t,currentTime:0,duration:0})},pauseTrack:()=>r({isPlaying:!1}),resumeTrack:()=>r({isPlaying:!0}),nextTrack:()=>{const{playlist:e,currentIndex:n}=a();if(e.length>0&&n<e.length-1){const t=n+1;r({currentIndex:t,currentTrack:e[t],isPlaying:!0,currentTime:0,duration:0})}},prevTrack:()=>{const{playlist:e,currentIndex:n}=a();if(e.length>0&&n>0){const t=n-1;r({currentIndex:t,currentTrack:e[t],isPlaying:!0,currentTime:0,duration:0})}},setCurrentTime:e=>r({currentTime:e}),setDuration:e=>r({duration:e}),setVolume:e=>r({volume:Math.min(1,Math.max(0,e))}),setMuted:e=>r({isMuted:e}),requestSeek:e=>r(n=>({seekVersion:n.seekVersion+1,seekTime:Math.max(0,e),currentTime:Math.max(0,e)}))}));export{p as S,m as a,y as u};
