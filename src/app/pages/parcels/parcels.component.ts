import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, switchMapTo} from "rxjs";
import {Parcel} from "../../models/container.model";
import {ParcelApiService} from "../../services/parcel-api.service";
import {ActivatedRoute} from "@angular/router";
import Utils from "../../components/shared/utils";

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss']
})
export class ParcelsComponent implements OnInit {

  parcels$: Observable<Parcel[]>;

  trigger$ = new BehaviorSubject(true);

  department: string;

  constructor(private route: ActivatedRoute, private parcelsService: ParcelApiService) {
    this.route.params.subscribe(params => {
      this.department = Utils.capitalize(params['type']);
      this.parcels$ = this.trigger$.pipe(
        switchMapTo(this.parcelsService.getParcelsByDepartment({name: this.department}))
      )
    });
  }

  ngOnInit() {

  }

  processParcel(id: Number) {



    this.parcelsService.processParcel(id).subscribe(
      () => {
        this.trigger$.next(true)
      }
    )
  }
}
