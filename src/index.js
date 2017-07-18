import "./style.scss";

const editor = ace.edit("aceeditor");
editor.focus();
editor.setTheme("ace/theme/solarized_dark");
editor.getSession().setMode("ace/mode/pgsql");


const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false,
    }),
  }),
  view: new ol.View({
    center: [0, 0],
    zoom: 2,
  }),
});


window.yasmin = () => {
  const sql_query = editor.getSession().getValue();
  const params = "?query=" + sql_query;

  const url = "/municipios" + params;

  const db_response = fetch(url)
    .then((res) => {
      res
        .json()
        .then((geojson) => {
          console.log("PUDIIIIIIIM " + JSON.stringify(geojson));

          const vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojson),
          });

          const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
          });

          map.addLayer(vectorLayer);
          map.render();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
