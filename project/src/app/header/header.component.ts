import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shered/data-storege.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: DataStorageService) {}

  ngOnInit() {
  }

  onSave() {
    this.service.put();
  }

  onFetch() {
    this.service.get().subscribe();
  }
}
