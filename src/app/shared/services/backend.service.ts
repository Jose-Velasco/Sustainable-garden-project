import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SensorsReadingsDataService } from "./sensors-readings-data.service";

@Injectable({providedIn: "root"})
export class BackendService {
    // use network address 10.0.2.2 to go to your 127.0.0.1 on you development machine from
    // inside of the android emulator
    private _sustainableGardenBackendBaseURL = "http://10.0.2.2:8000";

    constructor(
        private sensorsReadingsDataService: SensorsReadingsDataService,
        private http: HttpClient) {}

    fetchSensorsReadings() {
        this.http.get(`${this._sustainableGardenBackendBaseURL}/sensors/readings`,
        {headers: {
            "Content-Type": "application/json"
        }}).subscribe(
            (sensorsReadingsData: []) => {
                this.sensorsReadingsDataService.setSensorsReadingsData(
                    this.sensorsReadingsDataService.organizeNewSensorReadingsData(sensorsReadingsData)
                    );
            }
        );
    }
}
