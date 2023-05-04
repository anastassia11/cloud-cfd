import { useState } from "react";
import FormGenerator from "./FormGenerator";
import Geometries from "./Geometries";
import Simulations from "./Simulations";

export default function TreePanel() {

    return (
        <div className='bg-white w-96 max-h-[calc(100vh-30px)] overflow-y-auto shadow'>
            <Geometries />
            <Simulations />
        </div>
    )
}

