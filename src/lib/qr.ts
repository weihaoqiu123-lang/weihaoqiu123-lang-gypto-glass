import QRCode from "qrcode";

export async function buildQrDataUrl(value: string) {
  return QRCode.toDataURL(value, {
    errorCorrectionLevel: "M",
    margin: 1,
    scale: 8,
    color: {
      dark: "#041013",
      light: "#EFFFF5",
    },
  });
}
