import * as SPLAT from "https://unpkg.com/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function init() {
    const splat = await SPLAT.Loader.LoadAsync("model.splat");
    scene.addObject(splat);

    function frame() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }

    frame();
}

init();
