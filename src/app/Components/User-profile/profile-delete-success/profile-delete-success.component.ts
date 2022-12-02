import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-delete-success',
  templateUrl: './profile-delete-success.component.html',
  styleUrls: ['./profile-delete-success.component.css']
})
export class ProfileDeleteSuccessComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  return(): void {
    this.router.navigateByUrl('');
  }

}
