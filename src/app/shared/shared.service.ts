import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { LoginDialogComponent } from '@app/shared/login-dialog/login-dialog.component';
import { ImageUploadComponent } from '@app/shared/image-upload/image-upload.component';
import { EstoreDateComponent } from '@app/shared/estore-date/estore-date.component';

@Injectable()
export class SharedService {
  public showLoader: Boolean = false;
  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  message:any;
  private clubInitial = new Subject();
  clubStatus = this.clubInitial.asObservable();
  private clubUpdateData = new Subject();
  clubUpdateLogo = this.clubUpdateData.asObservable();

  updatedStatus(temp: String) {
    this.clubInitial.next(temp);
  }

  updatedClubData(logo: any) {
    this.clubUpdateData.next(logo);
    localStorage.super_cur_clubLogo = logo;
  }

  showMessage(message: string, type: string = 'success') {
    return this.snackBar
      .open(message, '', {
        duration: 2000,
        panelClass: ['toaster', type]
      })
      .afterDismissed();
  }

  showDialog(data: any, type: string = '') {
    return this.dialog
      .open(DialogComponent, {
        width: '250px',
        data: data
      })
      .afterClosed();
  }

  loginDialog(data: any, type: string = '') {
    return this.dialog
      .open(LoginDialogComponent, {
        width: '250px',
        data: data
      })
      .afterClosed();
  }

  dateDialog(data: any = '', type: string = '') {
    return this.dialog
      .open(EstoreDateComponent, {
        width: '250px',
        data: data
      })
      .afterClosed();
  }

  showImageDialog(title: any, file: any, isteam?: boolean) {
    return this.dialog
      .open(ImageUploadComponent, {
        width: '400px',
        height: '500px',
        data: {
          title: title,
          file: file,
          type: 'canvas',
          heigh: '400',
          width: '400',
          team: isteam
        }
      })
      .afterClosed();
  }
}
