"use client"

import { useHomeContext } from "@/app/homeContext";
import { useState } from "react";
import Sheet from "./Sheet";
import ScannerScanning from "./scanner/ScannerScanning";
import ScannerNotFound from "./scanner/ScannerNotFound";
import ScannerPhotoCapture from "./scanner/ScannerPhotoCapture";
import ScannerLoading from "./scanner/ScannerLoading";
import ScannerConfirm from "./scanner/ScannerConfirm";
import ScannerNoPermissions from "./scanner/ScannerNoPermissions";

export type CapsuleData = {
  seriesName: string
  capsuleName: string
}

type ScanStep = "scanning" | "not-found" | "photo-capture" | "loading" | "confirm" | "no-permissions"

export default function ScannerSheet() {
  const { sheetOpened, setSheetOpened } = useHomeContext()
  const [scanStep, setScanStep] = useState<ScanStep>("scanning")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [parseResult, setParseResult] = useState<CapsuleData | null>(null)

  if (sheetOpened !== "scan") return <></>

  return (
    <Sheet onClose={() => setSheetOpened(null)}>
      {scanStep === "scanning" && (
        <ScannerScanning
          onNotFound={() => setScanStep("not-found")}
          onManualEntry={() => setSheetOpened("manual")}
          onNoPermissions={() => setScanStep("no-permissions")}
        />
      )}
      {scanStep === "not-found" && (
        <ScannerNotFound
          onAddCapsule={() => setScanStep("photo-capture")}
          onScanAnother={() => setScanStep("scanning")}
        />
      )}
      {scanStep === "photo-capture" && (
        <ScannerPhotoCapture
          onPhotoCaptured={(imageData) => {
            setCapturedImage(imageData)
            setScanStep("loading")
          }}
          onScanAnother={() => setScanStep("scanning")}
        />
      )}
      {scanStep === "loading" && capturedImage && (
        <ScannerLoading
          imageData={capturedImage}
          onComplete={(result) => {
            setParseResult(result)
            setScanStep("confirm")
          }}
        />
      )}
      {scanStep === "confirm" && parseResult && (
        <ScannerConfirm
          result={parseResult}
          onConfirm={() => { /* TODO: upload */ }}
          onScanAnother={() => setScanStep("scanning")}
        />
      )}
      {scanStep === "no-permissions" && (
        <ScannerNoPermissions onManualEntry={() => setSheetOpened("manual")} />
      )}
    </Sheet>
  )
}
