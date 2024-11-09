import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component ({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit {
  usuario: string = '';
  selectedMenuItem: string = 'Home';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.usuario = params['user'];
      }
    });
  }
}
