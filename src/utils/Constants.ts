
export const ResponseCode = {
    _404_NOT_FOUND: 404,
    _500_UNCONTROLLED_ERROR: 500,
}
export const Message = {
    _404_NOT_FOUND: { code: ResponseCode._404_NOT_FOUND, model: { code: "NOT_FOUND", message: "No Se encontro Registro" } },
    _500_UNCONTROLLED_ERROR: { code: ResponseCode._500_UNCONTROLLED_ERROR, model: { code: "UNCONTROLLED_ERROR", message: "Error no controlado" } }
}
export const Constants = {
    TABLE_NAME: "vehicle_availability"
}