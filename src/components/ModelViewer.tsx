import {Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type ComponentRef, type RefObject, createContext, useContext, useCallback} from 'react';
import {Canvas, useLoader, useThree} from '@react-three/fiber';
import {ContactShadows, Environment, Lightformer, Html, OrbitControls, useProgress} from '@react-three/drei';
import {Box3, PerspectiveCamera, Vector3, type Object3D} from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {KTX2Loader} from 'three/addons/loaders/KTX2Loader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {asset} from '../lib/paths';

type View = 'perspective'|'front'|'side'|'top';
type Point = [number,number,number];
interface Props {src:string;studioLighting?:boolean;focusNodes?:string[];mobileSrc?:string;poster:string;title:string;autoStartDesktop?:boolean;bytes?:number;mobileBytes?:number;}
interface Hotspot {title:string;description:string;position:Point}
type ControlsRef = RefObject<ComponentRef<typeof OrbitControls>|null>;

class ViewerBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){this.props.onError();}
  render(){return this.state.failed?null:this.props.children;}
}
function Loading(){const {progress}=useProgress();return <div className="model-loading" role="status">正在加载模型 · {Math.round(progress)}%</div>;}
function Rig({view,revision,dimensions,controls}:{view:View;revision:number;dimensions:Point;controls:ControlsRef}){
  const {camera,invalidate,size}=useThree();
  useLayoutEffect(()=>{
    if(!(camera instanceof PerspectiveCamera))return;
    const directions:Record<View,Point>={perspective:[3,1.2,7],front:[1,.035,0],side:[0,.035,1],top:[0,1,.001]};
    const eye=new Vector3(...directions[view]).normalize();
    const right=new Vector3().crossVectors(new Vector3(0,1,0),eye).normalize();
    const up=new Vector3().crossVectors(eye,right).normalize();
    const tanV=Math.tan(camera.fov*Math.PI/360);const tanH=tanV*size.width/size.height;
    let distance=0;
    for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1]){
      const p=new Vector3(x*dimensions[0]/2,y*dimensions[1]/2,z*dimensions[2]/2);
      distance=Math.max(distance,p.dot(eye)+Math.abs(p.dot(right))/tanH,p.dot(eye)+Math.abs(p.dot(up))/tanV);
    }
    camera.position.copy(eye.multiplyScalar(Math.max(2,distance)*1.08));camera.lookAt(0,0,0);camera.updateProjectionMatrix();
    controls.current?.target.set(0,0,0);controls.current?.update();invalidate();
  },[view,revision,dimensions,camera,invalidate,size.width,size.height,controls]);return null;
}
function Model({src,focusNodes,onSelect,onReady}:{src:string;focusNodes?:string[];onSelect:(h:Hotspot)=>void;onReady:()=>void}){
  const {gl}=useThree();const controls=useRef<ComponentRef<typeof OrbitControls>>(null);
  const gltf=useLoader(GLTFLoader,src,loader=>{loader.setMeshoptDecoder(MeshoptDecoder);loader.setKTX2Loader(new KTX2Loader().setTranscoderPath(asset('/models/basis/')).detectSupport(gl));});
  const {scene,scale,rotation,center,dimensions,hotspots}=useMemo(()=>{
    const scene=gltf.scene.clone(true);scene.updateMatrixWorld(true);
    if(focusNodes?.length){
      const keep=new Set<Object3D>();keep.add(scene);
      for(const name of focusNodes){const part=scene.getObjectByName(name);if(!part)throw new Error(`Configured model part not found: ${name}`);part.traverse(obj=>keep.add(obj));let parent=part.parent;while(parent){keep.add(parent);parent=parent.parent;}}
      const excluded:Object3D[]=[];scene.traverse(obj=>{if(!keep.has(obj))excluded.push(obj);});for(const obj of excluded)obj.removeFromParent();scene.updateMatrixWorld(true);
    }
    const bounds=new Box3().setFromObject(scene);const size=bounds.getSize(new Vector3());const center=bounds.getCenter(new Vector3());
    const scale=6/Math.max(size.x,size.y,size.z);const rotation=size.z>size.x?Math.PI/2:0;
    const dimensions:Point=rotation?[size.z*scale,size.y*scale,size.x*scale]:[size.x*scale,size.y*scale,size.z*scale];
    const points:Hotspot[]=[];
    if(src.includes('rail-principle')){
      const add=(pattern:RegExp,title:string,description:string)=>{let found:Object3D|undefined;scene.traverse(obj=>{if(!found&&pattern.test(obj.name))found=obj;});if(found){const p=new Box3().setFromObject(found).getCenter(new Vector3()).sub(center).multiplyScalar(scale).applyAxisAngle(new Vector3(0,1,0),rotation);points.push({title,description,position:[p.x,p.y+.14,p.z]});}};
      add(/pantograph_head/i,'受电弓','通过接触网获取电能。这里展示的是通用列车的示意部件，并非特定车型的精确结构。');
      add(/bogie_1/i,'转向架','轮对、构架和悬挂共同承载车体，并帮助车辆通过曲线。实际结构因车型而异。');
    }
    return {scene,scale,rotation,center,dimensions,hotspots:points};
  },[gltf,src,focusNodes]);
  useEffect(onReady,[onReady]);
  return <><group rotation={[0,rotation,0]} scale={scale}><group position={[-center.x,-center.y,-center.z]}><primitive object={scene}/></group></group>
    <ContactShadows position={[0,-dimensions[1]/2-.025,0]} opacity={.28} scale={10} blur={2.8} far={3} resolution={256}/>
    {hotspots.map((h,i)=><Html key={h.title} position={h.position} center zIndexRange={[5,1]}><button className="hotspot" onClick={()=>onSelect(h)} aria-label={`查看${h.title}说明`}>{i+1}</button></Html>)}
    <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={1.5} maxDistance={30} maxPolarAngle={Math.PI/2+.04} target={[0,0,0]}/>
    <ViewRig dimensions={dimensions} controls={controls}/>
  </>;
}
// View changes update the camera without remounting the GLB or its WebGL canvas.
const ViewContext=createContext<{view:View;revision:number}>({view:'perspective',revision:0});
function ViewRig({dimensions,controls}:{dimensions:Point;controls:ControlsRef}){const {view,revision}=useContext(ViewContext);return <Rig view={view} revision={revision} dimensions={dimensions} controls={controls}/>;}
export default function ModelViewer({src,studioLighting=false,focusNodes,mobileSrc,poster,title,autoStartDesktop=false,bytes,mobileBytes}:Props){
  const [started,setStarted]=useState(false);const [failed,setFailed]=useState(false);const [supported,setSupported]=useState(true);const [loaded,setLoaded]=useState(false);
  const [revision,setRevision]=useState(0);const [attempt,setAttempt]=useState(0);const [view,setView]=useState<View>('perspective');const [hotspot,setHotspot]=useState<Hotspot|null>(null);const shell=useRef<HTMLDivElement>(null);
  const [expanded,setExpanded]=useState(false);const [mobile,setMobile]=useState(false);
  const start=useCallback(()=>{try{const c=document.createElement('canvas');const context=c.getContext('webgl2')||c.getContext('webgl');if(!context){setSupported(false);return;}context.getExtension('WEBGL_lose_context')?.loseContext();setFailed(false);setStarted(true);}catch{setSupported(false);}},[]);
  const onReady=useCallback(()=>setLoaded(true),[]);
  useEffect(()=>{const limited=window.matchMedia('(max-width: 768px)').matches;setMobile(limited);const saveData=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;if(autoStartDesktop&&!limited&&!saveData)start();},[autoStartDesktop,start]);
  useEffect(()=>{const onEscape=(e:KeyboardEvent)=>{if(e.key==='Escape')setExpanded(false);};const onFullscreen=()=>{if(!document.fullscreenElement)setExpanded(false);};document.addEventListener('keydown',onEscape);document.addEventListener('fullscreenchange',onFullscreen);return()=>{document.removeEventListener('keydown',onEscape);document.removeEventListener('fullscreenchange',onFullscreen);};},[]);
  useEffect(()=>{if(!expanded)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;};},[expanded]);
  const toggleFullscreen=()=>{if(expanded){setExpanded(false);if(document.fullscreenElement)void document.exitFullscreen().catch(()=>{});}else{setExpanded(true);void shell.current?.requestFullscreen?.().catch(()=>{});}};
  const schematic=src.includes('rail-principle');const selected=mobile&&mobileSrc?mobileSrc:src;const fileBytes=mobile&&mobileBytes?mobileBytes:bytes;
  const retry=()=>{useLoader.clear(GLTFLoader,asset(selected));setAttempt(r=>r+1);setLoaded(false);setFailed(false);setStarted(true);};
  return <div className={`viewer-shell${expanded?' viewer-fullscreen':''}`} ref={shell} data-model-state={failed?'error':loaded?'loaded':started?'loading':'poster'} data-model-src={asset(selected)}>
    {!started||failed||!supported?<><img className="viewer-poster" src={asset(poster)} alt={title}/><div className="viewer-launch">{!supported?<p>当前设备无法启用 3D，可继续查看图文。</p>:failed?<><p>模型暂时未能加载，图文内容仍可正常阅读。</p><button className="button" onClick={retry}>重新加载模型</button></>:<><button className="button" onClick={start}><span aria-hidden>◇</span> 开启 3D 探索</button><p>{schematic?'通用高速列车 · 原理示意模型':`${title} · 可交互模型`}</p></>}</div></>:
    <ViewerBoundary key={attempt} onError={()=>setFailed(true)}><div className="viewer-canvas"><Canvas frameloop="demand" dpr={[1,1.5]} camera={{position:[3,1.2,7],fov:32,near:.02,far:120}} gl={{antialias:true,alpha:true}}><ambientLight intensity={.7}/><hemisphereLight args={['#fff9ee','#a89b85',.65]}/><directionalLight position={[1,7,5]} intensity={1.65}/>{studioLighting&&<Environment resolution={128} frames={1}><Lightformer intensity={2.5} color="#fff5e7" position={[0,6,0]} rotation={[Math.PI/2,0,0]} scale={[10,8,1]}/><Lightformer intensity={2} color="#ffffff" position={[0,2,7]} scale={[12,5,1]}/><Lightformer intensity={1.2} color="#e7efff" position={[-6,2,-3]} rotation={[0,Math.PI/2,0]} scale={[8,4,1]}/></Environment>}<ViewContext.Provider value={{view,revision}}><Suspense fallback={null}><Model src={asset(selected)} focusNodes={focusNodes} onSelect={setHotspot} onReady={onReady}/></Suspense></ViewContext.Provider></Canvas>{!loaded&&<div className="model-loading-overlay"><Loading/></div>}</div></ViewerBoundary>}
    {hotspot&&started&&!failed&&<div className="hotspot-panel"><button className="icon-button" onClick={()=>setHotspot(null)} aria-label="关闭部件说明">×</button><h3>{hotspot.title}</h3><p>{hotspot.description}</p></div>}
    <div className="viewer-toolbar"><span>{loaded&&!failed?'拖动旋转 · 滚轮 / 双指缩放':fileBytes?`模型约 ${(fileBytes/1048576).toFixed(1)} MB · 点击后加载`:schematic?'模型约 1.2 MB · 点击后加载':'点击后加载模型'}</span><div className="view-buttons">{([['front','正面'],['side','侧面'],['top','顶部']] as const).map(([id,label])=><button key={id} disabled={!loaded||failed} aria-pressed={view===id} onClick={()=>{setView(id);setRevision(r=>r+1);}}>{label}</button>)}<button disabled={!loaded||failed} onClick={()=>{setView('perspective');setRevision(r=>r+1);setHotspot(null);}} aria-label="重置模型视角">复位</button><button onClick={toggleFullscreen} aria-label={expanded?'退出全屏模型':'全屏查看模型'}>{expanded?'退出全屏':'全屏'}</button></div></div>
  </div>;
}
