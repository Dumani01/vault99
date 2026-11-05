import {useEffect,useState} from 'react';
import {api} from './api';
export function useResource(path,version=0){const [state,setState]=useState({data:null,loading:true,error:''});const [retry,setRetry]=useState(0);
 useEffect(()=>{let active=true;setState({data:null,loading:true,error:''});api(path).then(data=>{if(active)setState({data,loading:false,error:''});}).catch(e=>{if(active)setState({data:null,loading:false,error:e.message});});return()=>{active=false;};},[path,version,retry]);
 return {...state,reload:()=>setRetry(v=>v+1)};
}
