import * as SPLAT from "https://unpkg.com/gsplat@latest";

// attendre que le DOM soit prêt
window.addEventListener("DOMContentLoaded", async () => {

    const canvas = document.getElementById("canvas");

    const renderer = new SPLAT.WebGLRenderer(canvas);
    const scene = new SPLAT.Scene();
    const camera = new SPLAT.Camera();
    const controls = new SPLAT.OrbitControls(camera, canvas);

    renderer.setSize(window.innerWidth, window.innerHeight);

    const splat = await SPLAT.Loader.LoadAsync("model.splat");
    scene.addObject(splat);

    camera.position.set(0, 0, 3);

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
