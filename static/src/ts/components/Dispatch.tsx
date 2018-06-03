import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { DispatchData, GTAMap } from "./";

export class Dispatch<RouteComponentProps, Object> extends React.Component<any, {}> {
    public render(): JSX.Element {
        return (
            <div className="dispatch-container">
                <GTAMap />
                <DispatchData />
            </div>
        );
    }
}