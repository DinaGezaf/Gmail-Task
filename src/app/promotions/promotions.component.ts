import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Email } from '../model/email.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {
  email!: Email;
  emails!: Email[];
  checked!: boolean;
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.dataService.getPromotionEmails().then((data) => (this.emails = data));
  }

  deletePrimary(data: Email) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.subject + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.emails = this.emails.filter((val) => val.subject !== data.subject);
        this.email = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  makeAsRead(btn: MatButtonToggle) {
    if (btn.value == 'pi-envelope') {
      btn.value = 'pi-wallet';
      btn._buttonElement.nativeElement.parentNode?.parentNode?.parentElement?.classList.remove(
        'makeasunread'
      );
    } else {
      btn.value = 'pi-envelope';
      btn._buttonElement.nativeElement.parentNode?.parentNode?.parentElement?.classList.add(
        'makeasunread'
      );
    }
    btn.checked = !btn.checked;
  }
  stared(btn: MatButtonToggle) {
    if (btn.checked) {
      btn._buttonElement.nativeElement.parentElement?.classList.add('star');
      console.log(btn._buttonElement.nativeElement.parentElement?.classList);
    } else {
      btn._buttonElement.nativeElement.parentElement?.classList.remove('star');
    }
  }
}
