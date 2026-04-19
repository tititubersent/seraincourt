import * as SPLAT from "https://unpkg.com/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// On initialise la position pour éviter l'erreur .equals()
camera.position = new SPLAT.Vector3(0, 0, 5);

async function main() {
    try {
        const url = "https://huggingface.co/cakewalk/splat-data/resolve/main/train.splat";
        await SPLAT.Loader.LoadAsync(url, scene, (progress) => {
            console.log("Chargement : " + (progress * 100).toFixed(0) + "%");
        });
        console.log("✅ Modèle chargé !");
    } catch (e) {
        console.error("❌ Erreur :", e);
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
