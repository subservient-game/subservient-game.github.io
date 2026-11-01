/* Gli oggetti esauriti spariscono dall'inventario dopo il loro ultimo uso utile */
(()=>{ if (!window.ADV) return;
 const USED={1:{guanti:['use:toilet'],retino:['use:fountain'],brillantina:['use:me'],baffi:['use:me'],ascia:['use:log','use:warehouse']},
  2:{vero:['use:bdoor','use:maptable'],ciabatta:['use:bell0']},
  3:{collana:['use:me'],bussola:['use:mare']}};
 const od=window.avDo;
 window.avDo=async function(verb,t,item){
   const f0=JSON.stringify(AV.st.f); let fb=false; const odf=window.avDefault; window.avDefault=function(...a){ fb=true; return odf.apply(this,a); };
   try { return await od.apply(this,arguments); }
   finally { window.avDefault=odf;
     try { const tab=USED[CHN()]; const k=verb+':'+(t&&t.id); if (!fb && item && tab && tab[item] && tab[item].includes(k) && JSON.stringify(AV.st.f)!==f0){ const f=F(); f.__iu=f.__iu||{}; f.__iu[item+'|'+k]=1; if (tab[item].every(x=>f.__iu[item+'|'+x]) && avHas(item)){ avDel(item); avSave(); avRender(); } } } catch(e){} }
 };
})();
