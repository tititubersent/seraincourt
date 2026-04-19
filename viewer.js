// On change de source pour forcer la mise à jour
import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@1.1.10/dist/index.js";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    try {
        const url = "https://huggingface.co/cakewalk/splat-data/resolve/main/train.splat";
        await SPLAT.Loader.LoadAsync(url, scene, (progress) => {
            if (progress === 1) console.log("🚀 NOUVELLE VERSION CHARGÉE !");
        });
    } catch (e) {
        console.error("Erreur :", e);
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
