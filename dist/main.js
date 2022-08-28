(()=>{"use strict";var e={940:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,i)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return i(t,e),t},c=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))((function(i,n){function c(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,s)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(147));t.default=class{constructor(e){this.getAll=()=>c(this,void 0,void 0,(function*(){try{const e=yield s.promises.readFile(this.nombreArchivo,"utf-8");return JSON.parse(e)}catch(e){console.log("Error:",e)}})),this.nombreArchivo=e,console.log(s.existsSync(e)),s.existsSync(e)||(console.log("Pase por aca!"),s.promises.writeFile(e,JSON.stringify([],null,2)))}save(e){return c(this,void 0,void 0,(function*(){let t=0;try{let r=yield this.getAll();r.forEach((e=>{e.id>t&&(t=e.id)}));const o={id:t+1,nombre:e.nombre,foto:e.foto,price:e.precio,codigo:e.codigo,timestamp:e.timestamp,stock:e.stock,descripcion:e.descripcion};r.push(o);try{return yield s.promises.writeFile(this.nombreArchivo,JSON.stringify(r,null,2)),t+1}catch(e){throw new Error("Error de escritura de archivo")}}catch(e){throw new Error("Error de lectura de archivo")}}))}getById(e){return c(this,void 0,void 0,(function*(){let t;try{(yield this.getAll()).forEach((r=>{r.id==e&&(t=r)}))}catch(e){throw new Error("Error de lectura de archivo")}return t}))}deleteByID(e){return c(this,void 0,void 0,(function*(){try{let t=yield this.getAll();for(let r=0;r<t.length;r++)t[r].id==e&&t.splice(r,1);try{yield s.promises.writeFile(this.nombreArchivo,JSON.stringify(t,null,2))}catch(e){throw new Error("Error de escritura de archivo")}}catch(e){throw new Error("Error de lectura de archivo")}}))}deleteAll(){return c(this,void 0,void 0,(function*(){try{yield s.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,2))}catch(e){console.log("Error en borrar el archivo:",e)}}))}upgradeByID(e){return c(this,void 0,void 0,(function*(){let t=yield this.getAll();t.forEach((t=>{t.id===e.id&&(t.nombre=e.nombre,t.foto=e.foto,t.precio=e.precio,t.codigo=e.codigo,t.stock=e.stock,t.descripcion=e.descripcion)})),this.deleteAll();try{yield s.promises.writeFile(this.nombreArchivo,JSON.stringify(t,null,2))}catch(e){throw new Error("Error de escritura de archivo")}}))}}},607:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(r(860)),n=o(r(73)),c=(0,i.default)();c.listen(8080,(()=>{console.log("Se inicio el server en el puerto: 8080")})),c.on("Error",(e=>{console.log("Ocurrio un error:"+e)})),c.use(i.default.static("public")),c.use("/api/productos",n.default)},73:function(e,t,r){var o=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))((function(i,n){function c(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,s)}l((o=o.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(860),c=i(r(940)),s=(0,n.Router)(),l=new c.default("../productos.txt");s.get("/:id?",((e,t)=>o(void 0,void 0,void 0,(function*(){const{id:r}=e.params;if(void 0===r){const e=yield l.getAll();t.json(e)}else{const e=yield l.getById(r);t.json(e)}})))),s.post("/",((e,t)=>{const{user:r}=e.query;if("Admin"===r){const t=e.body;t.timestamp=Date.now(),l.save(t)}else t.json({Error:"Permisos denegados"})})),s.put(":id",((e,t)=>{let r=e.body;const{id:o}=e.params,{user:i}=e.query;"Admin"===i?(r.id=o,l.upgradeByID(r)):t.json({Error:"Permiso Denegado"})})),s.delete(":id",((e,t)=>{const{id:r}=e.params,{user:o}=e.query;"Admin"===o?l.deleteByID(r):t.json({Error:"Permiso Denegado"})}));const u={timestamp:Date.now(),nombre:"Procesador Intel I9",descripcion:"Tiene muchos nucleos",foto:"https://http2.mlstatic.com/D_NQ_NP_940351-MLA48284640865_112021-O.webp",precio:256e3,stock:20,codigo:"E-0001"};l.save(u),t.default=s},860:e=>{e.exports=require("express")},147:e=>{e.exports=require("fs")}},t={};!function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}(607)})();