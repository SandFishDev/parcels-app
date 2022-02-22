import {Component, OnInit} from '@angular/core';
import {Container} from "../../models/container.model";
import {ContainerApiService} from "../../services/container-api.service";
import {BehaviorSubject, Observable, Subscription, switchMapTo} from "rxjs";
import {NzUploadXHRArgs} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {

  trigger$ = new BehaviorSubject(true);
  containers$: Observable<Container[]>;

  constructor(private containerService: ContainerApiService) {
  }

  ngOnInit() {
    this.containers$ = this.trigger$.pipe(
      switchMapTo(this.containerService.getContainers())
    )
  }

  uploadFile = (args: NzUploadXHRArgs): Subscription => {
    return this.containerService.uploadContainer(args.file).subscribe({
      next: async () => {
        if (args.onProgress) {
          args.onProgress({}, args.file)
        }
      },
      error: async () => {
        if (args.onError) {
          args.onError({}, args.file)
        }
      },
      complete: async () => {
        if (args.onSuccess) {
          this.trigger$.next(true)
          args.onSuccess({}, args.file, {})
        }
      }
    })
  }

}
