import "./style.scss"

const editor = ace.edit("aceeditor")
editor.focus()
editor.setTheme("ace/theme/solarized_dark")
editor.getSession().setMode("ace/mode/pgsql")


const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  target: "map",
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: false,
    }),
  }),
  view: new ol.View({
    projection: "EPSG:4326",
    center: [0, 0],
    zoom: 2,
  }),
})


const styles = {
  "MultiPolygon": new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "red",
      width: 1,
    }),
    fill: new ol.style.Fill({
      color: "rgba(255, 255, 0, 0.1)",
    }),
  }),
}

const styleFunction = feature => styles[feature.getGeometry().getType()]


window.eval_query = () => {
  const sql_query = editor.getSession().getValue()
  const params = "?query=" + sql_query

  const url = "/municipios" + params

  const db_response = fetch(url)
    .then(res => res.json())
    .then(geojson => {

      const features = {
        type: "FeatureCollection",
        features: geojson,
      }

      const vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(features),
      })

      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction,
      })

      map.addLayer(vectorLayer)
      map.render()
    })
    .catch((err) => {
      console.log(err)
    })
}
