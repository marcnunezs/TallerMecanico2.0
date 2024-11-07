import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }
}
