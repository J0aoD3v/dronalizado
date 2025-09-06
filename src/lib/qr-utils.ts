import QRCode from "qrcode";

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export const generateQRCode = async (
  url: string,
  options: QRCodeOptions = {}
): Promise<string> => {
  const defaultOptions = {
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    ...options,
  };

  try {
    return await QRCode.toDataURL(url, defaultOptions);
  } catch (error) {
    console.error("Erro ao gerar QR code:", error);
    throw new Error("Falha ao gerar QR code");
  }
};

export const generateQRCodeSVG = async (
  url: string,
  options: QRCodeOptions = {}
): Promise<string> => {
  const defaultOptions = {
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    ...options,
  };

  try {
    return await QRCode.toString(url, {
      type: "svg",
      ...defaultOptions,
    });
  } catch (error) {
    console.error("Erro ao gerar QR code SVG:", error);
    throw new Error("Falha ao gerar QR code SVG");
  }
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const formatUrl = (url: string): string => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};
