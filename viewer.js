import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@1.1.10/dist/index.js";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// On recule un peu la caméra par défaut pour bien voir l'objet au début
camera.position.z = 5;

async function main() {
    try {
        // Chargement de TON modèle
        const url = "./model.splat"; 
        
        console.log("Début du chargement de model.splat...");
        
        await SPLAT.Loader.LoadAsync(url, scene, (progress) => {
            console.log("Chargement : " + (progress * 100).toFixed(0) + "%");
        });
        
        console.log("✅ TON MODÈLE EST CHARGÉ !");
        
    } catch (e) {
        console.error("❌ Erreur : Le fichier model.splat est introuvable ou corrompu.", e);
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
