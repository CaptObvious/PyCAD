import { Paper } from "@material-ui/core";
import Map from "ol/map";
import Image from "ol/layer/image";
import Vector from "ol/layer/vector";
import VectorSource from "ol/source/vector";
import ImageStatic from "ol/source/imagestatic";
import View from "ol/view";
import Projection from "ol/proj/projection";
import Style from "ol/style/style";
import Icon from "ol/style/icon";
import Text from "ol/style/text";
import Fill from "ol/style/fill";
import Stroke from "ol/style/stroke";
import Extent from "ol/extent";
import Feature from "ol/feature";
import Point from "ol/geom/point";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";


export class GTAMap<RouteComponentProps, Object> extends React.Component<any, {}> {
    private extent = [0, 0, 8192, 8192] as [number, number, number, number];
    private projection = new Projection({
        code: "gta5-map",
        units: "pixels",
        extent: this.extent
    });
    private mapLayer = new Image({
        source: new ImageStatic({
            url: "/images/map.png",
            imageExtent: this.extent,
            projection: this.projection,
        })
    });

    private markerSource = new VectorSource();
    private markerLayer = new Vector({
        source: this.markerSource
    });

    public ingameCoordsToPixels(ingame_x: number, ingame_y: number): {x: number, y: number} {
        // The origin for openlayers is at the BOTTOM LEFT.
        const zeroPoint = {
            x: 3755,
            y: 2669
        };
        const scaleFactor = 0.659;

        return {
            x: zeroPoint.x + (ingame_x * scaleFactor),
            y: zeroPoint.y + (ingame_y * scaleFactor)
        }
    }

    public addMarkerToMap(unit_type: string, ingame_x: number, ingame_y: number, name?: string): void {
        const imageCoords = this.ingameCoordsToPixels(ingame_x, ingame_y);

        const geometry = new Point([imageCoords.x, imageCoords.y]);

        const iconFeature = new Feature({
            geometry,
            name
        });

        iconFeature.setStyle(
            new Style({
                image: new Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",
                    opacity: 0.75,
                    src: "images/markers/" + unit_type + ".png"
                }),
                text: new Text({
                    font: "15px Roboto sans-serif",
                    fill: new Fill({color: "#000" }),
                    stroke: new Stroke({color: "#FFF", width: 2}),
                    text: name
                })
            })
        );

        console.log(iconFeature);

        this.markerSource.addFeature(iconFeature);
    }

    private map: Map | null = null;

    public componentDidMount() {
        this.map = new Map({
            layers: [
                this.mapLayer,
                this.markerLayer
            ],
            view: new View({
                projection: this.projection,
                center: Extent.getCenter(this.extent),
                zoom: 2,
                maxZoom: 8
            }),
            target: "map"
        })

        this.addMarkerToMap("sheriff", -2425.37866210938,3563.837890625,"S127");
        this.addMarkerToMap("sheriff", -2359.67602539063,25.5496063232422,"S128");
        this.addMarkerToMap("pd", 1414.150390625,40.4460945129395,"P100");
        this.addMarkerToMap("county", 121.866195678711,-1291.39770507813,"C143");
        this.addMarkerToMap("sheriff", 499.989807128906,5604.57666015625,"S137");
        this.addMarkerToMap("county", 2669.716,3517.079,"C135");
        this.addMarkerToMap("sheriff", 1575.591, 6429.027, "CaptObvious Test 1");
        this.addMarkerToMap("sheriff",  1291.427, 6497.313, "CaptObvious Test 2");
        this.addMarkerToMap("sheriff", 605.064, 6541.508, "CaptObvious Test 3");
        this.addMarkerToMap("sheriff", -11.756, 6367.629, "CaptObvious Test 4");
        this.addMarkerToMap("sheriff", -764.638, 5499.267, "CaptObvious Test 5");
        this.addMarkerToMap("sheriff", -232.186, 6314.866, "CaptObvious Test 6");
    }

    public componentDidUpdate() {
        if (this.map) {
            this.map.updateSize();
        }
    }

    public render(): JSX.Element {
        return (
            <Paper className="map-container">
                <div id="map" />
            </Paper>
        );
    }
}