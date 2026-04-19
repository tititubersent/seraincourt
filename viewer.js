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
        splat = await SPLAT.Loader.LoadAsync(
            "https://raw.githubusercontent.com/antimatter15/splat/main/examples/assets/garden.splat"

        );
        console.log("✅ modèle chargé");
    } catch (e) {
        console.error("❌ erreur chargement :", e);
        return;
    }

    if (!splat) {
        console.error("❌ modèle undefined");
        return;
    }

    // ✅ version gsplat
    scene.add(splat);

    // ✅ caméra gsplat
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
