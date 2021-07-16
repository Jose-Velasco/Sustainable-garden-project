export interface sensor {
    id: number,
    created: string,
    sensor_name: string,
    sensor_type: string,
    pin: number,
    usb_port: string,
    in_use: boolean,
}

export interface SensorReading {
    sensor: sensor
    reading: JSON,
    time_of_reading: string
}
