"use strict";const{contextBridge:e}=require("electron");e.exposeInMainWorld("versions",{node:()=>process.versions.node,chrome:()=>process.versions.chrome,electron:()=>process.versions.electron});
