(() => {
  "use strict";

  const obtenerMapa = () => document.getElementById("mapa-oferta-quirurgica");

  const mostrarUbicacion = () => {
    const mapa = obtenerMapa();
    if (!mapa || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const traza = {
          type: "scattermap",
          name: "Tu ubicación",
          lat: [coords.latitude],
          lon: [coords.longitude],
          mode: "markers",
          marker: {
            size: 16,
            color: "#e45756",
            opacity: 1,
            allowoverlap: true,
          },
          hovertemplate: "<b>Tu ubicación aproximada</b><extra></extra>",
          showlegend: true,
        };

        const actualizar = () => {
          if (!window.Plotly || !mapa.data) return;
          const indice = mapa.data.findIndex((trace) => trace.name === "Tu ubicación");
          if (indice >= 0) {
            window.Plotly.deleteTraces(mapa, indice);
          }
          window.Plotly.addTraces(mapa, traza);
          window.Plotly.relayout(mapa, {
            "map.center.lat": coords.latitude,
            "map.center.lon": coords.longitude,
          });
        };

        const intentarActualizar = () => {
          if (window.Plotly && mapa.data) actualizar();
          else window.setTimeout(intentarActualizar, 250);
        };
        intentarActualizar();
      },
      () => {},
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  document.addEventListener("DOMContentLoaded", mostrarUbicacion);
  window.addEventListener("load", mostrarUbicacion);
})();
