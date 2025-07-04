import React, { useEffect } from 'react'

import { useHistory } from "react-router";

import * as d3 from "d3";

import "./map.css"


export const Map: React.FC<{}> = () => {
    const history = useHistory();
    const ref = React.useRef();

    useEffect(() => {
        const width = 750;
        const height = 750;

        const svg = d3.select(ref.current)

        const projection = d3
        .geoMercator()
        .center([6.3, 52.7]) // Center on the Netherlands
        .scale(12_000)
        .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        Promise.all([d3.json("provincie_2025.geojson"), d3.json("lowsaxon.geojson")]).then(function ([
        provincie,
        lowsaxon,
        ]) {
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("id", "map-tooltip")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("opacity", 0)
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("color", "#fff")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("pointer-events", "none");

        // provincies
        svg
            .selectAll(".provincie")
            .data((provincie as any).features)
            .enter()
            .append("path")
            .attr("class", "provincie")
            .attr("d", path);

        // regios
        svg
            .selectAll(".regio")
            .data((lowsaxon as any).features)
            .enter()
            .append("path")
            .attr("class", "regio")
            .attr("d", path)
            .on("mouseover", function (event, d) {
                d3.select(this).style("fill", "#3caa2f");
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip
                    .html((d as any).properties.statnaam)
                    .style("left", event.pageX + 5 + "px")
                    .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).style("fill", "#999");
                tooltip.transition().duration(500).style("opacity", 0);
            })
            .on("click", function (event, d) {
                const lang = (d as any).properties.lang;
                history.push(`/${lang}/speak`);
            });
        });

        return () => {
            d3.select(ref.current).selectAll("*").remove();
            d3.select("#map-tooltip").remove();
        }
    }, []);

    return (
        <svg id="map" ref={ref} />
    )
}