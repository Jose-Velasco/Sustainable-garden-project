import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { BackendService } from "../../shared/services/backend.service";
import { SensorsReadingsDataService } from "../../shared/services/sensors-readings-data.service";
import { ChartsDataService } from "../../shared/services/charts-data.service";

// decorator, tells angular and nativescript what component we are talking about
@Component({
    selector: "ns-settings-overview", //where in nativescript is this component
    templateUrl: "./settings-overview.component.html", // which html doc is this associated to
    styleUrls: ["./settings-overview.component.scss"] // which scss styling doc is this associated to
})

// the dashboard overview component "dashboard-overview" has an alias in Typescript: DashboardOverviewComponent
// DashboardOverviewComponent can be found in app.module.ts, not needed to be touched with Angular CLI working
export class SettingsOverviewComponent implements OnInit, OnDestroy {
    // the DashboardOverviewComponent initializes with the following data

    //!required --- these next four lines are chart formatting
    private _currentHumidityValueChanged: Subscription;
    private _currentTemperatureValueChanged: Subscription;
    private _currentRainStatusChanged: Subscription;
    private _currentSoilValueChanged:Subscription;

    isDHTsensorActive: string;
    dhtActiveTextColor: string;
    isSoilSensorActive: string;
    soilActiveTextColor: string;
    isWaterSensorActive: string;
    waterActiveTextColor:string;
    solarPanelVoltage: number;

    //data used, can be modified
    currentHumidityValue: number;
    currentTemperatureValue: number;
    currentSoilValue:number;
    currentRainStatus: boolean;
    hasSunLight = false; //!change when we get the data working for the sunlight card
    
    //uses sensorReadingDataService and backendService to grab data from the sensors, 
    //see src/app/shared/services/sensors-readings-data.service.ts and
    //see src/app/shared/services/backend.service.ts for more information
    constructor(
        private sensorReadingDataService: SensorsReadingsDataService,
        private backendService: BackendService
        ) {}

    ngOnInit() {

        this.isDHTsensorActive= "INACTIVE";
        this.dhtActiveTextColor= "red";
        this.isSoilSensorActive= "INACTIVE";
        this.soilActiveTextColor= "red";
        this.isWaterSensorActive= "INACTIVE";
        this.waterActiveTextColor="red";
        this.solarPanelVoltage= 0;

        //this.backendService.fetchAllSensorsReadings();
        //this.chartsDataService.initializeChartServiceData();

        //the changed humidity value is the data from the sensors with the current humidity reading
        this._currentHumidityValueChanged = this.sensorReadingDataService.currentHumidity
            .subscribe(newValue => {
                this.currentHumidityValue = newValue; //assign the value
                this.isDHTsensorActive = "ACTIVE"; 
                this.dhtActiveTextColor = "green";
            });
        //the changed soil value is the data from the sensors with the current humidity reading
        this._currentSoilValueChanged = this.sensorReadingDataService.currentSoilValue
        .subscribe(newValue => {
            this.currentSoilValue = newValue; //assign the value 
            this.isSoilSensorActive= "ACTIVE";
            this.soilActiveTextColor="green";
        });
        //the changed temperature value is the data from the sensors with the current temperature reading
        this._currentTemperatureValueChanged = this.sensorReadingDataService.currentTemperature
            .subscribe(newValue=> {
                this.currentTemperatureValue = newValue; //assign the value
            });
        //the changed rain status value is the data from the sensors with the current rain status reading
        this._currentRainStatusChanged = this.sensorReadingDataService.currentRainStatus
        .subscribe(newValue => {
            this.currentRainStatus = newValue == 1 ? true : false ; //assign and check the value
            this.isWaterSensorActive= "ACTIVE";
            this.waterActiveTextColor="green";
        });

        this.backendService.readCurrentSensorValues();
        this.backendService.testDashboardViewUIWithCurrentSensorData();
    }

    // Angular gets rid of the charts when we leave this page
    ngOnDestroy() {
        if (this._currentHumidityValueChanged) {
            this._currentHumidityValueChanged.unsubscribe();
        } 
        if (this._currentTemperatureValueChanged) {
            this._currentTemperatureValueChanged.unsubscribe()
        }
        if (this._currentSoilValueChanged) {
            this._currentSoilValueChanged.unsubscribe()
        }
        if (this._currentRainStatusChanged) {
            this._currentRainStatusChanged.unsubscribe();
        }
    }

}
