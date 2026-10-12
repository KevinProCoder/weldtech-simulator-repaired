import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const mat=(color,metalness=.35,roughness=.42)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
function box(parent,w,h,d,material,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function cyl(parent,r1,r2,h,material,x=0,y=0,z=0,rotationZ=0){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,24),material);m.position.set(x,y,z);m.rotation.z=rotationZ;m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function joint(parent,name,axis,pos){const pivot=new THREE.Group();pivot.name=name;pivot.position.set(...pos);parent.add(pivot);pivot.userData.axis=axis;return pivot}
export function buildRobot(scene){const orange=mat('#f47b2a',.5,.32),dark=mat('#293844',.55,.32),silver=mat('#8d9da6',.7,.27),black=mat('#131b21',.4,.5),cyan=mat('#4ed5db',.3,.25),yellow=mat('#ffd166',.25,.2);
 const base=new THREE.Group();scene.add(base);cyl(base,.67,.76,.22,dark,0,.11,0);cyl(base,.48,.55,.18,silver,0,.29,0);cyl(base,.36,.39,.3,orange,0,.52,0);cyl(base,.28,.3,.14,dark,0,.72,0);
 const j1=joint(base,'J1 Base Rotation',[0,1,0],[0,.78,0]);cyl(j1,.3,.34,.24,orange,0,.1,0);cyl(j1,.24,.27,.12,dark,0,.24,0);
 const j2=joint(j1,'J2 Shoulder',[0,0,1],[0,.29,0]);cyl(j2,.27,.28,.42,orange,0,.02,0,Math.PI/2);box(j2,.48,.42,.45,orange,0,.24,0);cyl(j2,.2,.2,.48,silver,0,.53,0,Math.PI/2);
 const upper=box(j2,.25,.9,.27,silver,0,.91,0);upper.rotation.z=-.22;const j3=joint(j2,'J3 Elbow',[0,0,1],[0,1.32,0]);cyl(j3,.29,.3,.34,orange,0,0,0,Math.PI/2);cyl(j3,.17,.19,.67,silver,0,.39,0);const fore=box(j3,.3,.72,.31,orange,0,.43,0);fore.rotation.z=.06;
 const j4=joint(j3,'J4 Wrist Roll',[0,1,0],[0,.79,0]);cyl(j4,.2,.21,.25,dark,0,.02,0);cyl(j4,.14,.16,.45,orange,0,.25,0);const j5=joint(j4,'J5 Wrist Pitch',[0,0,1],[0,.49,0]);cyl(j5,.16,.18,.27,orange,0,0,0,Math.PI/2);const j6=joint(j5,'J6 Torch Rotation',[0,1,0],[0,.15,0]);cyl(j6,.12,.12,.2,dark,0,.06,0);cyl(j6,.07,.1,.3,silver,0,.24,0);const torch=new THREE.Group();torch.position.set(0,.4,0);j6.add(torch);cyl(torch,.055,.07,.25,dark,0,-.03,0,0);cyl(torch,.03,.05,.18,silver,0,-.22,0,.15);cyl(torch,.012,.025,.18,black,0,-.37,0,.15);const nozzle=cyl(torch,.027,.012,.09,orange,0,-.47,0,.15);nozzle.material=yellow;
 // The tool points downward from the flange; a small local tip marks TCP.
 const tcp=new THREE.Object3D();tcp.position.set(0,-.52,0);torch.add(tcp);const tip=new THREE.Mesh(new THREE.SphereGeometry(.035,12,8),cyan);tcp.add(tip);
 const pivots=[j1,j2,j3,j4,j5,j6];pivots.forEach((p,i)=>{p.userData.index=i;p.userData.angle=0});
 const labels=new THREE.Group();scene.add(labels);pivots.forEach((p,i)=>{const sprite=new THREE.Sprite(new THREE.SpriteMaterial({color:'#4ed5db'}));sprite.scale.set(.26,.12,1);sprite.userData.joint=i;labels.add(sprite)});
 return {base,pivots,tcp,torch,labels,materials:{orange,dark,silver,black,cyan,yellow}};
}
export function makeWorkpiece(scene,type='Butt joint'){const g=new THREE.Group();g.name='Workpiece';const steel=new THREE.MeshStandardMaterial({color:'#687985',metalness:.72,roughness:.34}),edge=new THREE.MeshStandardMaterial({color:'#a9b7bd',metalness:.65,roughness:.3});const add=(w,h,d,x,y,z,m=steel)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o};
 if(type==='Fillet T-joint'){add(2.4,.12,.85,0,.08,0);add(2.4,.72,.12,0,.48,-.05);}
 else if(type==='Lap joint'){add(2.4,.12,.9,-.25,.08,0);add(2.4,.12,.9,.25,.2,0,edge);}
 else if(type==='Corner joint'){add(2.4,.12,.8,0,.08,.28);add(2.4,.7,.12,0,.43,-.08);}
 else if(type==='Pipe'){const p=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,1.7,32,1,true),steel);p.rotation.z=Math.PI/2;p.position.set(0,.48,0);p.castShadow=true;g.add(p);const ring=new THREE.Mesh(new THREE.TorusGeometry(.45,.04,8,32),edge);ring.rotation.y=Math.PI/2;ring.position.set(.25,.48,0);g.add(ring);}
 else if(type==='Flat plate'){add(2.4,.12,1.05,0,.08,0);}
 else {add(2.4,.12,.85,-.62,.08,0);add(2.4,.12,.85,.62,.08,0);}
 g.position.set(1.65,0,0);scene.add(g);return g;}
export function makeWeldLine(scene,points,color=0x4ed5db){const geom=new THREE.BufferGeometry().setFromPoints(points);const line=new THREE.Line(geom,new THREE.LineBasicMaterial({color,transparent:true,opacity:.9}));scene.add(line);return line}
