import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@1.1.10/dist/index.js";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

camera.position.z = 5;

async function main() {
    try {
        const url = "./model.splat"; 
        console.log("Chargement du modèle...");
        
        await SPLAT.Loader.LoadAsync(url, scene, (progress) => {
            console.log("Chargement : " + (progress * 100).toFixed(0) + "%");
        });
        
        console.log("✅ MODÈLE CHARGÉ !");
        
    } catch (e) {
        console.error("❌ Erreur de chargement", e);
    }

    function frame() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

main();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});
