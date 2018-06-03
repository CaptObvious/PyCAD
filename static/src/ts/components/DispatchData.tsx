import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { GTAMap } from "./";

export class DispatchData<RouteComponentProps, Object> extends React.Component<any, {}> {
    public render(): JSX.Element {
        return (
            <div className="dispatch-data">
                <Paper>
                    <Typography variant="subheading" color="inherit" className="dispatch-heading">
                        Active Calls
                    </Typography>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Call ID</TableCell>
                                <TableCell>Call Type</TableCell>
                                <TableCell>Units</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell numeric>1306</TableCell>
                                <TableCell>Traffic Stop</TableCell>
                                <TableCell>C103, S123, S177</TableCell>
                                <TableCell>601: Route 1</TableCell>
                                <TableCell><Button size="small" color="secondary">Clear</Button> <Button size="small" color="primary">Details</Button> <Button size="small" color="primary">Assign</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell numeric>1315</TableCell>
                                <TableCell>Intoxicated Person</TableCell>
                                <TableCell>S128, S162</TableCell>
                                <TableCell>1029: East Joshua Road</TableCell>
                                <TableCell><Button size="small" color="secondary">Clear</Button> <Button size="small" color="primary">Details</Button> <Button size="small" color="primary">Assign</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell numeric>1319</TableCell>
                                <TableCell>911</TableCell>
                                <TableCell>P734, P923</TableCell>
                                <TableCell>?: Vanilla Unicorn</TableCell>
                                <TableCell><Button size="small" color="secondary">Clear</Button> <Button size="small" color="primary">Details</Button> <Button size="small" color="primary">Assign</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell numeric>1320</TableCell>
                                <TableCell>Shots Fired</TableCell>
                                <TableCell>S203, S121</TableCell>
                                <TableCell>1019: Algonquin Boulevard</TableCell>
                                <TableCell><Button size="small" color="secondary">Clear</Button> <Button size="small" color="primary">Details</Button> <Button size="small" color="primary">Assign</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Paper>
                    <Typography variant="subheading" color="inherit" className="dispatch-heading">
                        Available Units
                    </Typography>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-cell-icon">Icon</TableCell>
                                <TableCell className="table-cell-id">ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/sheriff.png" /></TableCell>
                                <TableCell className="table-cell-id">S127</TableCell>
                                <TableCell>Jeff Favignano</TableCell>
                                <TableCell>10-8: Available</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/pd.png" /></TableCell>
                                <TableCell className="table-cell-id">P100</TableCell>
                                <TableCell>Malcolm Reynolds</TableCell>
                                <TableCell>10-8: Available</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/county.png" /></TableCell>
                                <TableCell className="table-cell-id">C113</TableCell>
                                <TableCell>Hoban Washburne</TableCell>
                                <TableCell>10-8: Available</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/sheriff.png" /></TableCell>
                                <TableCell className="table-cell-id">S137</TableCell>
                                <TableCell>Kaylee Frye</TableCell>
                                <TableCell>10-8: Available</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Paper>
                    <Typography variant="subheading" color="inherit" className="dispatch-heading">
                        Busy Units
                    </Typography>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-cell-icon">Icon</TableCell>
                                <TableCell className="table-cell-id">ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/pd.png" /></TableCell>
                                <TableCell className="table-cell-id">P734</TableCell>
                                <TableCell>Jayne Cobb</TableCell>
                                <TableCell>10-7: Unavailable - Responding</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/county.png" /></TableCell>
                                <TableCell className="table-cell-id">C103</TableCell>
                                <TableCell>Derrial Book</TableCell>
                                <TableCell>10-7: Unavailable - Responding</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/sheriff.png" /></TableCell>
                                <TableCell className="table-cell-id">S203</TableCell>
                                <TableCell>Inara Serra</TableCell>
                                <TableCell>10-7: Unavailable - Responding</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="table-cell-icon"><img src="/images/markers/pd.png" /></TableCell>
                                <TableCell className="table-cell-id">P923</TableCell>
                                <TableCell>Simon Tam</TableCell>
                                <TableCell>10-7: Unavailable - Responding</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}