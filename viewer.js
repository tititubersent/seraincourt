import * as SPLAT from "https://unpkg.com/gsplat@latest";

window.addEventListener("DOMContentLoaded", async () => {

    const canvas = document.getElementById("canvas");

    const renderer = new SPLAT.WebGLRenderer(canvas);
    const scene = new SPLAT.Scene();
    const camera = new SPLAT.Camera();
    const controls = new SPLAT.OrbitControls(camera, canvas);

    renderer.setSize(window.innerWidth, window.innerHeight);

    let splat;

    try {
        splat = await SPLAT.Loader.LoadAsync("./model.splat");
        console.log("✅ modèle chargé", splat);
    } catch (e) {
        console.error("❌ chargement impossible :", e);
        return; // STOP si ça charge pas
    }

    if (!splat) {
        console.error("❌ modèle undefined");
        return;
    }

    scene.addObject(splat);

    // ✅ caméra compatible gsplat
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
