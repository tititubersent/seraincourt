import * as SPLAT from "https://unpkg.com/gsplat@latest";

window.addEventListener("DOMContentLoaded", async () => {

    const canvas = document.getElementById("canvas");

    const renderer = new SPLAT.WebGLRenderer(canvas);
    const scene = new SPLAT.Scene();
    const camera = new SPLAT.Camera();
    const controls = new SPLAT.OrbitControls(camera, canvas);

    renderer.setSize(window.innerWidth, window.innerHeight);

    try {
        await SPLAT.Loader.LoadAsync(
            "https://huggingface.co/cakewalk/splat-data/resolve/main/train.splat",
            scene,
            () => {}
        );
        console.log("✅ modèle chargé avec succès !");
    } catch (e) {
        console.error("❌ erreur chargement :", e);
        return;
    }

    // CORRECTION ICI : On change la position proprement
    camera.position.z = 5; 
    camera.position.y = 1;

    function frame() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }

    frame();

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});
