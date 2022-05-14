import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { SensorsReadingsDataService } from "./sensors-readings-data.service";
import { SensorReading } from "../models/sensors-readings.model";
import { UserDataReadWriteService } from "./userDataReadWrite.service";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class BackendService {
    // use network address 10.0.2.2 to go to your 127.0.0.1 on you development machine from
    // inside of the android emulator
    // pi IP goes into the BackendBaseURL
    private _sustainableGardenBackendBaseURL = "http://10.0.2.2:8000";
    private tns_httpHeaders: HttpHeaders = new HttpHeaders({"Content-Type":"application/json"});
    private _isEndpointTest = true;

    constructor(
        private sensorsReadingsDataService: SensorsReadingsDataService,
        private http: HttpClient,
        private userDataReadWriteService:UserDataReadWriteService
        ) {}

    /**
     * gets all of the sensors readings from the backend.
     * currently there are no accounts so it pulls all the readings
     */
    fetchAllSensorsReadings() {
        this.http.get<SensorReading[]>(
            `${this._sustainableGardenBackendBaseURL}/sensors/readings`,
            {
                headers: this.tns_httpHeaders
            }
            ).subscribe(
                (sensorsReadingsData) => {
                    this.sensorsReadingsDataService.setSensorsReadingsData(sensorsReadingsData);
            }
        );
    }

    /**
     * Reads all current sensor values.
     * If isEndpointTesting is true then server response will generate random test data values
     */
    readCurrentSensorValues() {
        const queryParams = new HttpParams().set("is_endpoint_test", `${this._isEndpointTest}`);
        this.http.get<SensorReading[]>(
            `${this._sustainableGardenBackendBaseURL}/sensors/all/read`,
            {
                headers: this.tns_httpHeaders,
                params: queryParams
            }
            ).subscribe(data => {
                this.sensorsReadingsDataService.processSensorValues(data);
            }
        );
    }

    // TODO: add a way to get and post user data here

    /**
     * For Dashboard view UI testing can be removed.
     * Repeatedly call the backend for current(realtime?) sensor values
     */
    testDashboardViewUIWithCurrentSensorData(): void {
        const millisecondsDelay = 15000;
        setTimeout(()=> {
            this.readCurrentSensorValues();
            this.fetchAllSensorsReadings();
            this.testDashboardViewUIWithCurrentSensorData();
        }, millisecondsDelay);
    }
    
}
