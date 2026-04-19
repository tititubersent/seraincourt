import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@1.1.10/dist/index.js";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    try {
        // ICI : Remplace "ton_fichier.splat" par le nom exact de ton fichier sur GitHub
        // Si ton fichier est à la racine, garde le "./" devant.
        const url = "./ton_fichier.splat"; 
        
        await SPLAT.Loader.LoadAsync(url, scene, (progress) => {
            console.log("Chargement : " + (progress * 100).toFixed(0) + "%");
        });
        console.log("✅ Ton modèle est chargé !");
    } catch (e) {
        console.error("❌ Erreur de chargement : Vérifie le nom du fichier .splat", e);
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
