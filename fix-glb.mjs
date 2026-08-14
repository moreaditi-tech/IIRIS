import { NodeIO } from '@gltf-transform/core';
import { metalRough } from '@gltf-transform/functions';
import { KHRMaterialsPBRSpecularGlossiness, KHRMaterialsUnlit, KHRMaterialsClearcoat, KHRMaterialsTransmission } from '@gltf-transform/extensions';

async function run() {
  const io = new NodeIO()
    .registerExtensions([KHRMaterialsPBRSpecularGlossiness, KHRMaterialsUnlit, KHRMaterialsClearcoat, KHRMaterialsTransmission]);
    
  console.log("Reading GLB...");
  const document = await io.read('public/models/Drone.glb');
  
  console.log("Transforming GLB to MetallicRoughness...");
  await document.transform(metalRough());
  
  console.log("Writing GLB...");
  await io.write('public/models/Drone.glb', document);
  console.log("Done!");
}

run().catch(console.error);
