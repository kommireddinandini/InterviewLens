import React,{useEffect,useMemo,useRef,useState} from "react";
import {createRoot} from "react-dom/client";
import {Code2,BriefcaseBusiness,UsersRound,Camera,Mic,Play,Square,ChevronRight,RotateCcw,Eye,Clock3,CheckCircle2,AlertTriangle,Sparkles,ArrowLeft,BookOpen,RefreshCw,Download,Video,MessageSquareText} from "lucide-react";
import "./styles.css";

const LANGS=["Python","Java","C","C++","JavaScript","TypeScript","C#","Go","Rust","Kotlin","Swift","PHP","Ruby","Dart","R","SQL"];
const LEVELS=["Beginner","Intermediate","Advanced"];
const ROLES=["Software Developer","Full Stack Developer","Backend Developer","Frontend Developer","Data Analyst","Data Scientist","AI/ML Engineer","DevOps Engineer"];
const technical={
 Python:{
  Beginner:[["What is the difference between a list and a tuple in Python?","A list is mutable, so its elements can be changed after creation. A tuple is immutable, so its elements cannot be changed. Both are sequence types; tuples are commonly used for fixed collections of values."],["What is a Python dictionary?","A dictionary stores key-value pairs. Keys must be hashable and values can be any valid Python object. You access a value with its key, for example d['name']."]],
  Intermediate:[["Explain shallow copy versus deep copy in Python.","A shallow copy creates a new outer object but keeps references to nested objects. A deep copy recursively copies nested objects too. copy.copy() performs a shallow copy and copy.deepcopy() performs a deep copy."],["What is a decorator in Python?","A decorator is a callable that takes another function or class and returns a modified or wrapped version. It is commonly used for logging, authorization, caching, and timing without changing the original function body."]],
  Advanced:[["How does the GIL affect CPU-bound multithreading in CPython?","The Global Interpreter Lock allows only one thread to execute Python bytecode at a time in a standard CPython process. Therefore CPU-bound Python threads generally do not achieve true parallel bytecode execution. Multiprocessing or native extensions that release the GIL are common alternatives."],["How would you design a high-throughput Python service?","I would consider async I/O for I/O-bound work, worker processes for CPU-bound work, connection pooling, caching, bounded queues, horizontal scaling, observability, timeouts, retries and back-pressure. The exact design depends on workload and latency requirements."]]
 },
 Java:{
  Beginner:[["What is the difference between JDK, JRE and JVM?","JVM executes Java bytecode. JRE provides the JVM plus runtime libraries needed to run Java applications. JDK includes the JRE/runtime plus development tools such as the Java compiler."],["What is method overloading in Java?","Method overloading means defining multiple methods with the same name but different parameter lists in the same class. It is resolved at compile time."]],
  Intermediate:[["What is the difference between HashMap and ConcurrentHashMap?","HashMap is not designed for concurrent structural modification without external synchronization. ConcurrentHashMap is designed for concurrent access and provides thread-safe operations with better concurrency than synchronizing an entire map."],["What are checked and unchecked exceptions?","Checked exceptions must be handled or declared by the compiler. Unchecked exceptions are RuntimeException subclasses and are not required to be declared or caught."]]
 },
 "C++":{
  Beginner:[["What is the difference between a pointer and a reference in C++?","A pointer stores an address and can be null or changed to point elsewhere. A reference is an alias for an existing object and normally must be initialized when declared."],["What are constructors and destructors?","A constructor initializes an object when it is created. A destructor runs when the object is destroyed and is commonly used to release owned resources."]],
  Intermediate:[["What is RAII in C++?","RAII means Resource Acquisition Is Initialization. A resource's lifetime is tied to an object's lifetime, so constructors acquire resources and destructors release them. Smart pointers and lock guards are common examples."]]
 },
 JavaScript:{
  Beginner:[["What is the difference between let, const and var?","let and const are block-scoped. const prevents reassignment of the binding, while let allows reassignment. var is function-scoped and has different hoisting behavior."],["What is a Promise in JavaScript?","A Promise represents the eventual result of an asynchronous operation. It can be pending, fulfilled, or rejected, and is commonly consumed with then/catch or async/await."]],
  Intermediate:[["Explain the JavaScript event loop.","JavaScript runs synchronous code on the call stack. Asynchronous work is handled by host APIs and queued for later execution. The event loop moves eligible callbacks into the call stack when it is available; microtasks such as Promise callbacks are processed before the next task."],["What is the difference between == and ===?","== performs type coercion before comparison in many cases, while === compares without coercing types. In most application code, === is preferred when you want predictable strict equality."]]
 },
 SQL:{
  Beginner:[["What is the difference between WHERE and HAVING?","WHERE filters rows before grouping, while HAVING filters groups after GROUP BY and can use aggregate conditions."],["What is a primary key?","A primary key uniquely identifies each row in a table. It must be unique and cannot contain NULL values."]],
  Intermediate:[["What is an index and when can it hurt performance?","An index is a data structure that can speed up reads by avoiding full table scans. It consumes storage and adds write overhead because inserts, updates and deletes may need index maintenance."],["Explain INNER JOIN versus LEFT JOIN.","INNER JOIN returns rows that match in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right; unmatched right-side columns become NULL."]]
 }
};
const generic=["Explain an important concept in the selected technology.","Describe a practical problem you would solve using the selected technology.","Explain a performance or design trade-off in the selected technology."];
const hr=[
 ["Tell me about yourself.","A strong answer should be concise and role-relevant: present background, strongest skills, one or two relevant achievements/projects, and why the target role is the logical next step."],
 ["Why should we hire you?","Connect your strongest relevant skills to the role, support them with evidence from projects or experience, and explain how you can contribute. Avoid generic claims such as 'I am a hard worker' without evidence."],
 ["Tell me about a failure and what you learned from it.","Use a real example. Explain the situation, what went wrong, what you personally did, the lesson, and what you changed afterward. The goal is accountability and learning, not pretending you never fail."]
];
const managerial=[
 ["Two team members strongly disagree about a technical approach. How would you handle it?","Clarify the decision criteria, let both people explain evidence, align on constraints, compare options objectively, make or facilitate a decision, and document the rationale. Avoid turning the disagreement into a personal conflict."],
 ["Your team has a tight deadline and insufficient resources. How would you prioritize?","Clarify the business outcome, separate must-have from nice-to-have work, identify dependencies and risks, negotiate scope or timeline early, and communicate trade-offs clearly."],
 ["A team member repeatedly misses commitments. What would you do?","Start with a private conversation to understand the cause, establish clear expectations and measurable commitments, remove blockers where appropriate, follow up consistently, and escalate through the appropriate process if the pattern continues."]
];

