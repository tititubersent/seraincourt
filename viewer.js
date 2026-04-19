import * as SPLAT from "https://unpkg.com/gsplat@latest";

window.addEventListener("DOMContentLoaded", async () => {

    const canvas = document.getElementById("canvas");

    const renderer = new SPLAT.WebGLRenderer(canvas);
    const scene = new SPLAT.Scene();
    const camera = new SPLAT.Camera();
    const controls = new SPLAT.OrbitControls(camera, canvas);

    renderer.setSize(window.innerWidth, window.innerHeight);

    try {
        // C'EST ICI LA CORRECTION MAGIQUE : On passe "scene" en 2ème paramètre !
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

    // Caméra de gsplat
    camera.position = { x: 0, y: 0, z: 2 };

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
