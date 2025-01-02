import {
  Cartesian3,
  Color,
  HeadingPitchRoll,
  Math,
  PinBuilder,
  Transforms,
  VerticalOrigin,
  Viewer,
} from "cesium";
import "./main.css";
import "cesium/Build/Cesium/Widgets/widgets.css";

// initialize viewer
const viewer = new Viewer("cesiumContainer");

// add the button to change to AR
var buttonEl = document.createElement("a");
buttonEl.href = "www.google.com";
buttonEl.className = "button-to-AR";
buttonEl.innerText = "AR";
document
  .getElementsByClassName("cesium-viewer-toolbar")[0]
  .appendChild(buttonEl);

{
  /* <button type="button" class="cesium-button cesium-toolbar-button cesium-home-button" data-bind="attr: { title: tooltip },click: command,cesiumSvgPath: { path: _svgPath, width: 28, height: 28 }" title="View Home"><svg:svg class="cesium-svgPath-svg" width="28" height="28" viewBox="0 0 28 28"><path d="M14,4l-10,8.75h20l-4.25-3.7188v-4.6562h-2.812v2.1875l-2.938-2.5625zm-7.0938,9.906v10.094h14.094v-10.094h-14.094zm2.1876,2.313h3.3122v4.25h-3.3122v-4.25zm5.8442,1.281h3.406v6.438h-3.406v-6.438z"></path></svg:svg></button> */
}

// Fly the camera to the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(
    -8.288717589311572,
    41.453238183717204,
    1000
  ),
});

// Models
const models = {
  // m12: {
  //   uri: "12_escolaCiencias.glb",
  //   latitude: 41.453028214774335,
  //   longitude: -8.288779907121729,
  //   orientation: -90,
  //   descritpion: " <p>Testing description</p>",
  // },
  m14: {
    uri: "14_ccg.glb",
    latitude: 41.453374193943915,
    longitude: -8.288182047000737,
    orientation: -125,
    descritpion: "Testing description",
  },
};

//To add pins to the scene
const pinBuilder = new PinBuilder();

// Adds all models to the viewer
for (let key in models) {
  const position = Cartesian3.fromDegrees(
    models[key].longitude,
    models[key].latitude
  );

  viewer.entities.add({
    position: position,
    model: {
      uri: models[key].uri,
    },
    name: key,
    id: key,
    descritpion: models[key].descritpion,
    orientation: Transforms.headingPitchRollQuaternion(
      position,
      new HeadingPitchRoll(Math.toRadians(models[key].orientation), 0, 0)
    ),
    billboard: {
      image: pinBuilder.fromColor(Color.ROYALBLUE, 30).toDataURL(),
      verticalOrigin: VerticalOrigin.BOTTOM,
    },
  });
}