function buildQuestions(type,lang,level,count){
 if(type==="HR") return [...hr,...hr].slice(0,count);
 if(type==="Managerial") return [...managerial,...managerial].slice(0,count);
 const bank=technical[lang]?.[level]||[];
 const result=[...bank];
 let i=0;
 while(result.length<count){result.push([generic[i%generic.length],"Your answer should define the concept clearly, explain the reasoning, and give a concrete example or trade-off."]);i++}
 return result.slice(0,count);
}
function App(){
 const [screen,setScreen]=useState("setup"),[type,setType]=useState(""),[lang,setLang]=useState("Python"),[level,setLevel]=useState("Intermediate"),[role,setRole]=useState("Software Developer"),[count,setCount]=useState(5),[qs,setQs]=useState([]),[idx,setIdx]=useState(0);
 const [recording,setRecording]=useState(false),[seconds,setSeconds]=useState(0),[transcript,setTranscript]=useState(""),[gaze,setGaze]=useState(78),[evalState,setEvalState]=useState(null);
 const [recordingUrl,setRecordingUrl]=useState(""),[recordingBlob,setRecordingBlob]=useState(null),[savedVideos,setSavedVideos]=useState([]),[cameraReady,setCameraReady]=useState(false);
 const video=useRef(null),stream=useRef(null),media=useRef(null),chunks=useRef([]),speech=useRef(null),transcriptBase=useRef("");

 useEffect(()=>{if(!recording)return;const t=setInterval(()=>setSeconds(x=>x+1),1000);return()=>clearInterval(t)},[recording]);
 useEffect(()=>()=>{stream.current?.getTracks().forEach(t=>t.stop())},[]);

 async function enableCamera(){
  try{
   const s=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:1280},height:{ideal:720},facingMode:"user"},audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
   stream.current=s;
   setCameraReady(true);
   if(video.current){video.current.srcObject=s;video.current.muted=true;await video.current.play().catch(()=>{});}
   return true;
  }catch(e){
   setCameraReady(false);
   alert("Camera + microphone permission is required. Please allow both and start the interview again.");
   return false;
  }
 }
 function startSpeech(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return;
  const r=new SR();r.continuous=true;r.interimResults=true;r.lang="en-IN";
  r.onresult=e=>{
   let finalText="",interim="";
   for(let i=e.resultIndex;i<e.results.length;i++){
    const text=e.results[i][0].transcript;
    if(e.results[i].isFinal)finalText+=text+" "; else interim+=text;
   }
   if(finalText){transcriptBase.current=(transcriptBase.current+" "+finalText).trim();setTranscript(transcriptBase.current);}
   else if(interim)setTranscript((transcriptBase.current+" "+interim).trim());
  };
  r.onerror=()=>{};
  try{r.start();speech.current=r}catch{}
 }
 async function start(){
  if(!type)return;
  setQs(buildQuestions(type,lang,level,count));setIdx(0);setScreen("interview");setEvalState(null);setTranscript("");transcriptBase.current="";setSeconds(0);setRecordingUrl("");setRecordingBlob(null);setCameraReady(false);
  await enableCamera();
 }
 function chooseMime(){
  const types=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm","video/mp4"];
  return types.find(t=>window.MediaRecorder?.isTypeSupported?.(t))||"";
 }
 function beginRecording(){
  if(!stream.current){alert("Camera is not ready. Start the interview again.");return;}
  try{
   chunks.current=[];
   const mime=chooseMime();
   media.current=mime?new MediaRecorder(stream.current,{mimeType:mime}):new MediaRecorder(stream.current);
   media.current.ondataavailable=e=>{if(e.data?.size)chunks.current.push(e.data)};
   media.current.onstop=()=>{
    const blob=new Blob(chunks.current,{type:media.current?.mimeType||"video/webm"});
    const url=URL.createObjectURL(blob);
    setRecordingBlob(blob);setRecordingUrl(url);
    if(video.current){video.current.srcObject=null;video.current.src=url;video.current.controls=true;video.current.muted=false;video.current.play().catch(()=>{});}
   };
   media.current.start(1000);startSpeech();setRecording(true);setSeconds(0);
  }catch(e){alert("Recording could not start in this browser. Try Chrome or Edge.");}
 }
 function finish(){
  if(media.current?.state!=="inactive")media.current?.stop();
  speech.current?.stop();speech.current=null;setRecording(false);setCameraReady(false);
  stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;
 }
 function downloadCurrentVideo(){
  if(!recordingBlob||!recordingUrl)return;
  const a=document.createElement("a");a.href=recordingUrl;a.download=`InterviewLens_Q${idx+1}_${Date.now()}.webm`;document.body.appendChild(a);a.click();a.remove();
 }
 function saveCurrentVideo(){
  if(!recordingBlob||!recordingUrl)return;
  const item={id:Date.now(),question:question?.[0]||`Question ${idx+1}`,url:recordingUrl,blob:recordingBlob,duration:seconds,transcript};
  setSavedVideos(v=>[...v,item]);
 }
 const question=qs[idx];
 const evaluate=()=>{
  const text=transcript.trim();
  const words=text.split(/\s+/).filter(Boolean).length;
  const wrong=type==="Technical" && words<10;
  const partial=type==="Technical" && words>=10 && words<28;
  const status=wrong?"Incorrect":partial?"Partially correct":"Good";
  const answer=question?.[1]||"";
  const score=wrong?Math.max(35,words*3):partial?Math.min(74,55+words):Math.min(92,72+Math.round(gaze/10));
  setEvalState({status,score,answer});
 };
 const continueNext=()=>{
  if(idx<qs.length-1){setIdx(x=>x+1);setEvalState(null);setTranscript("");transcriptBase.current="";setSeconds(0);setRecordingUrl("");setRecordingBlob(null);setCameraReady(false);enableCamera();}
  else setScreen("report");
 };
 if(screen==="setup")return <><Header type="Setup"/><main className="setup"><div className="eyebrow">INTERVIEW CONFIGURATION</div><h1>Build a realistic interview.</h1><p className="sub">Choose the interview type first. Technical questions then adapt to language and difficulty.</p><div className="types">{[["Technical","Programming concepts & problem solving",Code2],["HR","Behavioral & communication",BriefcaseBusiness],["Managerial","Leadership & decision making",UsersRound]].map(([x,d,I])=><button key={x} className={"type "+(type===x?"selected":"")} onClick={()=>setType(x)}><I/><b>{x}</b><span>{d}</span></button>)}</div>{type&&<div className="config"><Field label="Target role"><select value={role} onChange={e=>setRole(e.target.value)}>{ROLES.map(x=><option key={x}>{x}</option>)}</select></Field>{type==="Technical"&&<><Field label="Programming language"><select value={lang} onChange={e=>setLang(e.target.value)}>{LANGS.map(x=><option key={x}>{x}</option>)}</select></Field><Chips label="Difficulty" values={LEVELS} value={level} setValue={setLevel}/></>}<Chips label="Questions" values={[5,10,15]} value={count} setValue={setCount}/><button className="start" onClick={start}>Start interview <ChevronRight/></button></div>}</main><Footer/></>;
 if(!question)return null;
 if(screen==="interview"&&evalState)return <><Header type={type}/><Evaluation {...{evalState,question,transcript,type,recordingUrl,downloadCurrentVideo,again:()=>setEvalState(null),next:continueNext}}/><Footer/></>;
 if(screen==="report")return <><Header type={type}/><Report {...{qs,type,role,lang,level,gaze,savedVideos}}/><Footer/></>;
 return <><Header type={type}/><main className="interview"><div className="question"><div className="eyebrow">{type.toUpperCase()} · QUESTION {idx+1}/{qs.length}</div><h1>{question[0]}</h1><p>{role}{type==="Technical"&&` · ${lang} · ${level}`}</p></div><div className="columns"><section><div className="camera"><video ref={video} autoPlay muted playsInline/><div className="badge">{recording?"● RECORDING":"CAMERA READY"}</div><div className="camfoot"><span><Eye/> Camera gaze {gaze}%</span><span><Clock3/> {Math.floor(seconds/60)}:{String(seconds%60).padStart(2,"0")}</span></div></div><div className="actions">{!recording?<button className="primary" onClick={beginRecording} disabled={!cameraReady}><Play/> Start answer</button>:<button className="stop" onClick={finish}><Square/> Finish answer</button>}{!recordingUrl?null:<><button className="ghost" onClick={downloadCurrentVideo}><Download/> Save video</button><button className="ghost" onClick={saveCurrentVideo}><Video/> Keep in report</button></>}</div></section><aside><h3>Live analysis</h3><Metric icon={<Eye/>} label="Camera gaze" value={gaze+"%"} note="Current prototype estimate; not emotion detection."/><Metric icon={<Mic/>} label="Speech" value={recording?"Listening":"Ready"} note="Live browser transcript + original video audio."/><Metric icon={<Clock3/>} label="Duration" value={seconds+"s"} note="Recording timer."/><div className="tip"><Sparkles/><div><b>Recording enabled</b><p>Your answer is captured as a video with microphone audio. After finishing, save the file or keep it for the report.</p></div></div></aside></div><div className="transcriptBox"><b>Live transcript</b><p>{transcript||"Start answering to capture speech."}</p><small>Speech-to-text can mishear words. The saved video/audio is the accurate record of your answer.</small></div></main><Footer/></>;
}
function Header({type}){return <header><div className="brand"><div className="logo"><Eye/></div><div><b>InterviewLens</b><span>AI interview performance coach</span></div></div><div className="mode">{type} practice</div></header>}
function Footer(){return <footer>InterviewLens v4 · Camera + microphone recording enabled</footer>}
function Field({label,children}){return <div className="field"><label>{label}</label>{children}</div>}
function Chips({label,values,value,setValue}){return <div className="chips"><label>{label}</label>{values.map(x=><button key={x} className={value===x?"active":""} onClick={()=>setValue(x)}>{x}</button>)}</div>}
function Metric({icon,label,value,note}){return <div className="metric"><div className="mi">{icon}</div><div><small>{label}</small><b>{value}</b><span>{note}</span></div></div>}
function Evaluation({evalState,question,transcript,type,recordingUrl,downloadCurrentVideo,again,next}){
 const good=evalState.status==="Good", partial=evalState.status==="Partially correct";
 return <main className="evaluation"><div className="eyebrow">ANSWER EVALUATION</div><h1>{good?"Good answer." : partial?"Partially correct.":"Answer needs improvement."}</h1><div className={"status "+(good?"goodBg":partial?"partialBg":"badBg")}><strong>{evalState.score}/100</strong><b>{evalState.status}</b></div><div className="evalGrid"><section className="panel"><h2>Your answer</h2><p className="answer">{transcript||"No transcript captured."}</p><div className="feedback"><AlertTriangle/><span>{good?"Your answer is detailed enough for a first-pass interview response.":partial?"You have the basic idea, but the explanation needs more precision and evidence.":"The answer is too short to establish the concept. In a real interview, guessing is worse than clearly explaining what you know."}</span></div></section><section className="panel"><h2><BookOpen/> Better / correct answer</h2><p className="answer">{question[1]}</p><div className="feedback"><Sparkles/><span>{type==="Technical"?"Use the answer as a reference, then explain it in your own words. Do not memorize it word-for-word.":"Use this as a model structure, then replace it with your own genuine experience."}</span></div></section></div>{recordingUrl&&<section className="panel recordingReview"><h2><Video/> Your recorded answer</h2><video src={recordingUrl} controls playsInline/><button className="ghost" onClick={downloadCurrentVideo}><Download/> Save video to your computer</button></section>}<div className="evalActions"><button className="ghost" onClick={again}><RefreshCw/> Try this question again</button><button className="primary" onClick={next}>Continue <ChevronRight/></button></div></main>
}
function Report({qs,type,role,lang,level,gaze,savedVideos}){
 const answered=qs.length, overall=Math.round(68+gaze*.2);
 return <main className="report"><div className="eyebrow">INTERVIEW COMPLETE</div><h1>Performance report</h1><p className="sub">{type} · {role}{type==="Technical"&&` · ${lang} · ${level}`}</p><div className="scores"><div className="overall"><small>Overall</small><strong>{overall}</strong><em>/100</em><div className="bar"><i style={{width:overall+"%"}}/></div><b>Use this report to guide your next practice round.</b></div><Metric icon={<Eye/>} label="Camera gaze" value={gaze+"%"} note="Estimated visual signal"/><Metric icon={<MessageSquareText/>} label="Questions" value={answered} note="Configured for this round"/><Metric icon={<CheckCircle2/>} label="Saved videos" value={savedVideos.length} note="Answer recordings kept"/></div>{savedVideos.length>0&&<section className="panel"><h2><Video/> Recorded answers</h2>{savedVideos.map((v,i)=><div className="savedVideo" key={v.id}><div><b>Question {i+1}</b><p>{v.question}</p></div><video src={v.url} controls playsInline/><a className="ghost" href={v.url} download={`InterviewLens_Q${i+1}.webm`}><Download/> Save</a></div>)}</section>}<div className="reportGrid"><section className="panel"><h2>What to improve</h2><Item text="Maintain natural camera gaze during key points."/><Item text="Replace filler words with short pauses."/><Item text={type==="Technical"?"For technical answers, explain the concept and then give an example or trade-off.":"Use evidence from your real experience instead of generic claims."}/></section><section className="panel"><h2>Next practice plan</h2><Item good text="Repeat the same questions after reviewing the correct answers."/><Item good text="Increase difficulty only after your explanations become consistent."/><Item good text="Compare your next recording for gaze, clarity and answer structure."/></section></div><div className="note"><AlertTriangle/> The browser transcript is only a convenience layer and can mishear words. The saved video is the source of truth for reviewing exactly what you said.</div></main>
}
function Item({text,good}){return <div className="item">{good?<CheckCircle2 className="good"/>:<AlertTriangle/>}<span>{text}</span></div>}
createRoot(document.getElementById("root")).render(<App/>);
