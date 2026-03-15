const japanCountryCodes = new Set([
    "450", "451", "452", "453", "454", "455", "456", "457", "458", "459"
])

const checksum = (barcode: string): number => {
    let sum = 0;
    for (let i = 0; i < barcode.length - 2; i++) {
        const multiplier = i % 2 === 0 ? 1 : 3
        sum += parseInt(barcode[i]) * multiplier
    }
    return sum % 10
}

const isBarcodeValid = (barcode: string): boolean => {
    if (!japanCountryCodes.has(barcode.slice(0, 3))) {
        return false
    }
    if (checksum(barcode).toString() !== barcode.charAt(barcode.length - 1)) {
        return false
    }
    return true
}

export default isBarcodeValid