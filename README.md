# WELDTECH SIMULATOR — 6-Axis Industrial Welding Robot

A browser-based educational prototype for exploring a procedural six-joint robot, TCP jogging, waypoint recording, simple playback, workpiece variants, and illustrative MIG/MAG parameters.

## Run locally

Three.js and OrbitControls are imported from jsDelivr CDN, so an internet connection is needed on first load. Do not open `index.html` directly via `file://`; use a local HTTP server:

### Python
```bash
cd weldtech-simulator
python -m http.server 8000
```
Then open `http://localhost:8000` in a modern browser.

### VS Code
Install the **Live Server** extension, open this folder, right-click `index.html`, and choose **Open with Live Server**.

## Included

- Procedural Three.js articulated robot with six revolute joints and joint-angle sliders.
- Orbit/zoom/pan camera, isometric/front/side/top views, and floor grid toggle.
- TCP position readout and numerical damped-least-squares position IK for Cartesian jogging and recorded waypoints.
- Procedural butt, flat plate, T-fillet, lap, corner, and pipe workpieces.
- Illustrative MIG/MAG controls, virtual arc light, limited sparks, and simple bead marks during active playback.
- Record/remove waypoints, save/load a simple program in localStorage, path playback, pause/stop, and emergency-stop state.
- Learning modules, practice tasks, basic local completion tracking, console, and telemetry.

## Controls

- Drag on the viewport to orbit; scroll to zoom; right-drag to pan.
- Use **Joint** sliders to set J1–J6. Use **Cartesian** jog buttons to move the TCP in the chosen frame.
- Add at least two current-pose waypoints from the Program tab, then select **Play Recorded Path** or **Run Weld**.
- Emergency stop halts virtual playback and disables the virtual arc. Use the separate Reset Safety button to reset the virtual safety state; then start a new program deliberately.
- Use the Workpiece & Fixtures page to swap procedural joint geometry.

## Important limitations

This is an educational prototype, not an industrial robot controller. The geometry and joint limits are generic and do not represent a specific manufacturer/model. Cartesian IK is a simplified numerical position solver and does not fully constrain tool orientation. Playback uses TCP waypoint positions and can stop if a target is unreachable. The program editor is currently a waypoint recorder/player, not a full text-based interpreter for all listed industrial-style instructions. Collision checking, realistic weld pool physics, WPS validation, calibrated process models, controller compatibility, and certified safety functions are not implemented. Arc voltage/current are user-set illustrative values, not physical predictions. Never use this software to validate a real weld procedure or replace machine guarding, formal training, PPE, or instructor supervision.

## Troubleshooting

- **Blank 3D view:** use a current browser with WebGL enabled and make sure the CDN is reachable.
- **Module import errors:** run through HTTP/HTTPS using one of the local server options above.
- **Slow rendering:** close other tabs and lower browser zoom or use a device with a supported WebGL implementation.
- **Saved data:** program and task progress are stored in this browser's localStorage, not uploaded to a server.


## Troubleshooting: tombol tidak merespons
Jika tombol tidak merespons, buka lewat Live Server atau `python -m http.server 8000`, bukan dengan `file://`. Versi ini menyertakan import map untuk memastikan OrbitControls dapat menemukan modul `three`. Koneksi internet diperlukan untuk memuat Three.js dari CDN. Buka DevTools (F12) > Console jika masih ada error.
