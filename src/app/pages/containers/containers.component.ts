import { Component, OnInit } from '@angular/core';
import {Container} from "../../models/container.model";
import {ContainerApiService} from "../../services/container-api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {

  containers$: Observable<Container[]>;

  constructor(private containerService: ContainerApiService) { }

  ngOnInit() {
    this.containers$ = this.containerService.getContainers()
  }
}
