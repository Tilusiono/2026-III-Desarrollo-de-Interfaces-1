import test from 'node:test';
import assert from 'node:assert/strict';
import { Usuario } from './js/modelos/Usuario.js';
import { Alumno } from './js/modelos/Alumno.js';
import { Maestro } from './js/modelos/Maestro.js';
import { PersonalAseo } from './js/modelos/PersonalAseo.js';
import { FabricaUsuarios } from './js/fabricas/FabricaUsuarios.js';
import { RepositorioUsuariosMemoria } from './js/repositorios/RepositorioUsuariosMemoria.js';
import { RegistroUsuarios } from './js/servicios/RegistroUsuarios.js';
import { TablaUsuarios } from './js/vistas/TablaUsuarios.js';
const comunes=['Ana','Pérez','ana@example.com','999999999','1993-08-28','femenino','Mensaje de prueba'];
const fabrica=new FabricaUsuarios({alumno:Alumno,maestro:Maestro,personalAseo:PersonalAseo});
const objetos=()=>[
 fabrica.crear('alumno',...comunes,'ALU-001','Sistemas'),
 fabrica.crear('maestro',...comunes,'Matemáticas','Maestría'),
 fabrica.crear('personalAseo',...comunes,'Pabellón A','Mañana')
];
test('acumula objetos completos de los tres roles',()=>{
 const servicio=new RegistroUsuarios(new RepositorioUsuariosMemoria());
 objetos().forEach(u=>servicio.registrar(u));
 assert.equal(servicio.listar().length,3);
 assert.deepEqual(servicio.listar().map(u=>u.obtenerRol()),['Alumno','Maestro','Personal de aseo']);
 servicio.listar().forEach(u=>{assert.ok(u instanceof Usuario);assert.equal(u.obtenerDetalles().length,2);});
 assert.match(servicio.listar()[0].obtenerDescripcion(),/Sistemas/);
 assert.match(servicio.listar()[1].obtenerDescripcion(),/Matemáticas/);
 assert.match(servicio.listar()[2].obtenerDescripcion(),/Mañana/);
});
test('campos privados controlados y campos públicos modificables',()=>{
 const [u]=objetos();
 u.nombre='Daniel'; assert.equal(u.nombre,'Daniel');
 assert.throws(()=>{u.apellido=' ';});
 assert.throws(()=>{u.rol='Maestro';},TypeError);
 assert.equal(Object.hasOwn(u,'#nombre'),false);
 u.correo='nuevo@example.com'; assert.equal(u.correo,'nuevo@example.com');
 u.carrera='Diseño'; assert.equal(u.carrera,'Diseño');
 assert.throws(()=>{u.codigoAlumno=' ';});
});
test('rechaza roles desconocidos y campos propios vacíos',()=>{
 assert.throws(()=>fabrica.crear('otro',...comunes,'a','b'));
 assert.throws(()=>new Usuario(...comunes,'Usuario'));
 assert.throws(()=>new Maestro(...comunes,'','Maestría'));
 assert.throws(()=>new Alumno(...comunes,'ALU-001',''));
 assert.throws(()=>new PersonalAseo(...comunes,'Área A',''));
});
test('listar protege la colección interna',()=>{
 const repo=new RepositorioUsuariosMemoria(); repo.guardar(objetos()[0]);
 repo.listar().pop(); assert.equal(repo.listar().length,1);
});
test('tabla usa los métodos de los objetos y presenta los detalles como texto',()=>{
 const elemento=()=>({children:[],textContent:'',appendChild(n){this.children.push(n);},replaceChildren(f){this.children=[...f.children];}});
 globalThis.document={createElement:elemento,createDocumentFragment:elemento};
 try {
  const usuarios=objetos(),cuerpo=elemento(),contador=elemento();
  usuarios[0].mensaje='<img src=x onerror=alert(1)>';
  const vista=new TablaUsuarios(cuerpo,contador);
  vista.mostrar(usuarios); vista.mostrar(usuarios);
  assert.equal(cuerpo.children.length,3); assert.equal(contador.textContent,'3');
  cuerpo.children.forEach((fila,i)=>{
   assert.equal(fila.children[6].textContent,usuarios[i].obtenerRol());
   assert.equal(fila.children[7].textContent,usuarios[i].obtenerDescripcion());
   assert.ok(fila.children[8].textContent.includes(usuarios[i].obtenerDetalles()[0][1]));
  });
  assert.equal(cuerpo.children[0].children[9].textContent,usuarios[0].mensaje);
 } finally {delete globalThis.document;}
});

import { CamposRol } from './js/vistas/CamposRol.js';
import { rutasFormulario } from './server/rutas/formulario.routes.js';

test('cambio de rol activa solo sus dos campos propios',()=>{
 const selector={value:'',addEventListener(evento,fn){this.cambiar=fn;}};
 const panel=(rol,a,b)=>({dataset:{rol},hidden:true,disabled:true,querySelectorAll(){return [{value:a},{value:b}];}});
 const paneles=[panel('alumno','ALU-001','Sistemas'),panel('maestro','Matemáticas','Maestría'),panel('personalAseo','Biblioteca','Noche')];
 const vista=new CamposRol(selector,paneles); vista.iniciar();
 assert.ok(paneles.every(p=>p.hidden&&p.disabled));
 for(const [i,tipo] of ['alumno','maestro','personalAseo'].entries()){
  selector.value=tipo;selector.cambiar();
  assert.equal(paneles.filter(p=>!p.hidden).length,1);
  assert.equal(paneles[i].disabled,false);
  assert.ok(paneles.filter((_,j)=>j!==i).every(p=>p.disabled));
  assert.equal(vista.obtenerValores().length,2);
 }
 selector.value='';vista.actualizar();assert.ok(paneles.every(p=>p.hidden&&p.disabled));
});

test('rutas del formulario y recursos están separadas del servidor',async()=>{
 const respuesta=()=>({status:null,contenido:'',writeHead(codigo){this.status=codigo;},end(valor){this.contenido=valor;}});
 for(const [url,codigo] of [['/formulario',200],['/js/formularioRegistro.js',200],['/css/estilo.css',200],['/js/%2e%2e%2fserver.js',404]]){
  const r=respuesta();assert.equal(await rutasFormulario({url,method:'GET'},r),true);assert.equal(r.status,codigo);
 }
 const post=respuesta();await rutasFormulario({url:'/formulario',method:'POST'},post);assert.equal(post.status,405);
 assert.equal(await rutasFormulario({url:'/server.js',method:'GET'},respuesta()),false);
});
